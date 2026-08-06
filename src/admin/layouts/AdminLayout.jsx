import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8F5F0",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Topbar />

        <main
          style={{
            padding: "35px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;