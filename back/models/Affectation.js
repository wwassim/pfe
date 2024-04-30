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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Affectation", AffectationSchema);
