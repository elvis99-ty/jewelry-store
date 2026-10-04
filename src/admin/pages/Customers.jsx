import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminTable from "../components/AdminTable";
import { getAllOrders } from "../../api/orderApi";

function Customers() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

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

  const customers = useMemo(() => {
    const grouped = {};

    orders.forEach((order) => {
      const email = order.customer?.email;
      if (!email) return;

      if (!grouped[email]) {
        grouped[email] = {
          email,
          firstName: order.customer.firstName,
          lastName: order.customer.lastName,
          phone: order.customer.phone,
          orderCount: 0,
          totalSpent: 0,
          lastOrderDate: order.createdAt,
        };
      }

      grouped[email].orderCount += 1;

      if (order.paymentStatus === "paid") {
        grouped[email].totalSpent += order.totalAmount || 0;
      }

      if (new Date(order.createdAt) > new Date(grouped[email].lastOrderDate)) {
        grouped[email].lastOrderDate = order.createdAt;
      }
    });

    return Object.values(grouped).sort(
      (a, b) => new Date(b.lastOrderDate) - new Date(a.lastOrderDate)
    );
  }, [orders]);

  const filteredCustomers = customers.filter((customer) => {
    const text = search.toLowerCase();
    return (
      customer.email?.toLowerCase().includes(text) ||
      customer.firstName?.toLowerCase().includes(text) ||
      customer.lastName?.toLowerCase().includes(text) ||
      customer.phone?.toLowerCase().includes(text)
    );
  });

  return (
    <AdminLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "35px",
          gap: "20px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1C1917",
            }}
          >
            Customers
          </h1>

          <p
            style={{
              color: "#78716C",
              marginTop: "10px",
              fontSize: "16px",
            }}
          >
            {loading ? "Loading..." : `${customers.length} customers, based on order history.`}
          </p>
        </div>

        <input
          type="text"
          placeholder="Search name, email or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "320px",
            height: "48px",
            borderRadius: "12px",
            border: "1px solid #D9D2C7",
            padding: "0 18px",
            background: "#FFFFFF",
            color: "#1C1917",
            outline: "none",
            fontSize: "15px",
          }}
        />
      </div>

      <AdminTable
        columns="1.3fr 1.6fr 1.2fr .8fr 1fr 1.2fr"
        headers={["Customer", "Email", "Phone", "Orders", "Total Spent", "Last Order"]}
      >
        {loading ? (
          <div style={{ padding: "40px" }}>Loading customers...</div>
        ) : filteredCustomers.length === 0 ? (
          <div style={{ padding: "40px", color: "black", textAlign: "center" }}>
            No Customers Found
          </div>
        ) : (
          filteredCustomers.map((customer) => (
            <div
              key={customer.email}
              onClick={() => navigate(`/admin/customers/${encodeURIComponent(customer.email)}`)}
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 1.6fr 1.2fr .8fr 1fr 1.2fr",
                padding: "20px 24px",
                alignItems: "center",
                borderBottom: "1px solid #F2EFEB",
                cursor : "pointer",
              }}
            >
              <div style={{ color: "#1C1917", fontWeight: "600" }}>
                {customer.firstName} {customer.lastName}
              </div>

              <div style={{ color: "#444" }}>{customer.email}</div>

              <div style={{ color: "#444" }}>{customer.phone}</div>

              <div style={{ color: "#1C1917", fontWeight: "600" }}>
                {customer.orderCount}
              </div>

              <div style={{ color: "#1C1917", fontWeight: "600" }}>
                ₦{customer.totalSpent.toLocaleString()}
              </div>

              <div style={{ color: "#78716C", fontSize: "14px" }}>
                {new Date(customer.lastOrderDate).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </AdminTable>
    </AdminLayout>
  );
}

export default Customers;