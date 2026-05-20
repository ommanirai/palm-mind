const router = require("express").Router();
const authRouter = require("./routers/auth.route");
const userRouter = require("./routers/user.route");
const chatRouter = require("./routers/chat.route");

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/chat", chatRouter);

module.exports = router;