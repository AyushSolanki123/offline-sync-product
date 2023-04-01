const { API, graphqlOperation } = require("aws-amplify");
const ErrorBody = require("../utils/ErrorBody");
const { logger } = require("../utils/Logger");
const { createPost, updatePost, deletePost } = require("../graphql/mutations");
const { listPosts, getPost } = require("../graphql/queries");

async function addPost(reqBody) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(createPost, { input: reqBody })
        );
        logger.log("DATA: " + JSON.stringify(data));
        return data;
    } catch (error) {
        throw new ErrorBody(500, error.message);
    }
}

async function listPost() {
    try {
        const { data } = await API.graphql(graphqlOperation(listPosts));
        logger.log("POSTS: " + JSON.stringify(data));
        return data;
    } catch (error) {
        throw new ErrorBody(500, error.message);
    }
}

async function getPostById(id) {
    try {
        const { data } = await API.graphql(graphqlOperation(getPost, { id }));
        logger.log("POST: " + JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error);
        throw new ErrorBody(500, error.message);
    }
}

async function updatePostById(id, reqBody) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(updatePost, { input: { id, ...reqBody } })
        );
        return data;
    } catch (error) {
        throw new ErrorBody(500, error.message);
    }
}

async function deletePostById(id) {
    try {
        const { data } = await API.graphql(
            graphqlOperation(deletePost, { input: { id } })
        );
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        throw new ErrorBody(500, error.message);
    }
}

module.exports = {
    deletePostById,
    updatePostById,
    addPost,
    listPost,
    getPostById,
};
