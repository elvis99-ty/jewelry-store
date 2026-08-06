import { Bell, Menu, ChevronDown } from "lucide-react";

function Topbar() {
  return (
    <header
      style={{
        height: "78px",
        background: "#FFFFFF",
        borderBottom: "1px solid #ECE7DF",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
      }}
    >
      {/* Left Side */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <Menu
          size={22}
          color="#555"
          style={{ cursor: "pointer" }}
        />

        <h3
          style={{
            margin: 0,
            fontSize: "22px",
            color: "#1C1917",
            fontWeight: "600",
          }}
        >
          Dashboard
        </h3>
      </div>

      {/* Right Side */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "26px",
        }}
      >
        <div
          style={{
            position: "relative",
            cursor: "pointer",
          }}
        >
          <Bell size={22} color="#444" />

          <span
            style={{
              position: "absolute",
              right: "-2px",
              top: "-4px",
              width: "8px",
              height: "8px",
              background: "#C89B2C",
              borderRadius: "50%",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#1C1917",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "700",
            }}
          >
            A
          </div>

          <span
            style={{
              fontWeight: "600",
              color: "#1C1917",
            }}
          >
            Admin
          </span>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Topbar;