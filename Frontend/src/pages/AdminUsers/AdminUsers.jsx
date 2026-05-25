// frontend/src/pages/UserProfile/UserProfile.jsx
import { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";
import "./AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const result = await apiClient("/user");
    if (Array.isArray(result)) setUsers(result);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}? This removes their account completely.`)) return;

    const res = await apiClient(`/user/${id}`, "DELETE");
    if (res.success) {
      alert("Spam User Deleted");
      fetchUsers(); // Refresh the list
    } else {
      alert(res.message || "Failed to delete user");
    }
  };

  return (
    <div className="admin-users-container">
      <h2 style={{textAlign: "center"}}>Manage & Delete Spam Users</h2>
      
      {users.length === 0 ? (
        <p className="no-users-text">No users found.</p>
      ) : (
        users.map((u) => (
          <div key={u._id} className="user-manager-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#1e1e1e", padding: "15px", margin: "10px 0", borderRadius: "8px", border: "1px solid #333" }}>
            
            <div className="user-manager-info" style={{ color: "white" }}>
              <p style={{ margin: "5px 0" }}><b>Name:</b> {u.name}</p>
              <p style={{ margin: "5px 0" }}><b>Email:</b> <span style={{ color: "#007bff" }}>{u.email}</span></p>
              <p style={{ fontSize: "12px", color: "#888", marginTop: "5px" }}>Joined: {new Date(u.createdAt).toLocaleDateString()}</p>
            </div>
            
            {/* The button to delete the spam user */}
            <button 
              onClick={() => handleDelete(u._id, u.name)} 
              style={{ background: "#dc3545", color: "white", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
            >
              Delete User
            </button>
            
          </div>
        ))
      )}
    </div>
  );
};

export default AdminUsers;