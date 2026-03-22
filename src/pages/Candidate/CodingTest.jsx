import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import Editor from "@monaco-editor/react";
import StudentNavbar from "../../components/StudentNavbar";
import "../Style/CodingTest.css";

function CodingTest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [result, setResult] = useState(null);
  const [customInput, setCustomInput] = useState("");
  const [usedInput, setUsedInput] = useState("");
  const [codeRun, setCodeRun] = useState(false);
  const [running, setRunning] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      const response = await api.get("/candidate/coding/today");

      const allQuestions = response.data;
      setQuestions(allQuestions);

      const q = allQuestions.find((q) => q.id == id);
      setQuestion(q);

      setCode(`${q.methodSignature} {

   // Write your logic here

}`);
    };

    fetchQuestion();
  }, [id]);

  // ================= RUN CODE =================
  const runCode = async () => {
    try {
      setRunning(true);

      const payload = {
        questionId: question.id,
        code: code.trim(),
        customInput: customInput.trim() || null,
      };

      const response = await api.post("/candidate/coding/run", payload);

      setOutput(response.data);
      setResult(null);
      setCodeRun(true);

      // 🔥 track input used
      setUsedInput(customInput || "Random Sample");
    } catch (error) {
      console.log(error);
      setOutput({
        output: "Error while running code",
        success: false,
        errorType: "NETWORK_ERROR",
      });
    } finally {
      setRunning(false);
    }
  };

  // ================= SUBMIT =================
  const submitCode = async () => {
    try {
      setIsSubmitting(true);

      const payload = {
        questionId: question.id,
        code: code.trim(),
      };

      const response = await api.post("/candidate/coding/submit", payload);

      setResult(response.data);
      setOutput(null);
      setSubmitted(true);
    } catch (error) {
      alert(error.response?.data?.message || "Already submitted");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getNextQuestionId = () => {
    const index = questions.findIndex((q) => q.id == id);
    if (index !== -1 && index < questions.length - 1) {
      return questions[index + 1].id;
    }
    return null;
  };

  return (
    <>
      <StudentNavbar />

      <div className="coding-container-main">
        {/* LEFT PANEL */}
        <div className="question-panel-main">
          {question && (
            <div className="question-card-main">
              <h3>{question.title}</h3>
              <p>{question.description}</p>
              <p className="marks">Marks: {question.marks}</p>

              <hr />

              <h5>Example Test Cases</h5>

              {question.testCases
                ?.filter((tc) => tc.sample)
                .map((tc, index) => (
                  <div key={index} className="example-box-main">
                    <p>
                      <b>Example {index + 1}</b>
                    </p>
                    <p>
                      <b>Input:</b> {tc.inputData}
                    </p>
                    <p>
                      <b>Output:</b> {tc.expectedOutput}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="editor-panel-main">
          <Editor
            height="450px"
            language="java"
            theme="vs-dark"
            value={code}
            onChange={(value) => {
              setCode(value || "");
              setCodeRun(false);
              setOutput(null);
              setResult(null);
            }}
            options={{
              fontSize: 18,
              fontFamily: "Fira Code, monospace",
              lineHeight: 24,
              letterSpacing: 0.5,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
              cursorBlinking: "smooth",
              cursorSmoothCaretAnimation: "on",
              smoothScrolling: true,
              padding: { top: 10 },
              renderLineHighlight: "all",
              wordWrap: "on",
            }}
          />

          {/* 🔥 CUSTOM INPUT */}
          <div className="custom-input-box">
            <label>Custom Input (optional)</label>
            <input
              type="text"
              placeholder="Write input..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
            />
          </div>

          {/* BUTTONS */}
          <div className="editor-buttons-main">
            <button
              className="run-btn"
              onClick={runCode}
              disabled={!question || running}
            >
              {running ? "Running..." : "Run Code"}
            </button>

            <button
              className="submit-btn"
              onClick={submitCode}
              disabled={!codeRun || submitted || isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : submitted
                  ? "Submitted"
                  : "Submit Code"}
            </button>

            {getNextQuestionId() ? (
              <button
                className="next-btn-main"
                onClick={() => navigate(`/coding-test/${getNextQuestionId()}`)}
              >
                Next →
              </button>
            ) : (
              <button
                className="leaderboard-btn-main"
                onClick={() => navigate("/leaderboard")}
              >
                Leaderboard
              </button>
            )}
          </div>

          {/* OUTPUT */}
          {output && (
            <div className="output-box-main">
              <h5>Output</h5>

              <p className="input-used">
                Input Used: <b>{usedInput}</b>
              </p>

              {output.success ? (
                <pre>{output.output}</pre>
              ) : (
                <div className="error-box">
                  <pre>{output.output}</pre>
                  <p>Error: {output.errorType}</p>
                </div>
              )}
            </div>
          )}

          {/* RESULT */}
          {result && (
            <div className="result-box-main">
              <h4>Score: {result.score}</h4>
              <p>
                Passed: {result.passedTestCases} / {result.totalTestCases}
              </p>

              {result.testCaseResults.map((tc) => (
                <div
                  key={tc.testCaseNumber}
                  className={`testcase-card ${tc.passed ? "pass" : "fail"}`}
                >
                  <p>Test Case {tc.testCaseNumber}</p>
                  <p>Expected: {tc.expectedOutput}</p>
                  <p>Output: {tc.actualOutput}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CodingTest;
