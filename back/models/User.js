const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role", required: true },
    stock: { type: Number, default: 0 },
    number: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
// affectation: {
//   type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Affectation" }],
//   default: [],
// },
