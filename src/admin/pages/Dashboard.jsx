import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";
import OrderDetailModal from "../components/OrderDetailModal";
import { getAllOrders, updateOrderStatus } from "../../api/orderApi";
import { getAllProductsAdmin } from "../../api/adminProductApi";

import {
  ShoppingBag,
  Wallet,
  Users,
  Gem,
  ArrowRight,
  PlusCircle,
  Settings as SettingsIcon,
  BarChart3,
  ExternalLink,
  Eye,
  AlertTriangle,
} from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    revenue: 0,
    customers: 0,
    products: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [stuckPaymentsCount, setStuckPaymentsCount] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      const [ordersData, productsData] = await Promise.all([
        getAllOrders(),
        getAllProductsAdmin(),
      ]);

      const orders = ordersData.success ? ordersData.orders : [];
      const products = productsData.success ? productsData.products : [];

      const revenue = orders
        .filter((order) => order.paymentStatus === "paid")
        .reduce((sum, order) => sum + (order.totalAmount || 0), 0);

      const uniqueCustomers = new Set(
        orders.map((order) => order.customer?.email).filter(Boolean)
      );

      const stuck = orders.filter(
        (o) => o.paymentStatus !== "paid" && o.paymentReference
      );

      setStats({
        totalOrders: orders.length,
        revenue,
        customers: uniqueCustomers.size,
        products: products.length,
      });

      // Sort descending by creation date and take top 5
      const sorted = [...orders].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRecentOrders(sorted.slice(0, 5));
      setStuckPaymentsCount(stuck.length);
    } catch (err) {
      if (err.response?.status === 401) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin", { replace: true });
      } else {
        console.error("Dashboard data load error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setRecentOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
      );
      if (selectedOrder && selectedOrder._id === orderId) {
        setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusBadge = (status = "Pending") => {
    let color = "#B8860B";
    let bg = "#FFF8E8";
    if (status.toLowerCase().includes("deliver")) {
      color = "#15803D";
      bg = "#DCFCE7";
    } else if (status.toLowerCase().includes("process")) {
      color = "#2563EB";
      bg = "#DBEAFE";
    } else if (status.toLowerCase().includes("ship")) {
      color = "#7C3AED";
      bg = "#EDE9FE";
    } else if (status.toLowerCase().includes("cancel")) {
      color = "#DC2626";
      bg = "#FEE2E2";
    }
    return (
      <span
        style={{
          display: "inline-block",
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600",
          color,
          backgroundColor: bg,
        }}
      >
        {status}
      </span>
    );
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: "1280px" }}>
        
        {/* Welcome Banner */}
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <span style={{ fontSize: "11px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#C89B2C", fontWeight: "700" }}>
              CONTROL CENTER
            </span>
            <h1
              style={{
                margin: "4px 0 0 0",
                fontSize: "36px",
                fontFamily: "'Cormorant Garamond', serif",
                color: "#1C1917",
                fontWeight: "400",
              }}
            >
              Store Overview
            </h1>
            <p style={{ margin: "4px 0 0 0", color: "#78716C", fontSize: "15px" }}>
              Welcome back. Real-time metrics and order activities for Royal Rings.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Link
              to="/admin/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#C89B2C",
                color: "#FFF",
                padding: "10px 18px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "600",
                textDecoration: "none",
                boxShadow: "0 4px 12px rgba(200,155,44,0.2)",
              }}
            >
              <PlusCircle size={15} /> Add Product
            </Link>
            <Link
              to="/admin/settings"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2D9CC",
                color: "#1C1917",
                padding: "10px 16px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              <SettingsIcon size={15} color="#C89B2C" /> Settings
            </Link>
          </div>
        </div>

        {/* Payment Warning Banner (if any payment issues exist) */}
        {stuckPaymentsCount > 0 && (
          <div
            style={{
              marginBottom: "24px",
              padding: "14px 20px",
              borderRadius: "14px",
              backgroundColor: "#FFFBEB",
              border: "1px solid #FDE68A",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#92400E", fontSize: "14px" }}>
              <AlertTriangle size={18} color="#D97706" />
              <span>
                <strong>{stuckPaymentsCount} order(s)</strong> have pending payment references awaiting verification.
              </span>
            </div>
            <Link
              to="/admin/payment-issues"
              style={{
                color: "#B45309",
                fontWeight: "600",
                fontSize: "13px",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              Review Payment Issues <ArrowRight size={13} />
            </Link>
          </div>
        )}

        {/* 4 Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
            marginBottom: "36px",
          }}
        >
          <StatCard
            title="Total Orders"
            value={loading ? "—" : stats.totalOrders.toString()}
            icon={<ShoppingBag size={22} />}
          />

          <StatCard
            title="Total Revenue"
            value={loading ? "—" : `₦${stats.revenue.toLocaleString()}`}
            icon={<Wallet size={22} />}
          />

          <StatCard
            title="Unique Customers"
            value={loading ? "—" : stats.customers.toString()}
            icon={<Users size={22} />}
          />

          <StatCard
            title="Active Products"
            value={loading ? "—" : stats.products.toString()}
            icon={<Gem size={22} />}
          />
        </div>

        {/* Quick Navigation Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            marginBottom: "36px",
          }}
        >
          <Link
            to="/admin/orders"
            style={{
              textDecoration: "none",
              backgroundColor: "#FFFFFF",
              border: "1px solid #ECE7DF",
              borderRadius: "16px",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: "#1C1917" }}>Orders Hub</div>
              <div style={{ fontSize: "13px", color: "#78716C", marginTop: "2px" }}>Update status & track shipments</div>
            </div>
            <ArrowRight size={18} color="#C89B2C" />
          </Link>

          <Link
            to="/admin/products"
            style={{
              textDecoration: "none",
              backgroundColor: "#FFFFFF",
              border: "1px solid #ECE7DF",
              borderRadius: "16px",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: "#1C1917" }}>Inventory & Catalog</div>
              <div style={{ fontSize: "13px", color: "#78716C", marginTop: "2px" }}>Add, edit & restock jewelry</div>
            </div>
            <ArrowRight size={18} color="#C89B2C" />
          </Link>

          <Link
            to="/admin/reports"
            style={{
              textDecoration: "none",
              backgroundColor: "#FFFFFF",
              border: "1px solid #ECE7DF",
              borderRadius: "16px",
              padding: "20px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
            }}
          >
            <div>
              <div style={{ fontSize: "15px", fontWeight: "600", color: "#1C1917" }}>Analytics & Sales</div>
              <div style={{ fontSize: "13px", color: "#78716C", marginTop: "2px" }}>Review revenue & bestseller trends</div>
            </div>
            <BarChart3 size={18} color="#C89B2C" />
          </Link>
        </div>

        {/* Recent Orders Preview Widget */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #ECE7DF",
            borderRadius: "20px",
            padding: "28px 32px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.03)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "22px",
              borderBottom: "1px solid #F5F2EB",
              paddingBottom: "16px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1C1917",
                }}
              >
                Recent Purchases
              </h2>
              <p style={{ margin: "4px 0 0", color: "#78716C", fontSize: "13px" }}>
                Latest transactions placed on Royal Rings
              </p>
            </div>

            <Link
              to="/admin/orders"
              style={{
                fontSize: "13px",
                color: "#C89B2C",
                fontWeight: "600",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              View All Orders ({stats.totalOrders}) <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#78716C" }}>
              Loading recent orders...
            </div>
          ) : recentOrders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px", color: "#78716C" }}>
              <p style={{ margin: 0, fontSize: "16px" }}>No orders placed yet.</p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #ECE7DF", color: "#A8A29E", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                    <th style={{ padding: "12px 14px", fontWeight: "700" }}>Order ID</th>
                    <th style={{ padding: "12px 14px", fontWeight: "700" }}>Customer</th>
                    <th style={{ padding: "12px 14px", fontWeight: "700" }}>Items</th>
                    <th style={{ padding: "12px 14px", fontWeight: "700" }}>Total</th>
                    <th style={{ padding: "12px 14px", fontWeight: "700" }}>Payment</th>
                    <th style={{ padding: "12px 14px", fontWeight: "700" }}>Status</th>
                    <th style={{ padding: "12px 14px", fontWeight: "700" }}>Date</th>
                    <th style={{ padding: "12px 14px", fontWeight: "700", textAlign: "right" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => {
                    const itemCount = order.items?.reduce((s, i) => s + (i.quantity || 1), 0) || 1;
                    const dateFormatted = new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                    });

                    return (
                      <tr
                        key={order._id}
                        style={{
                          borderBottom: "1px solid #F5F2EB",
                          fontSize: "14px",
                          color: "#1C1917",
                        }}
                      >
                        <td style={{ padding: "16px 14px", fontWeight: "600", color: "#C89B2C" }}>
                          #{order.orderNumber || order.id || "RR"}
                        </td>
                        <td style={{ padding: "16px 14px" }}>
                          <div style={{ fontWeight: "600" }}>
                            {order.customer?.firstName
                              ? `${order.customer.firstName} ${order.customer.lastName || ""}`
                              : "Valued Customer"}
                          </div>
                          <div style={{ fontSize: "12px", color: "#78716C" }}>
                            {order.customer?.email || "—"}
                          </div>
                        </td>
                        <td style={{ padding: "16px 14px", color: "#78716C" }}>
                          {itemCount} item{itemCount !== 1 ? "s" : ""}
                        </td>
                        <td style={{ padding: "16px 14px", fontWeight: "600" }}>
                          ₦{Number(order.totalAmount || 0).toLocaleString()}
                        </td>
                        <td style={{ padding: "16px 14px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 8px",
                              borderRadius: "12px",
                              fontSize: "11px",
                              fontWeight: "600",
                              backgroundColor: order.paymentStatus === "paid" ? "#DCFCE7" : "#FFF8E8",
                              color: order.paymentStatus === "paid" ? "#15803D" : "#B8860B",
                            }}
                          >
                            {order.paymentStatus === "paid" ? "Paid" : "Pending"}
                          </span>
                        </td>
                        <td style={{ padding: "16px 14px" }}>
                          {getStatusBadge(order.orderStatus || "Processing")}
                        </td>
                        <td style={{ padding: "16px 14px", color: "#78716C", fontSize: "13px" }}>
                          {dateFormatted}
                        </td>
                        <td style={{ padding: "16px 14px", textAlign: "right" }}>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            style={{
                              backgroundColor: "#FAF7F2",
                              border: "1px solid #E5DFD5",
                              borderRadius: "8px",
                              padding: "6px 12px",
                              fontSize: "12px",
                              fontWeight: "600",
                              color: "#1C1917",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <Eye size={13} color="#C89B2C" /> View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Details Modal when clicked */}
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onStatusChange={handleStatusChange}
            updating={updatingOrderId === selectedOrder._id}
          />
        )}

      </div>
    </AdminLayout>
  );
}

export default Dashboard;
