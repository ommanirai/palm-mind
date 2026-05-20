const { getStats, getAllChat } = require("../controllers/chat.controller");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = require("express").Router();

router.get("/", authenticate, getAllChat);
router.get("/stats", authenticate, authorize("admin"), getStats);

module.exports = router;