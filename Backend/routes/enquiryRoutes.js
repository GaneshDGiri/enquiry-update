const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const { protect, adminOnly, userOnly } = require("../middlewares/authMiddleware");
const { 
  createEnquiry, getEnquiries, replyToEnquiry, getUserEnquiries, deleteEnquiry, closeEnquiry
} = require("../controllers/enquiryController");

// USER ROUTES
router.post("/", protect, userOnly, upload.single("attachment"), createEnquiry);
router.get("/user/:email", protect, userOnly, getUserEnquiries);

// ADMIN ROUTES
router.get("/", protect, adminOnly, getEnquiries);
router.put("/:id/reply", protect, adminOnly, replyToEnquiry);
router.put("/:id/close", protect, adminOnly, closeEnquiry);
router.delete("/:id", protect, adminOnly, deleteEnquiry);

module.exports = router;