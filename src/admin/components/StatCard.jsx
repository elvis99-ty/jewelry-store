function StatCard({ title, value, icon }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid #ECE7DF",
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        minHeight: "155px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#78716C",
            fontSize: "15px",
            fontWeight: "500",
          }}
        >
          {title}
        </p>

        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            background: "#F8F3E8",
            color: "#C89B2C",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </div>
      </div>

      {/* Value */}

      <h2
        style={{
          margin: 0,
          marginTop: "22px",
          color: "#1C1917",
          fontSize: "26px",
          fontWeight: "600",
          fontFamily: "'Arial', serif",
        }}
      >
        {value}
      </h2>
    </div>
  );
}

export default StatCard;