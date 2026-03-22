import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../../components/StudentNavbar";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);

 useEffect(() => {

  console.log("Profile component loaded");

  const fetchProfile = async () => {
    try {

      console.log("Calling profile API...");

      const res = await api.get("/users/profile");

      console.log("API Response:", res.data);

      setUser(res.data);

    } catch (err) {
      console.log("Profile API error:", err);
    }
  };

  fetchProfile();

}, []);

  return (
    <>
      <Navbar />

      <div className="container profile-container">
        <h3>Your Profile</h3>

        <div className="card profile-card">
          <img
            src={user?.imageUrl || "/profile.png"}
            alt="profile"
            className="profile-avatar"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/profile.png";
            }}
          />

          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>DOB:</strong>{" "}
            {user?.dateOfBirth
              ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "N/A"}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;
