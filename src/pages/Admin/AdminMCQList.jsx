import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import AdminNavbar from "../Admin/AdminNavbar";
import "../AdminStyle/AdminMCQList.css";
import  { useCallback } from "react";

const AdminMCQList = () => {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [size, setSize] = useState(5);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [editData, setEditData] = useState(null);

  // 🔥 debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // 🔥 fetch
  const fetchMCQ = useCallback(async () => {
  try {
    setLoading(true);

    const res = await api.get(
      `/admin/mcq/all?page=${page}&size=${size}&search=${debouncedSearch}`
    );

    setQuestions(res.data.content);
    setTotalPages(res.data.totalPages);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}, [page, size, debouncedSearch]);

  useEffect(() => {
  fetchMCQ();
}, [fetchMCQ]);

  // ❌ delete
  const deleteQuestion = async (id) => {
    if (!window.confirm("Delete this MCQ?")) return;
    await api.delete(`/admin/mcq/delete/${id}`);
    fetchMCQ();
  };

  // ✏️ edit
  const handleEdit = (q) => setEditData({ ...q });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateMCQ = async () => {
    await api.put(`/admin/mcq/update/${editData.id}`, editData);
    setEditData(null);
    fetchMCQ();
  };

  return (
    <>
      <AdminNavbar />
    <div className="mcq-container">


      <h2 className="mcq-title">MCQ Management</h2>

      {/* Controls */}
      <div className="mcq-controls">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={size}
          onChange={(e) => {
            setSize(Number(e.target.value));
            setPage(0);
          }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="loader"></div>
      ) : (
        <>
          {/* Cards */}
          <div className="mcq-card-container">

            {questions.map((q, index) => (
              <div className="mcq-card" key={q.id}>

                <div className="mcq-card-header">
                  <span className="mcq-id">#{page * size + index + 1}</span>
                  <span className="mcq-correct">{q.correctAnswer}</span>
                </div>

                <div className="mcq-question">{q.question}</div>

                <div className="mcq-options">
                  <div className={q.correctAnswer === "A" ? "option correct-option" : "option"}>
                    A. {q.optionA}
                  </div>
                  <div className={q.correctAnswer === "B" ? "option correct-option" : "option"}>
                    B. {q.optionB}
                  </div>
                  <div className={q.correctAnswer === "C" ? "option correct-option" : "option"}>
                    C. {q.optionC}
                  </div>
                  <div className={q.correctAnswer === "D" ? "option correct-option" : "option"}>
                    D. {q.optionD}
                  </div>
                </div>

                <div className="mcq-actions">
                  <button className="edit-btn" onClick={() => handleEdit(q)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteQuestion(q.id)}>Delete</button>
                </div>

              </div>
            ))}

          </div>

          {/* Pagination */}
          <div className="pagination">
            <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>Prev</button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={page === i ? "active" : ""}
                onClick={() => setPage(i)}
              >
                {i + 1}
              </button>
            ))}

            <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</button>
          </div>
        </>
      )}

      {/* Modal */}
      {editData && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit MCQ</h3>

            <input name="question" value={editData.question} onChange={handleChange} />
            <input name="optionA" value={editData.optionA} onChange={handleChange} />
            <input name="optionB" value={editData.optionB} onChange={handleChange} />
            <input name="optionC" value={editData.optionC} onChange={handleChange} />
            <input name="optionD" value={editData.optionD} onChange={handleChange} />

            <select name="correctAnswer" value={editData.correctAnswer} onChange={handleChange}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>

            <div className="modal-actions">
              <button onClick={updateMCQ}>Save</button>
              <button onClick={() => setEditData(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
};

export default AdminMCQList;