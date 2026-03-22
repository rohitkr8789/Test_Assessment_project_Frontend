import { useState } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import "./Style/ForgotPassword.css";

function ForgotPassword() {

  const [email,setEmail] = useState("");
  const [dob,setDob] = useState("");
  const [verified,setVerified] = useState(false);

  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [message,setMessage] = useState("");
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const verifyUser = async () => {

    if(!email || !dob){
      setError("Please enter email and date of birth");
      return;
    }

    try{

      const response = await api.post("/auth/verify-user",null,{
        params:{
          email:email,
          dob:dob
        }
      });

      if(response.data === true){
        setVerified(true);
        setMessage("User verified. Please reset password.");
        setError("");
      }else{
        setError("Invalid email or date of birth");
      }

    }catch(err){
      console.log(err);
      setError("Verification failed");
    }

  };

  const resetPassword = async () => {

    if(newPassword !== confirmPassword){
      setError("Passwords do not match");
      return;
    }

    try{

      const response = await api.post("/auth/reset-password",null,{
        params:{
          email:email,
          newPassword:newPassword
        }
      });

      setMessage(response.data);
      setError("");

      setTimeout(()=>{
        navigate("/");
      },2000);

    }catch(err){
      console.log(err);
      setError("Password reset failed");
    }

  };

  return (

    <div className="forgot-wrapper">

      <div className="forgot-left">

        <div className="left-content">
          <h1>Reset Your Password</h1>
          <p>
            Forgot your password? Verify your account and create a new
            password to continue using the platform securely.
          </p>
        </div>

      </div>


      <div className="forgot-right">

        <div className="forgot-card">

          <h2>Forgot Password</h2>

          {message && <div className="success-box">{message}</div>}
          {error && <div className="error-box">{error}</div>}

          {!verified && (

            <>

              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e)=>{
                  setEmail(e.target.value);
                  setError("");
                  setMessage("");
                }}
              />

              <input
                type="date"
                value={dob}
                onChange={(e)=>{
                  setDob(e.target.value);
                  setError("");
                  setMessage("");
                }}
              />

              <button onClick={verifyUser}>
                Verify User
              </button>

            </>

          )}

          {verified && (

            <>

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e)=>{
                  setNewPassword(e.target.value);
                  setError("");
                }}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e)=>{
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
              />

              <button onClick={resetPassword}>
                Reset Password
              </button>

            </>

          )}

          <p className="back-login">
            Back to Login
            <span onClick={()=>navigate("/")}> Login </span>
          </p>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;