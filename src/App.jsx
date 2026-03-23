import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Candidate/Dashboard";
import MCQTest from "./pages/Candidate/MCQTest";
import CodingTest from "./pages/Candidate/CodingTest";
import CodingQuestionList from "./pages/Candidate/CodingQuestionList";
import Leaderboard from "./pages/Candidate/LeaderBoard";

import AdminHome from "./pages/Admin/AdminHome";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AddMCQ from "./pages/Admin/AddMCQ";
import AddCoding from "./pages/Admin/AddCoding";
import AdminMCQList from "./pages/Admin/AdminMCQList";
import AdminCodingList from "./pages/Admin/AdminCodingList";
import AboutPage from "./components/AboutPage";

import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <BrowserRouter>

      {/* 🔥 Toast Container (GLOBAL) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roleRequired="CANDIDATE">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/home" element={<AdminHome />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roleRequired="ADMIN">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/admin/add-mcq" element={<AddMCQ />} />
        <Route path="/admin/add-coding" element={<AddCoding />} />
        <Route path="/admin/mcq-list" element={<AdminMCQList />} />
        <Route path="/admin/coding-list" element={<AdminCodingList />} />

        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/coding" element={<CodingQuestionList />} />
        <Route path="/coding-test/:id" element={<CodingTest />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/mcq-test"
          element={
            <ProtectedRoute>
              <MCQTest />
            </ProtectedRoute>
          }
        />

        <Route path="/coding-test" element={<CodingQuestionList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;