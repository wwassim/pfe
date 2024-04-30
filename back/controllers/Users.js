const User = require("../models/User.js");
const Role = require("../models/Role.js");
const argon2 = require("argon2");

//get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").populate("role");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...other } = user._doc;
    res.status(200).json(other);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const urole = await Role.findById(role);
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
      number: urole.number,
    });
    res.status(201).json({ msg: "Register " });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

exports.checkUser = async (sender, receiver, quantite) => {
  try {
    const senderU = await User.findById(sender).populate("role");
    const receiverU = await User.findById(receiver);
    const senderRoleName = senderU.role.name;

    if (senderRoleName === "magasinier") {
      // new updates
      receiverU.stock += quantite;
    } else {
      if (quantite > senderU.stock) {
        throw new Error("Cannot send due to insufficient stock.");
      } else {
        senderU.stock -= quantite;
        receiverU.stock += quantite;
      }
    }

    await senderU.save();
    await receiverU.save();
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
};

// koul wahed yabaath eli tahto k'hw
exports.getGreater = async (req, res) => {
  const { number } = req.query;
  const targetNumber = parseInt(number) + 1;
  try {
    const users = await User.find({ number: targetNumber });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getLower = async (req, res) => {
  const { number } = req.query;
  try {
    const users = await User.find({ number: { $lt: number } });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
