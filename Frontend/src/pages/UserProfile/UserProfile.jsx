// frontend/src/pages/UserProfile/UserProfile.jsx
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiClient } from "../../api/apiClient";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import "./UserProfile.css"; // 👈 Importing its dedicated CSS

const UserProfile = () => {
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: "", password: "" });

  useEffect(() => {
    if (user) setFormData({ name: user.name, password: "" });
  }, [user]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Only send the password if they actually typed a new one
    const updateData = { name: formData.name };
    if (formData.password) updateData.password = formData.password;

    const data = await apiClient("/user/profile", "PUT", updateData);
    
    if (data.success) {
      alert("Profile updated successfully!");
      // Update global context with new name and token
      login(data.user, data.token, "user");
      setFormData({ ...formData, password: "" }); // Clear password field
    } else {
      alert(data.message || "Update failed");
    }
  };

  return (
    <div className="profile-container">
      <h2 style={{textAlign: "center"}}>Profile Settings</h2>
      <p className="profile-email-display">
        Account Email: <b>{user?.email}</b>
      </p>
      
      <Form onSubmit={handleSubmit}>
        <Input label="Update Name" name="name" value={formData.name} onChange={handleChange} />
        
        
        <Input label="New Password" name="password" type="password" value={formData.password} onChange={handleChange} />
        
        <button type="submit" className="btn-update">Save Changes</button>
      </Form>
    </div>
  );
};

export default UserProfile;