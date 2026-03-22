import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "../AdminStyle/AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const popupRef = useRef(null);

  const admin = {
    name: localStorage.getItem("name") || "Admin",
    email: localStorage.getItem("email"),
    image: localStorage.getItem("image"),
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
    <nav className="admin-navbar">
      {/* Logo */}
      <div className="admin-logo" onClick={() => navigate("/admin/dashboard")}>
        ⚙️ Admin Panel
      </div>

      {/* Navigation Links */}
      <div className="admin-nav-links">
        <span
          className={isActive("/admin/home")}
          onClick={() => navigate("/admin/home")}
        >
          Home
        </span>
        <span
          className={isActive("/admin/dashboard")}
          onClick={() => navigate("/admin/dashboard")}
        >
          Dashboard
        </span>

        <span
          className={isActive("/admin/mcq-list")}
          onClick={() => navigate("/admin/mcq-list")}
        >
          MCQ Questions
        </span>

        <span
          className={isActive("/admin/coding-list")}
          onClick={() => navigate("/admin/coding-list")}
        >
          Coding Questions
        </span>
      </div>

      {/* Profile Section */}
      <div className="profile-section" ref={popupRef}>
        <div className="profile-trigger" onClick={() => setOpen(!open)}>
          <img
            src={admin?.image ? admin.image : defaultAvatar}
            alt="profile"
            className="profile-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />

          <span className="username">{admin?.name || "Admin"}</span>
        </div>

        {open && (
          <div className="profile-popup">
            <img
              src={admin?.image ? admin.image : defaultAvatar}
              alt="profile"
              className="popup-img"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
            />

            <h4>{admin?.name}</h4>

            <p>
              <strong>Email:</strong> {admin?.email}
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

export default AdminNavbar;
