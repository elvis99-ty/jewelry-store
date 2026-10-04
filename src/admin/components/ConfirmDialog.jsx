function ConfirmDialog({
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  danger = false,
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1100,
        padding: "20px",
      }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "32px",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: danger ? "#FEE2E2" : "#FEF3C7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "26px",
          }}
        >
          {danger ? "🗑️" : "⚠️"}
        </div>

        <h3
          style={{
            margin: 0,
            marginBottom: "10px",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "26px",
            color: "#1C1917",
          }}
        >
          {title}
        </h3>

        <p
          style={{
            margin: 0,
            marginBottom: "26px",
            color: "#78716C",
            fontSize: "14px",
            lineHeight: "1.6",
          }}
        >
          {message}
        </p>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            onClick={onCancel}
            disabled={loading}
            style={{
              flex: 1,
              height: "48px",
              borderRadius: "12px",
              border: "1px solid #D9D2C7",
              backgroundColor: "#fff",
              color: "#1C1917",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            style={{
              flex: 1,
              height: "48px",
              borderRadius: "12px",
              border: "none",
              backgroundColor: loading
                ? "#f0a8a8"
                : danger
                ? "#DC2626"
                : "#C89B2C",
              color: "#fff",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDialog;