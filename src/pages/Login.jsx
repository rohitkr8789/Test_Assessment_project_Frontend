import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "./Style/Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const storage = rememberMe ? localStorage : sessionStorage;

  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      // remove any previous tokens and user data
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("image");
      localStorage.removeItem("dateOfBirth");

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
      const role = res.data.role;
      const name = res.data.name;
      const userEmail = res.data.email;
      const imageUrl = res.data.imageUrl;
      const dateOfBirth = res.data.dateOfBirth;

      // store token based on remember me
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // store everything in same storage
      storage.setItem("token", token);
      storage.setItem("role", role);
      storage.setItem("name", name);
      storage.setItem("email", userEmail);
      storage.setItem("image", imageUrl);
      storage.setItem("dateOfBirth", dateOfBirth);

      // redirect based on role
      if (role === "ADMIN") {
        navigate("/admin/home");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* LEFT PANEL */}

      <div className="login-left">
        <div className="overlay-content">
          <h1>Java Assessment Platform</h1>

          <p>
            Practice coding challenges and Java MCQ tests to improve interview
            skills.
          </p>

          <ul>
            <li>✔ Real-time Code Execution</li>
            <li>✔ Coding + MCQ Tests</li>
            <li>✔ Performance Leaderboard</li>
            <li>✔ Interview Preparation</li>
          </ul>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="login-right">
        <div className="login-card">
          <div className="login-avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="avatar"
            />
          </div>

          <h2>Login</h2>

          <form onSubmit={handleLogin}>
            {error && <p className="login-error">{error}</p>}

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              required
            />

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  required
                />
                Remember Me
              </label>

              <span
                className="forgot-password"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </span>
            </div>

            <button onClick={handleLogin} disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="login-link">
              Don't have an account?
              <span onClick={() => navigate("/register")}> Register</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
