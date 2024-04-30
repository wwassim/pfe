const Sim = require("../models/Sim.js");

exports.createSim = async (firstIccid, lastIccid, receiver, res) => {
  try {
    const firstSim = await Sim.findOne({ iccid: firstIccid });

    if (firstSim) {
      // Find the biggest ICCID (if any)
      const maxNum = await Sim.findOne({})
        .sort({ iccid: -1 })
        .select("iccid")
        .limit(1)
        .exec();

      const msg =
        "This Sim already exists in the database but the last iccid : " +
        maxNum.iccid;
      console.log(msg);
      return { msg };
    }

    // Determine starting ICCID based on maxNum or 00000001
    const last = parseInt(lastIccid) - parseInt(firstIccid);

    for (let i = 0; i <= last; i++) {
      const newNum = (parseInt(firstIccid) + i).toString().padStart(8, "0"); //20 chiffres
      const newSim = await Sim.create({
        iccid: newNum,
        simUser: receiver,
      });
    }
  } catch (error) {
    console.error("Error creating Sims:", error);
    throw error;
  }
};

exports.updateSim = async (firstIccid, lastIccid, receiver) => {
  try {
    const result = await Sim.updateMany(
      { iccid: { $gte: firstIccid, $lte: lastIccid } },
      { $set: { simUser: receiver } }
    );

    return result;
  } catch (error) {
    console.error("Error creating Sims:", error);
    throw error;
  }
};
