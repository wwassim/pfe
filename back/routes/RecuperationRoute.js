const express = require("express");
const {
  getRecuperation,
  addRecuperation,
} = require("../controllers/Recuperation");

const router = express.Router();

router.get("/recuperation/:id", getRecuperation);
router.post("/recuperation", addRecuperation);

module.exports = router;
