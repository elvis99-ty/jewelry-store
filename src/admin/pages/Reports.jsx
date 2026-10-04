import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { getAllOrders } from "../../api/orderApi";

function Reports() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const paidOrders = useMemo(
    () => orders.filter((o) => o.paymentStatus === "paid"),
    [orders]
  );

  const totalRevenue = useMemo(
    () => paidOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0),
    [paidOrders]
  );

  const averageOrderValue = paidOrders.length
    ? Math.round(totalRevenue / paidOrders.length)
    : 0;

  const topProducts = useMemo(() => {
    const counts = {};

    paidOrders.forEach((order) => {
      order.items?.forEach((item) => {
        if (!counts[item.name]) {
          counts[item.name] = 0;
        }
        counts[item.name] += item.quantity;
      });
    });

    return Object.entries(counts)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [paidOrders]);

  const maxProductQty = Math.max(...topProducts.map((p) => p.quantity), 1);

  const last7Days = useMemo(() => {
    const days = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      days.push(date);
    }

    return days.map((day) => {
      const nextDay = new Date(day);
      nextDay.setDate(nextDay.getDate() + 1);

      const count = orders.filter((o) => {
        const created = new Date(o.createdAt);
        return created >= day && created < nextDay;
      }).length;

      return {
        label: day.toLocaleDateString(undefined, { weekday: "short" }),
        count,
      };
    });
  }, [orders]);

  const maxDayCount = Math.max(...last7Days.map((d) => d.count), 1);

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
        Reports
      </h1>

      <p
        style={{
          color: "#78716C",
          marginTop: "10px",
          marginBottom: "35px",
        }}
      >
        A quick look at how your store is performing.
      </p>

      {loading ? (
        <div style={{ color: "#78716C" }}>Loading report data...</div>
      ) : (
        <>
          {/* SUMMARY CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              marginBottom: "40px",
            }}
          >
            <ReportCard label="Total Revenue" value={`₦${totalRevenue.toLocaleString()}`} />
            <ReportCard label="Paid Orders" value={paidOrders.length.toString()} />
            <ReportCard label="Average Order Value" value={`₦${averageOrderValue.toLocaleString()}`} />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "30px",
            }}
          >
            {/* TOP PRODUCTS */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #ECE7DF",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: "22px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "24px",
                  color: "#1C1917",
                }}
              >
                Top Selling Products
              </h3>

              {topProducts.length === 0 ? (
                <p style={{ color: "#78716C", fontSize: "14px" }}>
                  No paid orders yet.
                </p>
              ) : (
                topProducts.map((product) => (
                  <div key={product.name} style={{ marginBottom: "18px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "#1C1917", fontWeight: "600" }}>
                        {product.name}
                      </span>
                      <span style={{ color: "#78716C" }}>
                        {product.quantity} sold
                      </span>
                    </div>
                    <div
                      style={{
                        height: "10px",
                        borderRadius: "6px",
                        background: "#F2EFEB",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${(product.quantity / maxProductQty) * 100}%`,
                          background: "#C89B2C",
                          borderRadius: "6px",
                        }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* ORDERS - LAST 7 DAYS */}
            <div
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid #ECE7DF",
                padding: "28px",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: "22px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "24px",
                  color: "#1C1917",
                }}
              >
                Orders — Last 7 Days
              </h3>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "14px",
                  height: "160px",
                }}
              >
                {last7Days.map((day, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      height: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#1C1917",
                        fontWeight: "600",
                        marginBottom: "6px",
                      }}
                    >
                      {day.count}
                    </span>
                    <div
                      style={{
                        width: "100%",
                        height: `${(day.count / maxDayCount) * 100}%`,
                        minHeight: day.count > 0 ? "4px" : "0",
                        background: "#C89B2C",
                        borderRadius: "6px 6px 0 0",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#78716C",
                        marginTop: "8px",
                      }}
                    >
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

function ReportCard({ label, value }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "18px",
        border: "1px solid #ECE7DF",
        padding: "26px",
      }}
    >
      <p style={{ margin: 0, color: "#78716C", fontSize: "14px", fontWeight: "600" }}>
        {label}
      </p>
      <p
        style={{
          margin: "10px 0 0",
          fontSize: "28px",
          fontWeight: "700",
          color: "#1C1917",
        }}
      >
        {value}
      </p>
    </div>
  );
}

export default Reports;