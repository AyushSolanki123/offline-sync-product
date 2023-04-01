const { logger } = require("../utils/Logger");
const ErrorBody = require("../utils/ErrorBody");
const CommentService = require("../services/CommentService");

async function createComment(req, res, next) {
    try {
        const result = await CommentService.addComment(req.body);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Create Comment: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function listComments(req, res, next) {
    try {
        const result = await CommentService.listComment();
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in List Comment: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function getComment(req, res, next) {
    try {
        const { commentId: id } = req.params;
        const result = await CommentService.getCommentById(id);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Get Comment: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function updateComment(req, res, next) {
    try {
        const { id, ...reqBody } = req.body;
        const result = await CommentService.updateCommentById(id, reqBody);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Update Comment: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}
async function deleteComment(req, res, next) {
    try {
        const { commentId: id } = req.params;
        const result = await CommentService.deleteCommentById(id);
        res.status(200);
        res.json(result);
    } catch (error) {
        logger.error("Failed in Delete Comment: " + JSON.stringify(error));
        next(
            new ErrorBody(
                error.status | 500,
                error.errorMessage | "Internal server Error"
            )
        );
    }
}

module.exports = {
    deleteComment,
    updateComment,
    createComment,
    listComments,
    getComment,
};
