const express = require("express");
const {
  addAffectation,
  getAffectation,
} = require("../controllers/Affectation");

const router = express.Router();

router.get("/affectation", getAffectation);
router.post("/affectation", addAffectation);

module.exports = router;
