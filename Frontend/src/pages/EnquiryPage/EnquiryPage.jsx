import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiClient } from "../../api/apiClient";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import "./EnquiryPage.css";

const EnquiryPage = () => {
  const { user } = useContext(AuthContext);
  
  // Track text data and file data separately
  const [formData, setFormData] = useState({ name: "", email: "", subject: "General Inquiry", message: "" });
  const [file, setFile] = useState(null);

  // Auto-fill user details if logged in
  useEffect(() => {
    if (user) setFormData((prev) => ({ ...prev, name: user.name, email: user.email }));
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use FormData to support sending files alongside text
    const submitData = new FormData();
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("subject", formData.subject);
    submitData.append("message", formData.message);
    if (file) submitData.append("attachment", file); // Must match backend upload.single("attachment")

    const data = await apiClient("/enquiry", "POST", submitData);
    if (data.success) {
      alert("Enquiry Submitted Successfully!");
      // Reset only the message and file. Keep name, email, and subject for convenience.
      setFormData({ ...formData, message: "" }); 
      setFile(null); 
    } else {
      alert("Failed to submit enquiry.");
    }
  };

  return (
    <div className="enquiry-container">
      <h2 style={{textAlign: "center"}}>Send an Enquiry</h2>
      <Form onSubmit={handleSubmit}>
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
        
        {/* Subject Dropdown Section */}
        <div className="input-group">
          <label className="input-label">
            Subject
          </label>
          <div className="input-wrapper">
            <select 
              name="subject" 
              value={formData.subject} 
              onChange={handleChange}
              className="custom-input"
            >
              <option value="General Inquiry">General Inquiry</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Billing Issue">Billing Issue</option>
              <option value="Feedback">Feedback</option>
            </select>
          </div>
        </div>

        <Input label="Message" name="message" value={formData.message} onChange={handleChange} />
        
        {/* File Upload Section */}
        <div className="input-group">
          <label className="input-label">
            Upload Image or Document (Optional)
          </label>
          <div className="input-wrapper">
            <input 
              type="file" 
              onChange={handleFileChange} 
              accept="image/*,.pdf,.doc,.docx" 
              className="custom-input file-input" 
            />
          </div>
        </div>

        <button type="submit" className="btn-success">Send Message</button>
      </Form>
    </div>
  );
};

export default EnquiryPage;