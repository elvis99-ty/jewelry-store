import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminTable from "../components/AdminTable";
import { getAllOrders } from "../../api/orderApi";
import { verifyPayment } from "../../api/paymentApi";

function PaymentIssues() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rechecking, setRechecking] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrders();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin");
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const stuckOrders = useMemo(() => {
    return orders
      .filter(
        (order) =>
          order.paymentStatus !== "paid" && order.paymentReference
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders]);

  const handleRecheck = async (order) => {
    setRechecking(order._id);

    try {
      await verifyPayment(order.paymentReference);
      await loadOrders();
    } catch (err) {
      console.error(err);
      alert("Could not verify this payment right now. Try again shortly.");
    } finally {
      setRechecking(null);
    }
  };

  return (
    <AdminLayout>
      <h1
        style={{
          margin: 0,
          fontSize: "42px",
          fontFamily: "'Cormorant Garamond', serif",
          color: "#1C1917",
        }}
      >
        Payment Issues
      </h1>

      <p
        style={{
          color: "#78716C",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        Orders where a payment was started but never confirmed as paid.
      </p>

      <AdminTable
        columns="1fr 1.6fr 1fr 1fr 1.2fr .8fr"
        headers={["Order No", "Customer", "Amount", "Status", "Reference", "Action"]}
      >
        {loading ? (
          <div style={{ padding: "40px" }}>Loading...</div>
        ) : stuckOrders.length === 0 ? (
          <div style={{ padding: "40px", color: "black", textAlign: "center" }}>
            No unresolved payment issues — everything's confirmed.
          </div>
        ) : (
          stuckOrders.map((order) => (
            <div
              key={order._id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1.6fr 1fr 1fr 1.2fr .8fr",
                padding: "20px 24px",
                alignItems: "center",
                borderBottom: "1px solid #F2EFEB",
              }}
            >
              <div style={{ color: "#1C1917", fontWeight: "600" }}>
                {order.orderNumber}
              </div>

              <div style={{ color: "#444" }}>
                {order.customer?.firstName} {order.customer?.lastName}
                <div style={{ fontSize: "12px", color: "#999" }}>
                  {order.customer?.email}
                </div>
              </div>

              <div style={{ color: "#1C1917", fontWeight: "600" }}>
                ₦{order.totalAmount?.toLocaleString()}
              </div>

              <div>
                <span
                  style={{
                    padding: "6px 14px",
                    borderRadius: "20px",
                    background:
                      order.paymentStatus === "failed" ? "#FEE2E2" : "#FEF3C7",
                    color:
                      order.paymentStatus === "failed" ? "#DC2626" : "#B45309",
                    fontSize: "13px",
                    fontWeight: "600",
                  }}
                >
                  {order.paymentStatus}
                </span>
              </div>

              <div style={{ color: "#78716C", fontSize: "13px" }}>
                {order.paymentReference}
              </div>

              <button
                onClick={() => handleRecheck(order)}
                disabled={rechecking === order._id}
                style={{
                  background: rechecking === order._id ? "#B8AA7D" : "#C89B2C",
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  cursor: rechecking === order._id ? "not-allowed" : "pointer",
                  fontWeight: "600",
                  fontSize: "13px",
                }}
              >
                {rechecking === order._id ? "Checking..." : "Recheck"}
              </button>
            </div>
          ))
        )}
      </AdminTable>
    </AdminLayout>
  );
}

export default PaymentIssues;