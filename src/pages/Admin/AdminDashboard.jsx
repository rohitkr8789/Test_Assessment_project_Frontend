import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";
import "../AdminStyle/AdminDashboard.css";
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const AdminDashboard = () => {
console.log("Dashboard Loaded");
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalCandidates: 0,
    totalMcqQuestions: 0,
    totalCodingQuestions: 0,
    totalSubmissions: 0
  });

  useEffect(() => {

    api.get("/admin/dashboard-stats")
      .then((res) => {
        console.log("Dashboard Stats:", res.data);
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Error fetching dashboard stats:", err);
      });

  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="admin-dashboard-container">
        <h2 className="admin-title">Admin Dashboard</h2>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stat-card">
            <h3>👨 Candidates</h3>
            <p>{stats.totalCandidates}</p>
          </div>

          <div className="stat-card">
            <h3>📝 MCQ Questions</h3>
            <p>{stats.totalMcqQuestions}</p>
          </div>

          <div className="stat-card">
            <h3>💻 Coding Questions</h3>
            <p>{stats.totalCodingQuestions}</p>
          </div>

          <div className="stat-card">
            <h3>📤 Submissions</h3>
            <p>{stats.totalSubmissions}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="admin-actions">
          <button
            className="action-btn blue"
            onClick={() => navigate("/admin/add-mcq")}
          >
            ➕ Add MCQ Question
          </button>

          <button
            className="action-btn green"
            onClick={() => navigate("/admin/mcq-list")}
          >
            📋 View MCQ Questions
          </button>

          <button
            className="action-btn orange"
            onClick={() => navigate("/admin/add-coding")}
          >
            ➕ Add Coding Question
          </button>

          <button
            className="action-btn red"
            onClick={() => navigate("/admin/coding-list")}
          >
            📋 View Coding Questions
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
