const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: "General Inquiry" },
  message: { type: String, required: true },
  attachment: { type: String }, // Stores the file path
  status: { type: String, enum: ["Pending", "Replied", "Closed"], default: "Pending" },
  adminReply: { type: String, default: "" },
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);