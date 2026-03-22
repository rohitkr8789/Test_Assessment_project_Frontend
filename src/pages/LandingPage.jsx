import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Style/landing.css";

function LandingPage() {
  const navigate = useNavigate();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="landing-container">
      <div className="aurora-bg"></div>

      <div
        className="mouse-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      ></div>

      <div className="grid-overlay"></div>

      <Navbar />

      <section className="hero">
        <div className="hero-left">
          <span className="hero-badge">Next Gen Java Assessment Platform</span>

          <h1>
            Build Your Java Interview Skills
            <span className="highlight-text"> with Real-Time Practice</span>
          </h1>

          <p>
            Practice coding tests, MCQ quizzes, and compete on the leaderboard
            with a clean, professional assessment experience.
          </p>

          <div className="hero-buttons">
            <button
              className="start-btn"
              onClick={() => navigate("/register")}
            >
              Start Free
            </button>

            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="code-card">
            <div className="card-top">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>

            <h3>Example Challenge</h3>
            <p>Reverse a string</p>

            <pre>{`public String reverse(String s) {
    StringBuilder sb = new StringBuilder(s);
    return sb.reverse().toString();
}`}</pre>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h4>Real-time Code Execution</h4>
          <p>Run Java code instantly and verify output with test cases.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h4>Leaderboard Ranking</h4>
          <p>Track performance and compare scores with other candidates.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h4>MCQ + Coding Tests</h4>
          <p>Evaluate both theoretical concepts and practical skills.</p>
        </div>
      </section>

      <footer className="footer">
        © 2026 Java Technical Assessment Platform
      </footer>
    </div>
  );
}

export default LandingPage;