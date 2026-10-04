import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Bell, Menu, ChevronDown, ExternalLink, LogOut, Settings as SettingsIcon } from "lucide-react";

function Topbar({ onMenuClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getPageTitle = () => {
    const p = location.pathname;
    if (p.includes("/orders")) return "Orders Management";
    if (p.includes("/products")) return "Product Inventory";
    if (p.includes("/customers")) return "Customers Directory";
    if (p.includes("/reports")) return "Analytics & Reports";
    if (p.includes("/payment-issues")) return "Payment Issues";
    if (p.includes("/settings")) return "Store Settings";
    return "Dashboard";
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminLoggedIn");
    navigate("/admin", { replace: true });
  };

  return (
    <header
      style={{
        height: "76px",
        background: "#FFFFFF",
        borderBottom: "1px solid #ECE7DF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 40,
      }}
      className="px-4 sm:px-6 md:px-8"
    >
      {/* Left Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 rounded-lg text-[#1C1917] hover:bg-[#F5F2EB] focus:outline-none"
            aria-label="Toggle admin sidebar"
          >
            <Menu size={22} />
          </button>
        )}
        <h3
          style={{
            margin: 0,
            color: "#1C1917",
            fontWeight: "600",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
          className="text-[17px] sm:text-[20px] truncate max-w-[190px] sm:max-w-none"
        >
          {getPageTitle()}
        </h3>
      </div>

      {/* Right Side */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
        }}
      >
        {/* Live Store Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#78716C",
            fontSize: "13px",
            fontWeight: "500",
            textDecoration: "none",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid #EBE6DE",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#C89B2C";
            e.currentTarget.style.borderColor = "#C89B2C";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#78716C";
            e.currentTarget.style.borderColor = "#EBE6DE";
          }}
        >
          <span>Live Store</span>
          <ExternalLink size={13} />
        </a>

        {/* Admin Profile Dropdown */}
        <div style={{ position: "relative" }} ref={dropdownRef}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              padding: "4px 8px",
              borderRadius: "10px",
              backgroundColor: dropdownOpen ? "#FAF7F2" : "transparent",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "#1C1917",
                color: "#C89B2C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "14px",
                border: "1.5px solid #C89B2C",
              }}
            >
              RR
            </div>

            <span
              style={{
                fontWeight: "600",
                fontSize: "14px",
                color: "#1C1917",
              }}
            >
              Admin
            </span>

            <ChevronDown size={14} color="#78716C" />
          </div>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "48px",
                width: "200px",
                backgroundColor: "#FFFFFF",
                borderRadius: "14px",
                border: "1px solid #ECE7DF",
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                padding: "8px 0",
                zIndex: 200,
              }}
            >
              <div style={{ padding: "10px 16px", borderBottom: "1px solid #F5F2EB" }}>
                <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#A8A29E", fontWeight: "700" }}>
                  Authenticated
                </div>
                <div style={{ fontSize: "13px", fontWeight: "600", color: "#1C1917", marginTop: "2px" }}>
                  Royal Rings Staff
                </div>
              </div>

              <Link
                to="/admin/settings"
                onClick={() => setDropdownOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  color: "#1C1917",
                  fontSize: "13px",
                  textDecoration: "none",
                  fontWeight: "500",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FAF7F2")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <SettingsIcon size={14} color="#C89B2C" /> Store Settings
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  color: "#DC2626",
                  fontSize: "13px",
                  background: "none",
                  border: "none",
                  fontWeight: "500",
                  cursor: "pointer",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FEF2F2")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <LogOut size={14} color="#DC2626" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;
