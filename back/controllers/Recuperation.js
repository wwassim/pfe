const Affectation = require("../models/Affectation");
const simController = require("../controllers/Sim.js");
const userController = require("../controllers/Users.js");
const User = require("../models/User.js");

exports.getRecuperation = async (req, res) => {
  const { senderId } = req.query;

  try {
    const sender = await User.findOne({
      _id: senderId,
    });
    if (!sender) {
      return res.status(404).json({ msg: "Sender not found" });
    }

    const affectation = await Affectation.find({ sender: senderId })
      .populate("sender")
      .populate("receiver");

    if (!affectation) {
      return res
        .status(404)
        .json({ msg: "No affectation found for the given sender ID." });
    }

    const filteredAffectation = affectation.filter(
      (a) => a.receiver.number < sender.number
    );

    res.status(200).json(filteredAffectation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addRecuperation = async (req, res) => {
  const { sender, receiver, quantite } = req.body;

  try {
    const affectation = await Affectation.create({
      sender: sender,
      receiver: receiver,
      quantite: quantite,
    });
    // await simController.createSim(quantite);
    await userController.checkUser(sender, receiver, quantite);
    res.status(201).json(affectation);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
