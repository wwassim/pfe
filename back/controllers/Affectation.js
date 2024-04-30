const Affectation = require("../models/Affectation");
const simController = require("../controllers/Sim.js");
const userController = require("../controllers/Users.js");
const Sim = require("../models/Sim.js");
const User = require("../models/User.js");

exports.getAffectation = async (req, res) => {
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
      (a) => a.receiver.number > sender.number
    );

    res.status(200).json(filteredAffectation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addAffectation = async (req, res) => {
  const { sender, receiver, quantite, firstIccid, lastIccid } = req.body;

  try {
    const currentUser = await User.findById(sender).populate("role");
    const receiverUser = await User.findById(receiver).populate("role");

    const firstSim = await Sim.findOne({ simUser: sender, iccid: firstIccid });
    const lastSim = await Sim.findOne({ simUser: sender, iccid: lastIccid });

    // if (!currentUser || !receiverUser || !firstSim || !lastSim) {
    //   return res
    //     .status(401)
    //     .json({ msg: "Invalid sender, receiver, or ICCID range." });
    // }

    if (currentUser.role.name === "admin") {
      const createSims = await simController.createSim(
        firstIccid,
        lastIccid,
        receiver
      );

      const affectation = await Affectation.create({
        sender: sender,
        receiver: receiver,
        quantite: quantite,
      });

      return res.status(201).json(affectation);
    }

    // check the quantity to be sent
    if (quantite > currentUser.stock) {
      return res
        .status(401)
        .json({ msg: "Cannot send due to insufficient stock." });
    }

    // Check if the user sim equivalent to the current user or not
    if (!firstSim) {
      return res
        .status(401)
        .json({ msg: "The First ICCID is not equivalent to the current user" });
    }

    if (!lastSim) {
      return res
        .status(401)
        .json({ msg: "The Last ICCID is not equivalent to the current user" });
    }

    const createSims = await simController.updateSim(
      firstIccid,
      lastIccid,
      receiver
    );
    currentUser.stock -= quantite;
    receiverUser.stock += quantite;

    await currentUser.save();
    await receiverUser.save();

    const affectation = await Affectation.create({
      sender: sender,
      receiver: receiver,
      quantite: quantite,
    });

    res.status(201).json(affectation);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "An error occurred while processing the request.",
    });
  }
};