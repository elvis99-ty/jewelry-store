import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      if (
        email === "admin@royalrings.com" &&
        password === "admin123"
      ) {
        sessionStorage.setItem("adminLoggedIn", "true");
        navigate("/admin/dashboard");
      } else {
        alert("Invalid admin credentials.");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F5F0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "470px",
          background: "#FFFFFF",
          border: "1px solid #ECE7DF",
          borderRadius: "28px",
          padding: "50px",
          boxShadow: "0 25px 60px rgba(0,0,0,.06)",
        }}
      >
        <h1
          style={{
            margin: 0,
            textAlign: "center",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "58px",
            fontWeight: "400",
            color: "#1C1917",
          }}
        >
          Admin Login
        </h1>

        <p
          style={{
            marginTop: "16px",
            marginBottom: "42px",
            textAlign: "center",
            color: "#78716C",
            lineHeight: "28px",
            fontSize: "16px",
          }}
        >
          Secure access for authorised Royal Rings administrators only.
        </p>

        <form onSubmit={handleLogin}>
          {/* Email */}

          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
                color: "#1C1917",
              }}
            >
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@royalrings.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px",
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

          {/* Password */}

          <div style={{ marginBottom: "34px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
                color: "#1C1917",
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "16px",
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

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "17px",
              background: loading ? "#B8AA7D" : "#C89B2C",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "14px",
              fontWeight: "600",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: ".3s",
              boxShadow: "0 15px 30px rgba(200,155,44,.25)",
            }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;