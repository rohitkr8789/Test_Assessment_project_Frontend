import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "../Style/CodingQuestionList.css";
import StudentNavbar from "../../components/StudentNavbar";

function CodingQuestionList() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

 const loadQuestions = () => {
  api.get("/candidate/coding/today-status")
    .then((res) => {
      console.log("API DATA:", res.data);
      setQuestions(res.data);
    })
    .catch((err) => {
      console.error("Error loading questions", err);
    });
};

useEffect(() => {
  loadQuestions();
}, []);

  const openQuestion = (id) => {
    navigate("/coding-test/" + id);
  };

  return (
    <>
      <StudentNavbar />

      <div className="coding-list-page">
        <div className="coding-header">
          <h1>💻 Coding Round</h1>
          <p>Select a problem and start coding</p>
        </div>

        <div className="coding-container">
          {questions.map((q, index) => (
            <div key={q.id} className="coding-card">
              <div className="question-left">
                <div className="question-number">{index + 1}</div>

                <div className="question-info">
                  <h4>{q.description}</h4>

                  <div className="question-meta">
                    <span className="difficulty easy">Easy</span>

                    <span
                      className={
                        q.submitted ? "status solved" : "status not-solved"
                      }
                    >
                      {q.submitted ? "Solved" : "Not Solved"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="solve-btn"
                onClick={() => openQuestion(q.id)}
                disabled={q.submitted}
              >
                {q.submitted ? "Solved ✓" : "Solve →"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CodingQuestionList;
