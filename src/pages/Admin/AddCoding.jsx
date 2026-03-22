import { useState } from "react";
import api from "../../api/axiosConfig";
import AdminNavbar from "../Admin/AdminNavbar";
import "../AdminStyle/AddCoding.css";

export default function AddCoding() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [methodSignature, setMethodSignature] = useState("");
  const [marks, setMarks] = useState("");

  const [errors, setErrors] = useState({});

  const [testCases, setTestCases] = useState([
    { inputData: "", expectedOutput: "", sample: true }
  ]);

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { inputData: "", expectedOutput: "", sample: false }
    ]);
  };

  const removeTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const updateTestCase = (index, field, value) => {
    const updated = [...testCases];
    updated[index][field] = value;
    setTestCases(updated);
  };

  // ✅ VALIDATION
  const validate = () => {
    let newErrors = {};

    if (!title.trim()) newErrors.title = "Title required";
    if (!description.trim()) newErrors.description = "Description required";
    if (!methodSignature.trim()) newErrors.methodSignature = "Method required";
    if (!marks) newErrors.marks = "Marks required";

    testCases.forEach((tc, i) => {
      if (!tc.inputData.trim())
        newErrors[`input-${i}`] = "Required";
      if (!tc.expectedOutput.trim())
        newErrors[`output-${i}`] = "Required";
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {

    if (!validate()) return;

    const data = {
      title,
      description,
      methodSignature,
      marks: parseInt(marks),
      testCases
    };

    try {
      await api.post("/admin/coding/create", data);

      alert("✅ Added Successfully");

      setTitle("");
      setDescription("");
      setMethodSignature("");
      setMarks("");
      setErrors({});
      setTestCases([{ inputData: "", expectedOutput: "", sample: true }]);

    } catch (err) {
      alert("❌ Error",err);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="coding-container">

        <h2 className="page-title">Add Coding Question</h2>

        {/* FORM */}
        <div className="form-section">

          <input
            className={errors.title && "error"}
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}

          <textarea
            className={errors.description && "error"}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <p className="error-text">{errors.description}</p>}

          <div className="row">
            <div style={{ width: "100%" }}>
              <input
                className={errors.methodSignature && "error"}
                placeholder="Method Signature"
                value={methodSignature}
                onChange={(e) => setMethodSignature(e.target.value)}
              />
              {errors.methodSignature && <p className="error-text">{errors.methodSignature}</p>}
            </div>

            <div style={{ width: "100%" }}>
              <input
                type="number"
                className={errors.marks && "error"}
                placeholder="Marks"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
              />
              {errors.marks && <p className="error-text">{errors.marks}</p>}
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="table-section">

          <div className="table-header">
            <h3>Test Cases</h3>
            <button onClick={addTestCase}>+ Add</button>
          </div>

          <div className="table">

            <div className="table-row head">
              <div>#</div>
              <div>Input</div>
              <div>Output</div>
              <div>Visible</div>
              <div>Action</div>
            </div>

            {testCases.map((tc, index) => (
              <div className="table-row" key={index}>

                <div>{index + 1}</div>

                <div>
                  <input
                    className={errors[`input-${index}`] && "error"}
                    value={tc.inputData}
                    placeholder="Input"
                    onChange={(e) =>
                      updateTestCase(index, "inputData", e.target.value)
                    }
                  />
                  {errors[`input-${index}`] && (
                    <p className="error-text">{errors[`input-${index}`]}</p>
                  )}
                </div>

                <div>
                  <input
                    className={errors[`output-${index}`] && "error"}
                    value={tc.expectedOutput}
                    placeholder="Output"
                    onChange={(e) =>
                      updateTestCase(index, "expectedOutput", e.target.value)
                    }
                  />
                  {errors[`output-${index}`] && (
                    <p className="error-text">{errors[`output-${index}`]}</p>
                  )}
                </div>

                {/* 🔥 TOGGLE SWITCH */}
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={tc.sample}
                    onChange={(e) =>
                      updateTestCase(index, "sample", e.target.checked)
                    }
                  />
                  <span className="slider"></span>
                </label>

                <button
                  className="delete-btn"
                  onClick={() => removeTestCase(index)}
                >
                  ✖
                </button>

              </div>
            ))}

          </div>
        </div>

        <div className="submit-bar">
          <button onClick={handleSubmit}>
            Submit Coding Question
          </button>
        </div>

      </div>
    </>
  );
}