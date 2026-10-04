function AdminTable({ columns, headers, children, minWidth = "820px" }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        border: "1px solid #ECE7DF",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,.04)",
        width: "100%",
      }}
    >
      <div style={{ width: "100%", overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <div style={{ minWidth: minWidth }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: columns,
              padding: "18px 24px",
              background: "#FBF9F6",
              borderBottom: "1px solid #ECE7DF",
              fontWeight: "600",
              color: "#78716C",
              fontSize: "14px",
              alignItems: "center",
            }}
          >
            {headers.map((header) => (
              <div key={header}>{header}</div>
            ))}
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminTable;