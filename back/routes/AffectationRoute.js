const express = require("express");
const {
  addAffectation,
  getAffectation,
  getAllAffectation,
} = require("../controllers/Affectation");

const router = express.Router();

router.get("/affectation", getAllAffectation);
router.get("/affectation/:id", getAffectation);
router.post("/affectation", addAffectation);

module.exports = router;
