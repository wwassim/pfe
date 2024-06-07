const mongoose = require("mongoose");

const AffectationSchema = new mongoose.Schema(
  {
    quantite: { type: Number, required: true },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firsticcid: { type: String, required: true, default: "0" },
    lasticcid: { type: String, required: true, default: "0" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Affectation", AffectationSchema);
