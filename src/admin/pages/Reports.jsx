import AdminLayout from "../layouts/AdminLayout";

function Reports() {
  return (
    <AdminLayout>
      <h1
        style={{
          margin: 0,
          fontSize: "42px",
          fontFamily: "'Cormorant Garamond', serif",
        }}
      >
        Reports
      </h1>

      <p
        style={{
          color: "#78716C",
          marginTop: "10px",
        }}
      >
        View and manage all customer orders.
      </p>
    </AdminLayout>
  );
}

export default Reports;