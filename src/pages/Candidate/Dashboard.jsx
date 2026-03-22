import { useNavigate } from "react-router-dom";
import StudentNavbar from "../../components/StudentNavbar";
import "../Style/Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <>
      <StudentNavbar />

      <div className="dashboard-container">

        <div className="welcome-section">
          <h1>Welcome 👋</h1>
          <p>Today's assessment contains <b>10 MCQ</b> and <b>2 Coding questions</b>.</p>
        </div>

        <div className="assessment-wrapper">

          <div className="assessment-card">
            <div className="icon">🧠</div>

            <h2>MCQ Assessment</h2>

            <p>
              Attempt today's 10 MCQ questions and test your Java knowledge.
            </p>

            <button
              className="start-btn"
              onClick={() => navigate("/mcq-test")}
            >
              Start MCQ Test
            </button>
          </div>

          <div className="assessment-card">
            <div className="icon">💻</div>

            <h2>Coding Challenge</h2>

            <p>
              Solve today's 2 coding problems and evaluate your programming skills.
            </p>

            <button
              className="start-btn"
              onClick={() => navigate("/coding")}
            >
              Start Coding Test
            </button>
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;