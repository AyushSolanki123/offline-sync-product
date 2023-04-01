const AWS = require("aws-sdk");
const mysql = require("mysql2/promise");

const { RDS_PROXY_URL, DATABASE, USERNAME, REGION, PASSWORD } = process.env;
const DeltaSyncConfig = {
    DeltaSyncTableTTL: 30, // 30 minutes
    BaseTableTTL: 30 * 24 * 60, // => 43200, 30 days in minutes
};
const MIN_TO_MILLI = 60 * 1_000;
const DELTA_SYNC_PREFIX = "DeltaSync";

const signer = new AWS.RDS.Signer({
    region: REGION,
    port: 3306,
    username: USERNAME,
    password: PASSWORD,
    hostname: RDS_PROXY_URL,
});

const initConn = () => {
    const connectionConfig = {
        host: RDS_PROXY_URL,
        database: DATABASE,
        user: USERNAME,
        ssl: "Amazon RDS",
        password: PASSWORD,
        authPlugins: {
            mysql_clear_password: () => () => signer.getAuthToken(),
        },
    };
    return mysql.createConnection(connectionConfig);
};

const tableName = (belongsTo) =>
    belongsTo[0].toUpperCase() + belongsTo.slice(1) + "s";

const deltaSyncTable = (baseTable) => DELTA_SYNC_PREFIX + baseTable;

const toModel = (row, belongsTo) => {
    const mysql_id = row.id; // include in log
    let pid, _deleted;
    const id = `datastore-uuid-${row.id}`;
    if (belongsTo) {
        pid = row.parentUUID;
        _deleted = row.parentDeleted;
    }
    return {
        ...row,
        mysql_id,
        id,
        _lastChangedAt: parseInt(new Date(row._lastChangedAt).getTime()),
        ...(belongsTo && pid && _deleted !== undefined
            ? { [belongsTo]: { id: pid, _deleted } }
            : null),
    };
};

const _runQuery = async (conn, sql, values) => {
    console.log(`execute sql >`);
    console.log(sql.trim().replace(/\s+/g, " "));
    console.log(`with values >`);
    console.log(JSON.stringify(values, null, 2));
    const [result] = await conn.query(sql, values);
    console.log(`result >`);
    console.log(JSON.stringify(result, null, 2));
    return result;
};

const _selectRow = async ({ table, lookupId, belongsTo, connection }) => {
    let sql = null;
    if (belongsTo) {
        const parentTable = tableName(belongsTo);
        sql = `
    SELECT ${table}.*, ${parentTable}._datastore_uuid as parentUUID, ${parentTable}._deleted as parentDeleted
    FROM ${table}
    LEFT JOIN ${parentTable} ON ${table}.${belongsTo}ID = ${parentTable}.id
    WHERE ${table}.id = ?`;
    } else {
        sql = `SELECT * FROM ${table} WHERE id = ?`;
    }
    const values = [lookupId];

    // RETRIEVE the row and potential parent
    const [row] = await _runQuery(connection, sql, values);
    return row;
};

const _writeToDeltaSyncTable = async ({ row, table, connection }) => {
    const ds = Object.assign({}, row);
    delete ds.id;
    delete ds._ttl;
    delete ds.parentUUID;
    delete ds.parentDeleted;
    const keys = Object.keys(ds);
    const sql = `INSERT INTO ${deltaSyncTable(table)} (${keys.join(
        ","
    )}, _ttl) VALUES(${keys
        .map((k) => "?")
        .join(",")}, TIMESTAMPADD(MINUTE, ?, CURRENT_TIMESTAMP(3)))`;
    const values = keys.map((k) => ds[k]);
    values.push(DeltaSyncConfig.DeltaSyncTableTTL);

    return await _runQuery(connection, sql, values);
};

const _doUpdateTransactionWithRowLock = async ({
    sql,
    values,
    uuid,
    table,
    connection,
    belongsTo,
}) => {
    // START TRANSACTION to lock the row
    await connection.query(`START TRANSACTION`);

    // TRY to lock the row for update
    const locksql = `SELECT id FROM ${table} WHERE id=? LOCK IN SHARE MODE;`;
    const [existing] = await _runQuery(connection, locksql, [uuid]);

    // UPDATE the row - op specific
    const result = await _runQuery(connection, sql, values);

    console.log(result);

    const row = await _selectRow({
        table,
        lookupId: existing.id,
        belongsTo,
        connection,
    });

    // FINALLY COMMIT
    await connection.query("COMMIT;");

    if (result.affectedRows !== 1) {
        // INITIAL operation did not update a row, return unhandled mismatch
        console.error("Error: version mismatch on item");
        return {
            data: toModel(row, belongsTo),
            errorMessage: "Conflict",
            errorType: "ConflictUnhandled",
        };
    }

    // WRITE record to the DeltaSync table if row was created
    if (row && row.id) {
        await _writeToDeltaSyncTable({ row, table, connection });
    }

    return { data: toModel(row, belongsTo) };
};

