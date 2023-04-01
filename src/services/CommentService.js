const { API, graphqlOperation } = require("aws-amplify");
const ErrorBody = require("../utils/ErrorBody");
const { logger } = require("../utils/Logger");
const {
    createComment,
    updateComment,
    deleteComment,
} = require("../graphql/mutations");
const { listComments, getComment } = require("../graphql/queries");

async function addComment(reqBody) {
    console.log(reqBody);
    try {
        const { data } = await API.graphql(
            graphqlOperation(createComment, { input: { ...reqBody } })
        );
        logger.log("DATA: " + JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);
        throw new ErrorBody(500, error.message);
    }
}

async function listComment() {
    try {
        const { data } = await API.graphql(graphqlOperation(listComments));
        logger.log("POSTS: " + JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);
        throw new ErrorBody(500, error.message);
    }
}

async function getCommentById(id) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(getComment, { id })
        );
        logger.log("POST: " + JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);
        throw new ErrorBody(500, error.message);
    }
}

async function updateCommentById(id, reqBody) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(updateComment, { input: { id, ...reqBody } })
        );
        console.log(data);
        return data;
    } catch (error) {
        throw new ErrorBody(500, error.message);
    }
}

async function deleteCommentById(id) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(deleteComment, { input: { id } })
        );
        console.log(data);
        return data;
    } catch (error) {
        throw new ErrorBody(500, error.message);
    }
}

module.exports = {
    deleteCommentById,
    updateCommentById,
    addComment,
    listComment,
    getCommentById,
};
