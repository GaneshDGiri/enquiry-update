import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { apiClient } from "../../api/apiClient";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiClient("/user/admin/login", "POST", formData);
    if (data.success) {
      login(null, data.token, "admin");
      navigate("/admin-dashboard");
    } else alert("Invalid Credentials");
  };

  return (
    <div className="admin-login-container">
      <h2 style={{textAlign: "center", marginBottom: "20px", color: "red"}}>Admin Login</h2>
      <Form onSubmit={handleSubmit}>
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
        <button type="submit" className="btn-admin">Login as Admin</button>
      </Form>
    </div>
  );
};
export default AdminLogin;