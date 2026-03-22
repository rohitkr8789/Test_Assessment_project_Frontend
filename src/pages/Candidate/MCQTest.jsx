import { useEffect, useState, useCallback } from "react";
import api from "../../api/axiosConfig";
import StudentNavbar from "../../components/StudentNavbar";
import "../Style/MCQ.css";

function MCQTest() {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch Questions
  useEffect(() => {

    const fetchQuestions = async () => {
      try {
        const response = await api.get("/candidate/mcq/today");
        setQuestions(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuestions();

  }, []);

  // Handle option select
  const handleOptionChange = (questionId, option) => {

    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));

  };

  // Submit Test
  const submitTest = useCallback(async () => {

    try {

      const response = await api.post("/candidate/mcq/submit", {
        answers: answers
      });

      alert("MCQ Completed! Score: " + response.data.score);
      window.location.href = "/coding";

    } catch (error) {

      if (error.response && error.response.status === 400) {
        alert("You have already attempted today's test.");
        window.location.href = "/coding";
      } else {
        alert("Submission Failed");
      }

    }

  }, [answers]);

  // Timer Logic
  useEffect(() => {

    if (timeLeft === 0) {
      submitTest();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);

  }, [timeLeft, submitTest]);

  const currentQuestion = questions[currentIndex];

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentIndex(index);
  };

  return (

    <>
    
    <StudentNavbar />

    <div className="mcq-container">

      <div className="mcq-header">

        <h2>Today's MCQ Test</h2>

        <div className="timer-box">
          ⏳ {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2,"0")}
        </div>

      </div>

      {/* Question Navigator */}

      <div className="question-navigator">

        {questions.map((q, index) => (

          <button
            key={q.id}
            className={`nav-btn ${
              answers[q.id] ? "answered" : ""
            }`}
            onClick={() => jumpToQuestion(index)}
          >
            {index + 1}
          </button>

        ))}

      </div>

      {/* Question Card */}

      {currentQuestion && (

        <div className="question-card">

          <h4 className="question-title">
            {currentIndex + 1}. {currentQuestion.question}
          </h4>

          <div className="options">

            <label className="option">
              <input
                type="radio"
                checked={answers[currentQuestion.id] === "A"}
                onChange={() => handleOptionChange(currentQuestion.id, "A")}
              />
              {currentQuestion.optionA}
            </label>

            <label className="option">
              <input
                type="radio"
                checked={answers[currentQuestion.id] === "B"}
                onChange={() => handleOptionChange(currentQuestion.id, "B")}
              />
              {currentQuestion.optionB}
            </label>

            <label className="option">
              <input
                type="radio"
                checked={answers[currentQuestion.id] === "C"}
                onChange={() => handleOptionChange(currentQuestion.id, "C")}
              />
              {currentQuestion.optionC}
            </label>

            <label className="option">
              <input
                type="radio"
                checked={answers[currentQuestion.id] === "D"}
                onChange={() => handleOptionChange(currentQuestion.id, "D")}
              />
              {currentQuestion.optionD}
            </label>

          </div>

        </div>

      )}

      {/* Navigation Buttons */}

      <div className="navigation-buttons">

        <button
          className="prev-btn"
          onClick={prevQuestion}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        {currentIndex === questions.length - 1 ? (

          <button
            className="submit-btn"
            onClick={submitTest}
          >
            Submit Test
          </button>

        ) : (

          <button
            className="next-btn"
            onClick={nextQuestion}
          >
            Next
          </button>

        )}

      </div>

    </div>

    </>

  );

}

export default MCQTest;