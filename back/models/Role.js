const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
  },
  //   users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
