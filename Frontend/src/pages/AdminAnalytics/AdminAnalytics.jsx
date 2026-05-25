import { useState, useEffect } from "react";
import { apiClient } from "../../api/apiClient";
import "./AdminAnalytics.css";

const AdminAnalytics = () => {
  // 1. Setup state to hold our real database numbers
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    pendingReplies: 0,
    totalUsers: 0
  });
  const [loading, setLoading] = useState(true);

  // 2. Fetch the data from the backend when the page loads
  useEffect(() => {
    const fetchRealData = async () => {
      try {
        // Fetch both users and enquiries at the same time for speed
        const [usersResult, enquiriesResult] = await Promise.all([
          apiClient("/user"),
          apiClient("/enquiry")
        ]);

        let userCount = 0;
        let enquiryCount = 0;
        let pendingCount = 0;

        // Count real users
        if (Array.isArray(usersResult)) {
          userCount = usersResult.length;
        }

        // Count real enquiries and filter out the pending ones
        if (Array.isArray(enquiriesResult)) {
          enquiryCount = enquiriesResult.length;
          pendingCount = enquiriesResult.filter(
            (item) => item.status === "Pending"
          ).length;
        }

        // Update the screen with the real math!
        setStats({
          totalUsers: userCount,
          totalEnquiries: enquiryCount,
          pendingReplies: pendingCount
        });
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false); // Turn off the loading screen
      }
    };

    fetchRealData();
  }, []);

  return (
    <div className="analytics-container">
      <h2 style={{ textAlign: "center" }}>System Analytics Overview</h2>
      <p style={{ textAlign: "center", color: "#888" }}>
        Live data pulled directly from your MongoDB database.
      </p>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "40px", fontSize: "18px" }}>
          ⏳ Loading real-time data...
        </p>
      ) : (
        <div className="stats-grid">
          <div className="stat-box">
            <h3>Total Enquiries</h3>
            {/* Display Real Enquiry Count */}
            <div className="stat-number">{stats.totalEnquiries}</div>
            <p>Tickets in the database</p>
          </div>

          <div className="stat-box">
            <h3>Pending Replies</h3>
            {/* Display Real Pending Count */}
            <div className="stat-number" style={{ color: "#ffc107" }}>
              {stats.pendingReplies}
            </div>
            <p>Awaiting admin action</p>
          </div>

          <div className="stat-box">
            <h3>Registered Users</h3>
            {/* Display Real User Count */}
            <div className="stat-number" style={{ color: "#28a745" }}>
              {stats.totalUsers}
            </div>
            <p>Active accounts</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAnalytics;
