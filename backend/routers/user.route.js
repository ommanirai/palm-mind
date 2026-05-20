const { getAllUser, getSingleUser, updateUser, deleteUser } = require("../controllers/user.controller");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

const router = require("express").Router();

router.get("/", authenticate, authorize("admin"), getAllUser);
router.get("/:id", authenticate, authorize("user"), getSingleUser);
router.put("/:id", authenticate, authorize("user"), updateUser);
router.delete("/:id", authenticate, authorize("admin"), deleteUser);

module.exports = router;