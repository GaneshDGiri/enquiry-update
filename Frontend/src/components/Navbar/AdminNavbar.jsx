import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "./Navbar";
import ViewOptionsMenu from "./ViewOptionsMenu"; // 👈 Import the separated menu

const AdminNavbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Navbar title="Admin Panel">
      
      {/* 👈 Simply drop the new component right here! */}
      <ViewOptionsMenu />

      <Link to="/admin-analytics" className="nav-btn" style={{ marginRight: "10px", color: "#17a2b8" }}>Analytics</Link>
      <Link to="/admin-dashboard" className="nav-btn" style={{ marginRight: "10px" }}>Enquiries</Link>
      <Link to="/admin-users" className="nav-btn" style={{ marginRight: "15px", color: "#ffc107" }}>Manage Users</Link>
      
      <button onClick={() => { logout(); navigate("/admin-login"); }} className="nav-btn nav-btn-logout">
        Logout Admin
      </button>
    </Navbar>
  );
};

export default AdminNavbar;