import { useState, useRef, useEffect } from "react";
import api from "../api/axiosConfig";
import "../pages/Style/Register.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // ✅ Cleanup preview (prevent memory leak)
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  // ✅ Handle Image
  const handleImage = (file) => {
    if (!file.type.startsWith("image/")) {
      setImageError("Only image files allowed");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setImageError("Image must be less than 10MB");
      return;
    }

    setImageError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ✅ Open File Picker
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  // ✅ File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImage(file);
    }
  };

  // ✅ Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleImage(file);
    }
  };

  // ✅ Remove Image
  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setPreview(null);
  };

  // ✅ Register
  const handleRegister = async (e) => {
    e.preventDefault();

    sessionStorage.removeItem("token");
    localStorage.removeItem("token");

    if (!image) {
      setImageError("Profile image is required");
      toast.error("Profile image is required ❌");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image);
    formData.append("dateOfBirth", dateOfBirth);

    try {
      const res = await api.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // ✅ SUCCESS TOAST
      toast.success(res.data || "Registration Successful 🚀");

      // Reset form
      setName("");
      setEmail("");
      setPassword("");
      setDateOfBirth("");
      setImage(null);
      setPreview(null);
      setImageError("");

      // ✅ Delay navigation (so user can see toast)
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      // ❌ ERROR TOAST
      toast.error("Registration failed ❌");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-wrapper">
      {/* LEFT SIDE */}
      <div className="register-left">
        <div className="overlay-content">
          <h1>Java Assessment Platform</h1>
          <p>Evaluate developers with MCQ tests and real coding challenges.</p>

          <ul>
            <li>✔ Online Coding Tests</li>
            <li>✔ Automatic Code Evaluation</li>
            <li>✔ Admin Dashboard</li>
            <li>✔ Candidate Leaderboard</li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="register-right">
        <div className="register-card">
          <h2>Create Account</h2>

          <form onSubmit={handleRegister}>
            {/* 🔥 Avatar Upload */}
            <div
              className={`avatar-upload ${dragActive ? "active" : ""} ${imageError ? "error" : ""}`}
              onClick={openFilePicker}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <img src={preview ? preview : "/profile.png"} alt="profile" />

              <div className="avatar-overlay">📷 Upload</div>

              {/* ❌ Remove Button */}
              {preview && (
                <div className="avatar-remove-btn" onClick={handleRemoveImage}>
                  ✖
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="avatar-input"
                onChange={handleFileChange}
              />
            </div>

            {/* ❗ Error */}
            {imageError && <p className="avatar-error-text">{imageError}</p>}

            {/* INPUTS */}
            <input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />

            <button disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </button>

            <div className="register-link">
              Already have an account?
              <span onClick={() => navigate("/login")}> Login</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
