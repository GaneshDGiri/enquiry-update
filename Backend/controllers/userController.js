const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (id, secret, expiresIn) => {
  return jwt.sign({ id }, secret, { expiresIn });
};

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400); throw new Error("User already exists");
    }
    const user = await User.create({ name, email, password });
    if (user) res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) { next(error); }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        token: generateToken(user._id, process.env.JWT_SECRET, "30d"),
        user: { id: user._id, name: user.name, email: user.email }
      });
    } else {
      res.status(401); throw new Error("Invalid email or password");
    }
  } catch (error) { next(error); }
};

exports.adminLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (email === "giriganesh016@gmail.com" && password === "Gani@3010") {
      res.json({
        success: true,
        token: generateToken("admin", process.env.ADMIN_SECRET, "1d"),
        message: "Admin login successful"
      });
    } else {
      res.status(401); throw new Error("Invalid admin credentials");
    }
  } catch (error) { next(error); }
};

exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.name = req.body.name || user.name;
      // Only update password if provided and not blank spaces
      if (req.body.password && req.body.password.trim() !== "") {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        success: true,
        token: generateToken(updatedUser._id, process.env.JWT_SECRET, "30d"),
        user: { id: updatedUser._id, name: updatedUser.name, email: updatedUser.email },
        message: "Profile updated successfully"
      });
    } else {
      res.status(404); throw new Error("User not found");
    }
  } catch (error) { next(error); }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) { next(error); }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) { res.status(404); throw new Error("User not found"); }
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) { next(error); }
};