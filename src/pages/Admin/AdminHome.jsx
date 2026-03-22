import React from "react";
import { useNavigate } from "react-router-dom";
import "../AdminStyle/AdminHome.css";

function AdminHome() {

  const navigate = useNavigate();

  return (
    <div className="admin-home-container">

      <h1 className="admin-home-title">Admin Control Panel</h1>

      <div className="admin-home-buttons">

        <button
          className="admin-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          Admin Dashboard
        </button>

        <button
          className="candidate-btn"
          onClick={() => navigate("/dashboard")}
        >
          Candidate Dashboard
        </button>

      </div>

    </div>
  );
}

export default AdminHome;