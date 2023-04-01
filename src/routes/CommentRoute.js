const router = require("express").Router();

const commentController = require("../controllers/CommentController");

router.get("/", commentController.listComments);

router.get("/:commentId", commentController.getComment);

router.post("/", commentController.createComment);

router.put("/", commentController.updateComment);

router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