const _query = async ({
    args: { limit = 1_000, lastSync, nextToken: inNextToken },
    table,
    connection,
    belongsTo,
}) => {
    const startedAt = Date.now();
    const moment = startedAt - DeltaSyncConfig.DeltaSyncTableTTL * MIN_TO_MILLI;
    let sql;
    let values = [];
    let offset = 0;
    if (inNextToken) {
        const tokenInfo = JSON.parse(
            Buffer.from(inNextToken, "base64").toString()
        );
        offset = tokenInfo.offset;
    }

    if (belongsTo) {
        const parentTable = tableName(belongsTo);
        sql = `
    SELECT ${table}.*, ${parentTable}._datastore_uuid as parentUUID, ${parentTable}._deleted as parentDeleted
    FROM ${table}
    LEFT JOIN ${parentTable} ON ${table}.${belongsTo}ID = ${parentTable}.id`;
    } else {
        sql = `SELECT * FROM ${table}`;
    }

    // FETCH the rows
    const rows = await _runQuery(connection, sql, values);

    // EVALUATE next token
    let nextToken = null;
    if (rows.length >= limit) {
        nextToken = Buffer.from(
            JSON.stringify({ offset: offset + rows.length })
        ).toString("base64");
    }
    const items = rows.map((row) => toModel(row, belongsTo));

    return { data: { items, startedAt, nextToken } };
};

const _get = async ({ args: { id }, table, connection, belongsTo }) => {
    let sql = `SELECT * FROM ${table} WHERE id = ?`;
    if (belongsTo) {
        const parentTable = tableName(belongsTo);
        sql = `
        SELECT 
            c.id as CommentID,
            c.content as CContent,
            p.id as PostID,
            p.title as PTitle,
            p.content as PContent,
            p.post_status as PStatus
        FROM ${table} c JOIN ${parentTable} p 
        ON c.postID = p.id 
        WHERE c.id = ? AND c._deleted = 0;`;
    }
    const values = [id];

    const rows = await _runQuery(connection, sql, values);
    let data = rows[0];

    if (belongsTo) {
        data = {
            id: data["CommentID"],
            content: data["CContent"],
            postID: data["PostID"],
            post: {
                id: data["PostID"],
                content: data["PContent"],
                title: data["PTitle"],
                post_status: data["PStatus"],
            },
        };
    }

    return data;
};

const _create = async ({ args: { input }, table, connection, belongsTo }) => {
    const { postID, ...rest } = input;
    const item = { ...rest };

    if (belongsTo) {
        item[`${belongsTo}ID`] = postID;
    }

    const keys = Object.keys(item);

    let sql = `INSERT INTO ${table} (${keys.join(",")}) VALUES(${keys
        .map((k) => "?")
        .join(",")})`;
    const values = keys.map((k) => item[k]);

    // INSERT the new row
    const result = await _runQuery(connection, sql, values);

    const row = await _selectRow({
        table,
        lookupId: result.insertId,
        belongsTo,
        connection,
    });

    let data = toModel(row, belongsTo);
    console.log("Comments: ", data);
    if (belongsTo) {
        sql = `Select * from Posts`;
        const post = await _runQuery(connection, sql, []);
        console.log(post);
        data = {
            ...data,
            post: toModel(post[0], false),
        };
    }

    // UPDATE the DeltaSync table if row was created
    if (row && row.id) {
        await _writeToDeltaSyncTable({ row, table, connection });
    }

    return { data };
};

const _update = async ({ args: { input }, table, connection, belongsTo }) => {
    const { id: uuid, ...item } = input;
    const keys = Object.keys(item);

    const sql = `UPDATE ${table} SET ${keys
        .map((k) => k + " = ?")
        .join(", ")}, _version=_version+1 WHERE id = ?`;
    const values = keys.map((k) => item[k]);
    values.push(uuid);

    return await _doUpdateTransactionWithRowLock({
        sql,
        values,
        uuid,
        table,
        connection,
        belongsTo,
    });
};

const _delete = async ({ args: { input }, table, connection, belongsTo }) => {
    const { id: uuid } = input;
    const sql = `
  UPDATE ${table} SET _deleted=true, _version=_version+1
  WHERE id = ?`;
    const values = [uuid];

    return await _doUpdateTransactionWithRowLock({
        sql,
        values,
        uuid,
        table,
        connection,
        belongsTo,
    });
};

const operations = {
    getPost: { fn: _get, table: "Posts" },
    listPosts: { fn: _query, table: "Posts" },
    syncPosts: { fn: _query, table: "Posts" },
    createPost: { fn: _create, table: "Posts" },
    updatePost: { fn: _update, table: "Posts" },
    deletePost: { fn: _delete, table: "Posts" },

    getComment: { fn: _get, table: "Comments", belongsTo: "post" },
    listComments: { fn: _query, table: "Comments", belongsTo: "post" },
    syncComments: { fn: _query, table: "Comments", belongsTo: "post" },
    createComment: { fn: _create, table: "Comments", belongsTo: "post" },
    updateComment: { fn: _update, table: "Comments", belongsTo: "post" },
    deleteComment: { fn: _delete, table: "Comments", belongsTo: "post" },
};

exports.handler = async (event) => {
    console.log(event);
    try {
        console.log(`passed event >`, JSON.stringify(event, null, 2));
        const { fieldName: operation, arguments: args } = event;

        if (operation in operations) {
            const connection = await initConn();
            const { fn, table, belongsTo } = operations[operation];
            const result = await fn.apply(undefined, [
                { table, args, connection, belongsTo },
            ]);
            await connection.end();
            return result;
        }
    } catch (error) {
        console.log(`Error: unhandled error >`, JSON.stringify(error, null, 2));
        return {
            data: null,
            errorMessage: error.message || JSON.stringify(error),
            errorType: "InternalFailure",
        };
    }
};
