import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "./Navbar";
import ViewOptionsMenu from "./ViewOptionsMenu"; // 👈 Import the separated menu

const UserNavbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Navbar title="Enquiry System">
      
      {/* 👈 Simply drop the new component right here! */}
      <ViewOptionsMenu />

      <Link to="/enquiry" className="nav-btn">Enquiry Form</Link>

      {!user ? (
        <>
          <Link to="/login" className="nav-btn">User Login</Link>
          <Link to="/admin-login" className="nav-btn">Admin Login</Link>
        </>
      ) : (
        <>
          <Link to="/status" className="nav-btn">Check Status</Link>
          <Link to="/help" className="nav-btn">❓ Help Center</Link>
          <Link to="/profile" className="nav-btn">⚙️ Settings</Link>
          
          <button onClick={() => { logout(); navigate("/login"); }} className="nav-btn nav-btn-logout">
            Logout ({user.name})
          </button>
        </>
      )}
    </Navbar>
  );
};

export default UserNavbar;