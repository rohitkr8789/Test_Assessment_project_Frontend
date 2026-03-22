import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./StudentNavbar.css";

function StudentNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  // Later this can come from backend / localStorage
  const user = {
    name: localStorage.getItem("name") || "User",
    email: localStorage.getItem("email"),
    image: localStorage.getItem("image"),
    dateOfBirth: localStorage.getItem("dateOfBirth"),
  };

  const defaultAvatar = "/profile.png";

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active-link" : "";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="student-navbar">
      
      {/* Logo */}
      <div className="student-logo" onClick={() => navigate("/dashboard")}>
        ☕ JavaTestLab
      </div>

      {/* Navigation Links */}
      <div className="student-nav-links">

        <span
          className={isActive("/dashboard")}
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </span>

        <span
          className={isActive("/mcq-test")}
          onClick={() => navigate("/mcq-test")}
        >
          MCQ Test
        </span>

        <span
          className={isActive("/coding")}
          onClick={() => navigate("/coding")}
        >
          Coding
        </span>

        {/* Leaderboard Added */}
        <span
          className={isActive("/leaderboard")}
          onClick={() => navigate("/leaderboard")}
        >
          🏆 Leaderboard
        </span>

      </div>

      {/* Profile */}
      <div className="profile-section" ref={popupRef}>
        <div className="profile-trigger" onClick={() => setOpen(!open)}>
          <img
            src={user?.image ? user.image : defaultAvatar}
            alt="profile"
            className="profile-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />

          <span className="username">{user?.name || "User"}</span>
        </div>

        {open && (
          <div className="profile-popup">
            <img
              src={user?.image ? user.image : defaultAvatar}
              alt="profile"
              className="popup-img"
              onError={(e) => {
                e.target.src = defaultAvatar;
              }}
            />

            <h4>{user?.name}</h4>

            <p>
              <strong>Email:</strong> {user?.email}
            </p>

            <p>
              <strong>DOB:</strong>{" "}
              {user?.dateOfBirth
                ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })
                : "N/A"}
            </p>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

    </nav>
  );
}

export default StudentNavbar;

