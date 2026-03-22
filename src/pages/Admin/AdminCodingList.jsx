import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import AdminNavbar from "../Admin/AdminNavbar";
import "../AdminStyle/AdminCodingList.css";

const AdminCodingList = () => {

  const [questions, setQuestions] = useState([]);

  // ✅ SAME WORKING LOGIC (no change)
  const fetchCodingQuestions = async () => {
    try {
      const res = await api.get("/admin/coding/all");
      setQuestions(res.data); // ✅ KEEP SAME
    } catch (error) {
      console.error("Error fetching coding questions", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCodingQuestions(); // ✅ KEEP SAME
  }, []);

  const deleteQuestion = async (id) => {
    try {
      await api.delete(`/admin/coding/delete/${id}`);
      fetchCodingQuestions(); // refresh
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  return (
    <>
      {/* ✅ Navbar added */}
      <AdminNavbar />

      <div className="coding-container">

        <div className="coding-header">
          <h2>💻 Coding Questions</h2>
          <span>{questions.length} Questions</span>
        </div>

        {/* ✅ EMPTY STATE */}
        {questions.length === 0 && (
          <p className="empty">No Questions Found</p>
        )}

        {/* ✅ CARD UI */}
        <div className="coding-grid">
          {questions.map((q) => (
            <div className="coding-card" key={q.id}>

              <div className="card-top">
                <h3>{q.title}</h3>
                <span className="marks">{q.marks} Marks</span>
              </div>

              <p className="description">
                {q.description.length > 120
                  ? q.description.substring(0, 120) + "..."
                  : q.description}
              </p>

              <div className="card-footer">
                <span className="id">ID: {q.id}</span>

                <button
                  className="delete-btn"
                  onClick={() => deleteQuestion(q.id)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default AdminCodingList;