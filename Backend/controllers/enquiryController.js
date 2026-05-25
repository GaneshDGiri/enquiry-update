const Enquiry = require("../models/Enquiry");

exports.createEnquiry = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    let attachment = null;
    if (req.file) attachment = `/uploads/${req.file.filename}`;

    const enquiry = await Enquiry.create({ name, email, subject: subject || "General Inquiry", message, attachment });
    res.status(201).json({ success: true, data: enquiry });
  } catch (error) { next(error); }
};

exports.getUserEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({ email: req.params.email }).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) { next(error); }
};

exports.getEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) { next(error); }
};

exports.replyToEnquiry = async (req, res, next) => {
  try {
    const { adminReply } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) { res.status(404); throw new Error("Enquiry not found"); }
    if (enquiry.status === "Closed") { res.status(400); throw new Error("Ticket is closed"); }

    enquiry.adminReply = adminReply;
    enquiry.status = "Replied";
    await enquiry.save();
    res.json({ success: true, data: enquiry });
  } catch (error) { next(error); }
};

exports.closeEnquiry = async (req, res, next) => {
  try {
    const updatedEnquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: "Closed" }, { new: true });
    if (!updatedEnquiry) { res.status(404); throw new Error("Enquiry not found"); }
    res.json({ success: true, data: updatedEnquiry, message: "Ticket closed successfully" });
  } catch (error) { next(error); }
};

exports.deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) { res.status(404); throw new Error("Enquiry not found"); }
    res.json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) { next(error); }
};