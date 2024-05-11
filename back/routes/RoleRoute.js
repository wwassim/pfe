const express = require("express");
const { getAllRoles } = require("../controllers/Roles.js");

const router = express.Router();

router.get("/role", getAllRoles);

module.exports = router;
