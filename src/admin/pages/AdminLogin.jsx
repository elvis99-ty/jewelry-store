import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Gem } from "lucide-react";
import { adminLogin } from "../../api/adminApi";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("adminToken")) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await adminLogin(email, password);

      sessionStorage.setItem("adminToken", response.token);
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid admin credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* LEFT BRAND PANEL */}
      <div
        style={{
          flex: "1 1 45%",
          background:
            "linear-gradient(160deg, #1C1917 0%, #2a2521 55%, #1C1917 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
        className="admin-login-panel"
      >
        <div
          style={{
            position: "absolute",
            top: "-80px",
            right: "-80px",
            width: "260px",
            height: "260px",
            borderRadius: "50%",
            border: "1px solid rgba(200,155,44,0.25)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "-60px",
            width: "220px",
            height: "220px",
            borderRadius: "50%",
            border: "1px solid rgba(200,155,44,0.15)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", zIndex: 1 }}
        >
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              backgroundColor: "rgba(200,155,44,0.12)",
              border: "1px solid rgba(200,155,44,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <Gem size={30} color="#C89B2C" />
          </div>

          <h1
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "44px",
              fontWeight: "400",
              color: "#ffffff",
              margin: 0,
              letterSpacing: "1px",
            }}
          >
            Royal Rings
          </h1>

          <p
            style={{
              marginTop: "14px",
              color: "#B8AA7D",
              fontSize: "15px",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Admin Portal
          </p>

          <p
            style={{
              marginTop: "40px",
              color: "#8f8a83",
              fontSize: "15px",
              lineHeight: "1.8",
              maxWidth: "320px",
            }}
          >
            Manage products, orders, and customers from one secure
            dashboard.
          </p>
        </motion.div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div
        style={{
          flex: "1 1 55%",
          background: "#F8F5F0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            width: "100%",
            maxWidth: "420px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "38px",
              fontWeight: "400",
              color: "#1C1917",
            }}
          >
            Welcome Back
          </h2>

          <p
            style={{
              marginTop: "10px",
              marginBottom: "36px",
              color: "#78716C",
              fontSize: "15px",
            }}
          >
            Sign in to continue to your dashboard.
          </p>

          {error && (
            <div
              style={{
                backgroundColor: "#fdecea",
                border: "1px solid #f5c6c2",
                color: "#c0392b",
                borderRadius: "12px",
                padding: "14px 16px",
                fontSize: "14px",
                marginBottom: "22px",
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#1C1917",
                }}
              >
                Email Address
              </label>

              <div style={{ position: "relative" }}>
                <Mail
                  size={18}
                  color="#A8A29E"
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type="email"
                  placeholder="admin@royalrings.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "15px 16px 15px 46px",
                    borderRadius: "14px",
                    border: "1px solid #D9D2C7",
                    fontSize: "15px",
                    color: "#1C1917",
                    background: "#FFFFFF",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: ".3s",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid #C89B2C";
                    e.target.style.boxShadow =
                      "0 0 0 4px rgba(200,155,44,.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid #D9D2C7";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: "10px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#1C1917",
                }}
              >
                Password
              </label>

              <div style={{ position: "relative" }}>
                <Lock
                  size={18}
                  color="#A8A29E"
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "15px 46px 15px 46px",
                    borderRadius: "14px",
                    border: "1px solid #D9D2C7",
                    fontSize: "15px",
                    color: "#1C1917",
                    background: "#FFFFFF",
                    outline: "none",
                    boxSizing: "border-box",
                    transition: ".3s",
                  }}
                  onFocus={(e) => {
                    e.target.style.border = "1px solid #C89B2C";
                    e.target.style.boxShadow =
                      "0 0 0 4px rgba(200,155,44,.15)";
                  }}
                  onBlur={(e) => {
                    e.target.style.border = "1px solid #D9D2C7";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                  }}
                >
                  {showPassword ? (
                    <EyeOff size={18} color="#A8A29E" />
                  ) : (
                    <Eye size={18} color="#A8A29E" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "17px",
                marginTop: "26px",
                background: loading ? "#B8AA7D" : "#C89B2C",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "14px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: ".3s",
                boxShadow: "0 15px 30px rgba(200,155,44,.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {loading && (
                <span
                  style={{
                    width: "16px",
                    height: "16px",
                    border: "2px solid rgba(255,255,255,0.5)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    display: "inline-block",
                    animation: "adminSpin 0.8s linear infinite",
                  }}
                />
              )}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p
            style={{
              marginTop: "28px",
              textAlign: "center",
              color: "#A8A29E",
              fontSize: "13px",
            }}
          >
            Secure access for authorised Royal Rings administrators only.
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes adminSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (max-width: 860px) {
          .admin-login-panel {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AdminLogin;