import { useState, useEffect } from "react";
import api from "../../api/axiosConfig";
import "../AdminStyle/AddMCQ.css";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import AdminNavbar from "../Admin/AdminNavbar";

export default function AddMCQ() {

  const emptyForm = {
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctAnswer: "",
    difficulty: "Easy",
    topic: ""
  };

  const [form, setForm] = useState(emptyForm);
  const [questions, setQuestions] = useState([]);
  const [aiPreview, setAiPreview] = useState([]);

  // ✅ Separate loading states
  const [aiLoading, setAiLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validate = () => {
    return (
      form.question &&
      form.optionA &&
      form.optionB &&
      form.optionC &&
      form.optionD &&
      form.correctAnswer
    );
  };

  // ➕ Add Question
  const addQuestion = () => {
    if (!validate()) {
      toast.error("Fill all fields ❌");
      return;
    }

    setQuestions([...questions, form]);
    setForm(emptyForm);
    toast.success("Question Added ✅");
  };

  // ❌ Delete
  const deleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  // ✏️ Edit
  const editQuestion = (q, index) => {
    setForm(q);
    deleteQuestion(index);
  };

  // 🚀 Submit All (REMOVE difficulty & topic)
 const submitAll = async () => {
  if (questions.length === 0) {
    toast.error("No questions to submit");
    return;
  }

  try {
    setSubmitLoading(true);

    const cleanedQuestions = questions.map(q => ({
      question: q.question,
      optionA: q.optionA,
      optionB: q.optionB,
      optionC: q.optionC,
      optionD: q.optionD,
      correctAnswer: q.correctAnswer?.charAt(0).toUpperCase()
    }));

    // ✅ Sequential calls (important)
    for (let q of cleanedQuestions) {
      await api.post("/admin/mcq", q);
    }

    toast.success("All Questions Submitted 🚀");
    setQuestions([]);
    localStorage.removeItem("mcqDraft");

  } catch (err) {
    console.error(err);
    toast.error("Submission failed ❌");
  } finally {
    setSubmitLoading(false);
  }
};

  // 🤖 AI Generate
  const handleAIGenerate = async () => {
    if (!form.topic) {
      toast.error("Enter topic first ❌");
      return;
    }

    try {
      setAiLoading(true);

      const res = await api.post("/admin/ai/generate?topic=" + form.topic);

      // ✅ Ensure correctAnswer exists
      const formatted = res.data.map(q => ({
        ...q,
        correctAnswer: q.correctAnswer || q.answer
      }));

      setAiPreview(formatted);

      toast.success("AI Generated! Review before adding 👀");

    } catch (err) {
      console.error(err);
      toast.error("AI generation failed ❌");
    } finally {
      setAiLoading(false);
    }
  };

  // 📂 Excel Upload
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      const formatted = jsonData.map((row) => ({
        question: row.Question,
        optionA: row.OptionA,
        optionB: row.OptionB,
        optionC: row.OptionC,
        optionD: row.OptionD,
        correctAnswer: row.Answer
      }));

      setQuestions((prev) => [...prev, ...formatted]);
      toast.success("Excel Imported 🚀");
    };

    reader.readAsArrayBuffer(file);
  };

  // 💾 Draft Save
  useEffect(() => {
    localStorage.setItem("mcqDraft", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    const saved = localStorage.getItem("mcqDraft");
    if (saved) setQuestions(JSON.parse(saved));
  }, []);

  return (
    <>
    <AdminNavbar />
    <div className="ultra-mcq-container">

      {/* LEFT */}
      <div className="ultra-mcq-form">

        <h2>Add MCQ Builder</h2>

        <textarea
          placeholder="Enter question..."
          value={form.question}
          onChange={(e) => handleChange("question", e.target.value)}
        />

        {["A", "B", "C", "D"].map((opt) => (
          <div key={opt} className="ultra-option-row">

            <input
              placeholder={`Option ${opt}`}
              value={form[`option${opt}`]}
              onChange={(e) => handleChange(`option${opt}`, e.target.value)}
            />

            <label className="option-label">
              <input
                type="radio"
                checked={form.correctAnswer === opt}
                onChange={() => handleChange("correctAnswer", opt)}
              />
              Select
            </label>

          </div>
        ))}

        <input
          placeholder="Topic (Java, OOP...)"
          value={form.topic}
          onChange={(e) => handleChange("topic", e.target.value)}
        />

        <input type="file" onChange={handleExcelUpload} />

        {/* 🤖 AI Button */}
        <button
          className="ultra-ai-btn"
          onClick={handleAIGenerate}
          disabled={aiLoading}
        >
          {aiLoading ? "🤖 Generating..." : "🤖 Generate MCQ (AI)"}
        </button>

        {aiLoading && (
          <p className="ai-status">
            🧠 AI is generating intelligent questions...
          </p>
        )}

        <div className="ultra-btn-group">
          <button onClick={addQuestion}>➕ Add</button>

          <button onClick={submitAll} disabled={submitLoading}>
            {submitLoading ? "Submitting..." : "🚀 Submit All"}
          </button>
        </div>

      </div>

      {/* RIGHT */}
      <div className="ultra-mcq-preview">

        <h3>Live Preview</h3>

        {form.question ? (
          <div className="preview-card">
            <p>{form.question}</p>

            <ul>
              <li className={form.correctAnswer === "A" ? "correct" : ""}>
                A. {form.optionA}
              </li>
              <li className={form.correctAnswer === "B" ? "correct" : ""}>
                B. {form.optionB}
              </li>
              <li className={form.correctAnswer === "C" ? "correct" : ""}>
                C. {form.optionC}
              </li>
              <li className={form.correctAnswer === "D" ? "correct" : ""}>
                D. {form.optionD}
              </li>
            </ul>

            {/* ✅ SHOW ANSWER */}
            <p className="answer">✅ Answer: {form.correctAnswer}</p>
          </div>
        ) : (
          <p className="empty">Start typing...</p>
        )}

        {/* 🤖 AI Preview */}
        {aiPreview.length > 0 && (
          <div className="ai-preview-box">
            <h3>🤖 AI Suggestions</h3>

            {aiPreview.map((q, i) => (
              <div key={i} className="preview-card">

                <p>{q.question}</p>

                <ul>
                  <li>A. {q.optionA}</li>
                  <li>B. {q.optionB}</li>
                  <li>C. {q.optionC}</li>
                  <li>D. {q.optionD}</li>
                </ul>

                {/* ✅ SHOW ANSWER */}
                <p className="answer">✅ Answer: {q.correctAnswer}</p>

                <button onClick={() => {
                  setQuestions(prev => [...prev, q]);
                }}>
                  ➕ Add
                </button>

              </div>
            ))}

            <button
              className="approve-all"
              onClick={() => {
                setQuestions(prev => [...prev, ...aiPreview]);
                setAiPreview([]);
              }}
            >
              ✅ Add All
            </button>
          </div>
        )}

        {/* LIST */}
        <h4>Questions ({questions.length})</h4>

        {questions.length === 0 && (
          <p className="empty">🚀 No questions yet</p>
        )}

        {questions.map((q, i) => (
          <div key={i} className="question-item">

            <p>{i + 1}. {q.question}</p>

            {/* ✅ SHOW ANSWER IN LIST */}
            <p className="answer">Answer: {q.correctAnswer}</p>

            <div>
              <button onClick={() => editQuestion(q, i)}>Edit</button>
              <button onClick={() => deleteQuestion(i)}>Delete</button>
            </div>

          </div>
        ))}

      </div>

    </div>
    </>
  );
}