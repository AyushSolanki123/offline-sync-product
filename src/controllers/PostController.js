const { logger } = require("../utils/Logger");
const ErrorBody = require("../utils/ErrorBody");
const PostService = require("../services/PostService");

async function createPost(req, res, next) {
    try {
        const result = await PostService.addPost(req.body);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Create Post: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function listPosts(req, res, next) {
    try {
        const result = await PostService.listPost();
        res.status(200);
        res.json({
            data: result,
            count: result.length,
        });
    } catch (error) {
        logger.error("Failed in List Post: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function getPost(req, res, next) {
    try {
        const { postId: id } = req.params;
        const result = await PostService.getPostById(id);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Get Post: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function updatePost(req, res, next) {
    try {
        const { id, ...reqBody } = req.body;
        const result = await PostService.updatePostById(id, reqBody);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Update Post: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function deletePost(req, res, next) {
    try {
        const { postId: id } = req.params;
        const result = await PostService.deletePostById(id);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Delete Post: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}

module.exports = {
    deletePost,
    updatePost,
    createPost,
    listPosts,
    getPost,
};
