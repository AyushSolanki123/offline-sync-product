const router = require("express").Router();

router.use("/api/posts", require("./PostRoutes.js"));
router.use("/api/comments", require("./CommentRoute.js"));

router.get("/", (req, res, next) => {
    res.send({ message: "Hello world" });
});

module.exports = router;
