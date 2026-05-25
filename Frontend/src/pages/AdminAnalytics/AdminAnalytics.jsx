import "./AdminAnalytics.css";

const AdminAnalytics = () => {
  return (
    <div className="analytics-container">
      <h2 style={{ textAlign: "center" }}>System Analytics Overview</h2>
      <p style={{ textAlign: "center", color: "#888" }}>A high-level view of system performance.</p>

      <div className="stats-grid">
        <div className="stat-box">
          <h3>Total Enquiries</h3>
          <div className="stat-number">124</div>
          <p>Tickets in the database</p>
        </div>

        <div className="stat-box">
          <h3>Pending Replies</h3>
          <div className="stat-number" style={{ color: "#ffc107" }}>18</div>
          <p>Awaiting admin action</p>
        </div>

        <div className="stat-box">
          <h3>Registered Users</h3>
          <div className="stat-number" style={{ color: "#28a745" }}>85</div>
          <p>Active accounts</p>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;