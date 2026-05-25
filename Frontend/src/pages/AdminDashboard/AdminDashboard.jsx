import { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [actionMode, setActionMode] = useState({});

  const fetchEnquiries = async () => {
    const result = await apiClient("/enquiry");
    if (Array.isArray(result)) setData(result);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleReply = async (id) => {
    const mode = actionMode[id] || "new";
    let finalReplyText = replyText[id];

    if (!finalReplyText) return alert("Please enter a reply text.");

    if (mode === "next") {
      const currentItem = data.find(item => item._id === id);
      const dateStr = new Date().toLocaleDateString();
      finalReplyText = `${currentItem.adminReply}\n\n--- Next Reply (${dateStr}) ---\n${finalReplyText}`;
    }
    
    const res = await apiClient(`/enquiry/${id}/reply`, "PUT", { adminReply: finalReplyText });
    if (res.success) {
      alert("Reply saved successfully!");
      fetchEnquiries();
      setActionMode({ ...actionMode, [id]: null });
      setReplyText({ ...replyText, [id]: "" });
    }
  };

  // 👇 ADDED: Function to close the ticket
  const handleCloseTicket = async (id) => {
    if (!window.confirm("Are you sure you want to close this ticket? Neither you nor the user can add more messages after closing.")) return;

    const res = await apiClient(`/enquiry/${id}/close`, "PUT");
    if (res.success) {
      alert("Ticket Closed!");
      fetchEnquiries();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this spam message?")) return;
    const res = await apiClient(`/enquiry/${id}`, "DELETE");
    if (res.success) {
      alert("Message Deleted");
      fetchEnquiries();
    }
  };

  // Helper to get status pill colors dynamically
  const getStatusColor = (status) => {
    if (status === "Closed") return "#6c757d"; // Grey for closed
    if (status === "Replied") return "#28a745"; // Green for replied
    return "#dc3545"; // Red for pending
  };

  return (
    <div className="admin-container">
      <h2 style={{textAlign: "center"}}>Admin Dashboard</h2>
      
      {data.length === 0 ? (
        <p style={{textAlign: "center", color: "#666"}}>No enquiries found.</p>
      ) : (
        data.map((item) => (
          <div key={item._id} className="admin-card">
            
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "10px" }}>
              <div>
                <p><b>User:</b> {item.name} ({item.email})</p>
                <p><b>Subject:</b> <span style={{ color: "#007bff" }}>{item.subject || "General Inquiry"}</span></p>
              </div>
              <button onClick={() => handleDelete(item._id)} style={{ background: "#dc3545", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                Delete Message
              </button>
            </div>

            <p style={{ marginTop: "10px" }}><b>Message:</b> {item.message}</p>
            
            {item.attachment && (
              <p style={{ marginTop: "10px", marginBottom: "10px" }}>
                <b>Attachment:</b> <a href={`http://localhost:5000${item.attachment}`} target="_blank" rel="noopener noreferrer" style={{ padding: "5px 10px", background: "#17a2b8", color: "white", borderRadius: "4px", textDecoration: "none", fontSize: "12px", display: "inline-block" }}>View File</a>
              </p>
            )}

            <p style={{ marginTop: "10px" }}>
              <b>Status:</b> <span style={{ color: getStatusColor(item.status), fontWeight: "bold"}}>{item.status}</span>
            </p>

            {/* 👇 LOCKED DOWN REPLY SECTION FOR CLOSED TICKETS */}
            {item.status === "Closed" ? (
              <div style={{ background: "#e2e3e5", padding: "12px", marginTop: "15px", borderRadius: "4px", textAlign: "center", border: "1px solid #ced4da" }}>
                <p style={{ margin: 0, color: "#383d41", fontWeight: "bold" }}>🔒 Ticket Closed — Conversation Locked</p>
                {item.adminReply && (
                  <p style={{ whiteSpace: "pre-wrap", textAlign: "left", marginTop: "10px", fontSize: "14px", color: "#444" }}><b>Final Resolution Summary:</b><br/>{item.adminReply}</p>
                )}
              </div>
            ) : item.status === "Replied" && !actionMode[item._id] ? (
              <div className="admin-reply-box" style={{ background: "#f8f9fa", padding: "15px", marginTop: "10px", borderRadius: "4px", borderLeft: "4px solid #28a745" }}>
                <p style={{ whiteSpace: "pre-wrap", margin: 0, color: "#333" }}><b>Admin Replies:</b><br/><br/>{item.adminReply}</p>
                
                <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                  <button 
                    onClick={() => {
                      setActionMode({ ...actionMode, [item._id]: "update" });
                      setReplyText({ ...replyText, [item._id]: item.adminReply });
                    }}
                    style={{ background: "#ffc107", border: "none", padding: "6px 12px", cursor: "pointer", borderRadius: "4px", fontWeight: "bold", color: "#333" }}
                  >
                    ✏️ Edit Current Reply
                  </button>
                  <button 
                    onClick={() => {
                      setActionMode({ ...actionMode, [item._id]: "next" });
                      setReplyText({ ...replyText, [item._id]: "" });
                    }}
                    style={{ background: "#17a2b8", color: "white", border: "none", padding: "6px 12px", cursor: "pointer", borderRadius: "4px", fontWeight: "bold" }}
                  >
                    ➕ Add Next Reply
                  </button>
                  
                  {/* 👈 Close Ticket Option */}
                  <button 
                    onClick={() => handleCloseTicket(item._id)}
                    style={{ background: "#6c757d", color: "white", border: "none", padding: "6px 12px", cursor: "pointer", borderRadius: "4px", fontWeight: "bold" }}
                  >
                    🔒 Close Ticket
                  </button>
                </div>
              </div>
            ) : (
              <div className="admin-input-group" style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                {actionMode[item._id] === "next" && (
                  <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>Adding a new message to the existing reply thread...</p>
                )}
                
                <textarea 
                  placeholder="Type your reply here..." 
                  className="admin-input"
                  style={{ width: "100%", padding: "10px", minHeight: "80px", fontFamily: "inherit", borderRadius: "4px", border: "1px solid #ccc" }}
                  value={replyText[item._id] !== undefined ? replyText[item._id] : ""}
                  onChange={(e) => setReplyText({ ...replyText, [item._id]: e.target.value })}
                />
                
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => handleReply(item._id)} className="btn-send" style={{ background: "#28a745", color: "white", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                    {actionMode[item._id] === "update" ? "Save Edited Reply" : actionMode[item._id] === "next" ? "Send Next Reply" : "Send Initial Reply"}
                  </button>
                  
                  {/* Give option to close right from the initial screen if needed */}
                  <button onClick={() => handleCloseTicket(item._id)} style={{ background: "#6c757d", color: "white", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
                    Close Ticket Without Reply
                  </button>

                  {actionMode[item._id] && (
                    <button onClick={() => setActionMode({...actionMode, [item._id]: null})} style={{ background: "#6c757d", color: "white", border: "none", padding: "8px 15px", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                  )}
                </div>
              </div>
            )}

          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;