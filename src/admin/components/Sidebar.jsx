import {
  LayoutDashboard,
  ShoppingBag,
  Gem,
  Users,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      icon: <LayoutDashboard size={20} />,
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      icon: <ShoppingBag size={20} />,
      name: "Orders",
      path: "/admin/orders",
    },
    {
      icon: <Gem size={20} />,
      name: "Products",
      path: "/admin/products",
    },
    {
      icon: <Users size={20} />,
      name: "Customers",
      path: "/admin/customers",
    },
    {
      icon: <AlertTriangle size={20} />,
      name: "Payment Issues",
      path: "/admin/payment-issues",
    },
    {
      icon: <BarChart3 size={20} />,
      name: "Reports",
      path: "/admin/reports",
    },
    {
      icon: <Settings size={20} />,
      name: "Settings",
      path: "/admin/settings",
    },
  ];

  return (
    <aside
      style={{
        width: "240px",
        background: "#161311",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "22px",
      }}
    >
      {/* Logo */}

      <div>
        <div
          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          <div
            style={{
              fontSize: "34px",
            }}
          >
            💎
          </div>

          <h2
            style={{
              marginTop: "10px",
              color: "#C89B2C",
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: "500",
              fontSize: "28px",
            }}
          >
            Royal Rings
          </h2>
        </div>

        {/* Menu */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {menu.map((item) => {
            const active = location.pathname === item.path;

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  width: "100%",
                  padding: "15px 18px",
                  borderRadius: "14px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  background: active ? "#C89B2C" : "transparent",
                  color: active ? "#FFFFFF" : "#E5E5E5",
                  transition: ".25s",
                  textAlign: "left",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "#25211E";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {item.icon}
                {item.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout */}

      <button
        onClick={() => {
          sessionStorage.removeItem("adminLoggedIn");
          navigate("/admin");
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "transparent",
          color: "#FFFFFF",
          border: "none",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;