const express = require("express");
const {
  getUserById,
  createUser,
  getAllUsers,
  getGreater,
  getLower,
  updateUser,
  deleteUser,
} = require("../controllers/Users.js");
const { verifyUser, adminOnly } = require("../middleware/AuthUser.js");

const router = express.Router();

router.get("/users", verifyUser, adminOnly, getAllUsers);
router.get("/users/greater", getGreater);
router.get("/users/lower", getLower);
router.get("/users/:id", verifyUser, adminOnly, getUserById);
router.post("/users", verifyUser, adminOnly, createUser);
router.patch("/users/:id", updateUser);
// router.patch("/users/:id", verifyUser, adminOnly, updateUser);
// router.delete("/users/:id", verifyUser, adminOnly, deleteUser);
router.delete("/users/:id", deleteUser);
module.exports = router;
