import { useContext, useState } from "react";
import { ViewContext } from "../../context/ViewContext";

const ViewOptionsMenu = () => {
  // Grab all the functions from our ViewContext
  const { viewMode, setDesktop, setMobile, theme, setDark, setLight } = useContext(ViewContext);
  
  // Manage whether the dropdown is open or closed
  const [showViewMenu, setShowViewMenu] = useState(false);

  return (
    <div className="view-menu-container">
      <button onClick={() => setShowViewMenu(!showViewMenu)} className="view-btn">
        👁️ View Options
      </button>
      
      {showViewMenu && (
        <div className="view-dropdown" onMouseLeave={() => setShowViewMenu(false)}>
          <div className="dropdown-section-title">Layout</div>
          <button className={`dropdown-option ${viewMode === "desktop" ? "active" : ""}`} onClick={setDesktop}>💻 Desktop View</button>
          <button className={`dropdown-option ${viewMode === "mobile" ? "active" : ""}`} onClick={setMobile}>📱 Mobile View</button>
          
          <hr style={{ borderColor: "#555", margin: "10px 0" }} />
          
          <div className="dropdown-section-title">Theme</div>
          <button className={`dropdown-option ${theme === "dark" ? "active" : ""}`} onClick={setDark}>🌙 Dark Mode</button>
          <button className={`dropdown-option ${theme === "light" ? "active" : ""}`} onClick={setLight}>☀️ Light Mode</button>
        </div>
      )}
    </div>
  );
};

export default ViewOptionsMenu;