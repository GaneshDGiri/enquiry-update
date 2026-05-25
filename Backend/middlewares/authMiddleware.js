const jwt = require("jsonwebtoken");
const User = require("../models/User");

// 1. Protect Middleware (Ensures user/admin has a valid token)
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      
      // Check if it's the Admin token
      if (token === process.env.ADMIN_SECRET || jwt.decode(token)?.id === "admin") {
        req.user = { id: "admin", role: "admin" };
        return next();
      }

      // Otherwise, verify User token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

// 2. Admin Only Middleware
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
};

// 3. User Only Middleware
const userOnly = (req, res, next) => {
  if (req.user && req.user.role !== "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Admins cannot perform this user action");
  }
};

module.exports = { protect, adminOnly, userOnly };