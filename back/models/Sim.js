const mongoose = require("mongoose");

const SimSchema = new mongoose.Schema(
  {
    iccid: { type: String, required: true, default: "0" },
    simUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Sim", SimSchema);
