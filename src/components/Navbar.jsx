import { useNavigate } from "react-router-dom";
import "../pages/Style/landing.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        ☕ JavaTestLab
      </div>

      <div className="nav-links">
        <button className="nav-btn" onClick={() => navigate("/login")}>
          Login
        </button>

        <button
          className="nav-btn register-btn"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;