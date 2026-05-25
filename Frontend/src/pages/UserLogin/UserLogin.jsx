import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { apiClient } from "../../api/apiClient";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import "./UserLogin.css";

const UserLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await apiClient("/user/login", "POST", formData);
    if (data.success) {
      login(data.user, data.token, "user");
      navigate("/enquiry");
    } else alert(data.message);
  };

  if (user) return (
    <div className="login-container profile-card">
      <h2>Welcome, {user.name}!</h2>
      <button onClick={() => navigate("/enquiry")} className="btn-submit">Dashboard</button>
      <button onClick={() => { logout(); navigate("/login"); }} className="btn-submit" style={{background: "red"}}>Logout</button>
    </div>
  );

  return (
    <div className="login-container">
      <h2 style={{textAlign: "center", marginBottom: "20px", color: "red"}}>User Login</h2>
      <Form onSubmit={handleSubmit}>
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
        <Input label="Password" name="password" type="password" value={formData.password} onChange={handleChange} />
        <button type="submit" className="btn-submit">Login</button>
      </Form>
      <p style={{textAlign: "center", marginTop: "15px"}}><Link to="/register">Register here</Link></p>
    </div>
  );
};
export default UserLogin;