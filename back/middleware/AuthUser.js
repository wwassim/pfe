const User = require("../models/User.js");

exports.verifyUser = async (req, res, next) => {
  console.log(req.session);
  try {
    // Check if userId is stored in the session

    if (!req.session.userId) {
      return res.status(401).json({ msg: "Please login to your account!" });
    }

    // Find the user by _id stored in the session
    const user = await User.findOne({ _id: req.session.userId }).populate(
      "role"
    );

    // If user not found
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Store user id and role in request for further middleware
    req.userId = user._id;
    req.role = user.role.name;

    // Call next middleware
    next();
  } catch (error) {
    // If there's an error, send error response
    console.error("Error verifying user:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.adminOnly = async (req, res, next) => {
  try {
    // Find the user by _id stored in the session
    const user = await User.findOne({ _id: req.session.userId });

    // If user not found
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the user is an admin
    if (user.role !== "magasinier") {
      return res.status(403).json({ msg: "Access forbidden" });
    }

    // If the user is an admin, call the next middleware
    next();
  } catch (error) {
    // If there's an error, send error response
    console.error("Error checking admin role:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
