const Affectation = require("../models/Affectation");
const simController = require("../controllers/Sim.js");
const Sim = require("../models/Sim.js");
const User = require("../models/User.js");

exports.getAllAffectation = async (req, res) => {
  try {
    const affectation = await Affectation.find()
      .populate("sender")
      .populate("receiver");

    if (!affectation) {
      return res.status(404).json({ msg: "No affectation found " });
    }

    res.status(200).json(affectation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAffectation = async (req, res) => {
  try {
    const sender = await User.findById(req.params.id);
    if (!sender) {
      return res.status(404).json({ msg: "Sender not found" });
    }

    const affectation = await Affectation.find({ sender: sender._id })
      .populate("sender")
      .populate("receiver");
    if (!affectation) {
      return res
        .status(404)
        .json({ msg: "No affectation found for the given sender ID." });
    }

    const filteredAffectations = affectation.filter(
      (a) => a.receiver && a.receiver.number > sender.number
    );

    res.status(200).json(filteredAffectations);
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

    if (currentUser.role.name === "admin") {
      const createSims = await simController.createSim(
        firstIccid,
        lastIccid,
        receiver
      );
      if (createSims.msg) {
        return res.status(400).json({ msg: createSims.msg });
      }

      const affectation = await Affectation.create({
        sender: sender,
        receiver: receiver,
        quantite: quantite,
        firsticcid: firstIccid,
        lasticcid: lastIccid,
      });

      receiverUser.stock += quantite;

      await receiverUser.save();

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
      firsticcid: firstIccid,
      lasticcid: lastIccid,
    });

    res.status(201).json(affectation);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errorMessage: "An error occurred while processing the request.",
    });
  }
};
