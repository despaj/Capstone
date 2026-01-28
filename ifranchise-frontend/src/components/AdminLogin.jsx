import React, { useEffect, useState } from "react";
import logo from "../assets/iFranchise_logo.png";
import welcome from "../assets/welcomepage.png";
import AdminDashboard from "./AdminDashboard";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [loggedIn, setLoggedIn] = useState(false);

  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState("email"); // 'email' or 'otp'
  const [forgotEmail, setForgotEmail] = useState("");
  const [otp, setOtp] = useState("");
  
  const [showSplash, setShowSplash] = useState(true);

  /* ERRORS */
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);


  // login function 
  
  const login = async () => {
  let newErrors = {};
  setAuthError("");

  if (!email && !password) {
    newErrors.general = "Please fill out the fields";
  } else {
    if (!email) newErrors.email = "Email is required";
    else if (!email.endsWith("@ifranchise.com"))
      newErrors.email = "Email must be @ifranchise.com";

    if (!password) newErrors.password = "Password is required";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  // Call backend API
  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // ✅ LOGIN SUCCESS
      setLoggedIn(true);
      // Optional: Store user data
      localStorage.setItem("user", JSON.stringify(data.user));
    } else {
      setAuthError(data.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    setAuthError("Connection error. Please try again.");
  }
};

  // Triggered when clicking "RESET" on email step
  const handleSendEmail = () => {
    if (!forgotEmail || !forgotEmail.endsWith("@gmail.com")) {
      setErrors({ ...errors, forgotEmail: "Valid @gmail.com email required" });
      return;
    }
    // Simulate sending email and move to OTP step
    setForgotStep("otp");
    setErrors({});
  };

  // Triggered when clicking "VERIFY" on OTP step
  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      setErrors({ ...errors, otp: "Please enter a valid code" });
      return;
    }
    alert("OTP Verified! Proceeding to password reset...");
    setShowForgot(false);
    setForgotStep("email");
    setForgotEmail("");
    setOtp("");
  };
if (loggedIn) {
  return <AdminDashboard />;
}

  if (showSplash) {
    return (
      <div className="splash">
        <img src={logo} alt="logo" className="splash-logo" />
        <style>{styles(welcome)}</style>
      </div>
    );
  }

  return (
    <>
      <div className="page">
        <div className="card">
          <button className="back" onClick={() => window.history.back()}>
            ← Back
          </button>

          <img src={logo} alt="logo" className="logo" />

          <h2>LOGIN</h2>
          <p className="subtitle">Enter your credentials below</p>

          {errors.general && <p className="error general">{errors.general}</p>}
          {authError && <p className="error general">{authError}</p>}

          <div className="input-container">
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "", general: "" });
                setAuthError("");
              }}
            />
            {errors.email && <span className="error-popup">{errors.email}</span>}
          </div>

          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({ ...errors, password: "", general: "" });
                setAuthError("");
              }}
            />
            {errors.password && <span className="error-popup">{errors.password}</span>}
          </div>

          <button className="forgot-link" onClick={() => setShowForgot(true)}>
            Forgot Password?
          </button>

          <button className="btn" onClick={login}>
            LOGIN
          </button>
        </div>
      </div>

      {/* MODAL SYSTEM */}
      {showForgot && (
        <div className="modal-overlay">
          <div className="modal pop-in">
            {forgotStep === "email" ? (
              <div className="step-content">
                <h3>Reset Password</h3>
                <p>Enter your email to receive a verification code</p>
                <div className="input-container">
                    <input
                    placeholder="Email Address"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    />
                    {errors.forgotEmail && <span className="error-popup">{errors.forgotEmail}</span>}
                </div>
                <button className="btn yellow" onClick={handleSendEmail}>
                  SEND CODE
                </button>
              </div>
            ) : (
              <div className="step-content">
                <h3>Verify OTP</h3>
                <p>We sent a 6-digit code to <b>{forgotEmail}</b></p>
                <div className="input-container">
                    <input
                    placeholder="Enter OTP Code"
                    value={otp}
                    maxLength={6}
                    style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '20px' }}
                    onChange={(e) => setOtp(e.target.value)}
                    />
                    {errors.otp && <span className="error-popup">{errors.otp}</span>}
                </div>
                <button className="btn yellow" onClick={handleVerifyOtp}>
                  VERIFY & RESET
                </button>
                <button className="link-small" onClick={() => setForgotStep("email")}>
                  Change Email
                </button>
              </div>
            )}

            <button className="close-btn" onClick={() => { setShowForgot(false); setForgotStep("email"); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      <style>{styles(welcome)}</style>
    </>
  );
}

const styles = (bgImage) => `
* { box-sizing: border-box; font-family: 'Montserrat', sans-serif; }

.splash {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f9d1, #E8F5E9);
  display: flex;
  justify-content: center;
  align-items: center;
}

.splash-logo { width: 150px; animation: zoom 3s ease forwards; }

@keyframes zoom {
  from { transform: scale(.3); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-image: linear-gradient(rgba(255,255,255,0.85), rgba(211, 255, 201, 0.85)), url(${bgImage});
  background-size: cover;
}

.card {
  background: rgba(255,255,255,0.96);
  width: 100%;
  max-width: 380px;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,.1);
  text-align: center;
  position: relative;
}

.back {
  position: absolute;
  left: 20px;
  top: 20px;
  background: none;
  border: none;
  color: #2E7D32;
  font-weight: bold;
  cursor: pointer;
}

.logo { width: 90px; margin-top: 20px; }

h2 { color: #2E7D32; font-weight: 900; margin-bottom: 8px; }

.subtitle { color: #777; margin-bottom: 30px; }

.input-container { position: relative; margin-bottom: 25px; width: 100%; }

input {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #2E7D32;
  font-size: 14px;
  outline: none;
}

.error-popup {
  position: absolute;
  top: 48px;
  left: 5px;
  font-size: 11px;
  color: #d32f2f;
  animation: popup 0.3s ease-out;
}

@keyframes popup {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.btn {
  width: 100%;
  padding: 15px;
  border-radius: 12px;
  border: none;
  background: #2E7D32;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

.btn.yellow { background: #cabd2c; margin-top: 10px; }

.forgot-link {
  background: none;
  border: none;
  color: #cabd2c;
  font-weight: bold;
  cursor: pointer;
  display: block;
  margin: 0 auto 20px;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: #fff;
  width: 90%;
  max-width: 400px;
  padding: 30px;
  border-radius: 25px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.pop-in { animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55); }

@keyframes popIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.step-content h3 { color: #2E7D32; margin-bottom: 10px; }
.step-content p { color: #666; font-size: 14px; margin-bottom: 20px; }

.close-btn {
  background: none;
  border: none;
  color: #999;
  margin-top: 15px;
  cursor: pointer;
  font-size: 13px;
}

.link-small {
    background: none;
    border: none;
    color: #2E7D32;
    text-decoration: underline;
    font-size: 12px;
    margin-top: 10px;
    cursor: pointer;
}
`;