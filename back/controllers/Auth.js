const User = require("../models/User.js");
const argon2 = require("argon2");

exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ msg: "Wrong credentials." });
    }
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });

    req.session.userId = user._id;
    const _id = user._id;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({ _id, name, email, role });
  } catch (err) {
    // Handle the error
    console.error(err);
    res.status(500).json({
      errorMessage: "An error occurred while logging in.",
    });
  }
};

exports.Me = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Please login to your account!" });
    }
    const user = await User.findOne({
      _id: req.session.userId,
    }).populate("role");

    // If user not found
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // If user found, return user details
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

exports.logOut = (req, res) => {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(400).json({ msg: "Unable to logout" });
      }
      // If session destroyed successfully
      res.status(200).json({ msg: "You have been logged out" });
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};
