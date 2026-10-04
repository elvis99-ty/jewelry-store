import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminTable from "../components/AdminTable";
import { getAllOrders } from "../../api/orderApi";

function CustomerDetail() {
  const { email } = useParams();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    loadOrders();
  }, []);

  const customerOrders = useMemo(() => {
    return orders
      .filter((order) => order.customer?.email === decodeURIComponent(email))
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders, email]);

  const customer = customerOrders[0]?.customer;

  const totalSpent = customerOrders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <AdminLayout>
      <Link
        to="/admin/customers"
        style={{
          color: "#78716C",
          fontSize: "14px",
          textDecoration: "none",
          marginBottom: "20px",
          display: "inline-block",
        }}
      >
        ← Back to Customers
      </Link>

      {loading ? (
        <div style={{ color: "#78716C" }}>Loading...</div>
      ) : !customer ? (
        <div style={{ color: "#78716C" }}>No orders found for this customer.</div>
      ) : (
        <>
          {/* CUSTOMER HEADER */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
              marginBottom: "35px",
            }}
          >
            <div style={{ gridColumn: "span 4" }}>
              <h1
                style={{
                  margin: 0,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "42px",
                  color: "#1C1917",
                }}
              >
                {customer.firstName} {customer.lastName}
              </h1>
              <p style={{ marginTop: "8px", color: "#78716C", fontSize: "15px" }}>
                {customer.email} · {customer.phone}
              </p>
            </div>

            <InfoCard label="Total Orders" value={customerOrders.length.toString()} />
            <InfoCard label="Total Spent" value={`₦${totalSpent.toLocaleString()}`} />
            <InfoCard
              label="Last Order"
              value={new Date(customerOrders[0].createdAt).toLocaleDateString()}
            />
            <InfoCard label="Address" value={customer.address || "—"} />
          </div>

          {/* ORDER HISTORY */}
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "28px",
              color: "#1C1917",
              marginBottom: "16px",
            }}
          >
            Order History
          </h2>

          <AdminTable
            columns="1fr 1fr 1fr 1fr 1fr"
            headers={["Order No", "Date", "Amount", "Payment", "Status"]}
          >
            {customerOrders.map((order) => (
              <div
                key={order._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
                  padding: "18px 24px",
                  alignItems: "center",
                  borderBottom: "1px solid #F2EFEB",
                  color: "#1C1917",
                }}
              >
                <strong>{order.orderNumber}</strong>
                <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                <div style={{ fontWeight: "600" }}>
                  ₦{order.totalAmount?.toLocaleString()}
                </div>
                <div>
                  <StatusBadge status={order.paymentStatus} type="payment" />
                </div>
                <div>
                  <StatusBadge status={order.orderStatus} type="order" />
                </div>
              </div>
            ))}
          </AdminTable>
        </>
      )}
    </AdminLayout>
  );
}

function InfoCard({ label, value }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #ECE7DF",
        padding: "20px",
      }}
    >
      <p style={{ margin: 0, color: "#78716C", fontSize: "13px", fontWeight: "600" }}>
        {label}
      </p>
      <p
        style={{
          margin: "8px 0 0",
          fontSize: "18px",
          fontWeight: "700",
          color: "#1C1917",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status, type }) {
  const paymentColours = {
    paid: { bg: "#EAF8EE", colour: "#2E8B57" },
    failed: { bg: "#FEE2E2", colour: "#DC2626" },
    pending: { bg: "#FFF8E8", colour: "#B8860B" },
  };

  const orderColours = {
    Pending: { bg: "#FFF8E8", colour: "#B8860B" },
    Processing: { bg: "#DBEAFE", colour: "#2563EB" },
    Shipped: { bg: "#EDE9FE", colour: "#7C3AED" },
    Delivered: { bg: "#DCFCE7", colour: "#15803D" },
    Cancelled: { bg: "#FEE2E2", colour: "#DC2626" },
  };

  const style =
    type === "payment"
      ? paymentColours[status?.toLowerCase()] || paymentColours.pending
      : orderColours[status] || orderColours.Pending;

  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        background: style.bg,
        color: style.colour,
      }}
    >
      {status}
    </span>
  );
}

export default CustomerDetail;