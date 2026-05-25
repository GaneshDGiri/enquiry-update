import { useState } from "react";

const Input = ({ label, type, name, value, onChange, placeholder }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div style={{ marginBottom: "15px", textAlign: "left" }}>
      {label && <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>{label}</label>}
      
      {/* 👇 Added 'password-input-wrapper' class and position relative */}
      <div className={isPassword ? "password-input-wrapper" : ""} style={{ position: "relative", width: "100%" }}>
        
        <input
          type={isPassword && show ? "text" : type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ 
            width: "100%", 
            padding: "10px", 
            paddingRight: isPassword ? "60px" : "10px", // Leaves space for the button!
            borderRadius: "4px", 
            border: "1px solid #ccc" 
          }}
        />
        
        {isPassword && (
          <button
            type="button"
            className="show-hide-btn" // 👈 Added this specific class
            onClick={() => setShow(!show)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "0"
            }}
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;