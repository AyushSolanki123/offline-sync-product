const router = require("express").Router();

const postController = require("../controllers/PostController");

router.get("/", postController.listPosts);

router.get("/:postId", postController.getPost);

router.post("/", postController.createPost);

router.put("/", postController.updatePost);

router.delete("/:postId", postController.deletePost);

module.exports = router;
