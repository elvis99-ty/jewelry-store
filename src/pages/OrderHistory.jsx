import React, { useState, useEffect, useMemo } from "react";
import { User, Package, Diamond, ChevronRight, CheckCircle2, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMyOrders } from "../services/orderService";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("All Orders");
  const [showReportModal, setShowReportModal] = useState(false);
  const ordersPerPage = 10;

  const userEmail = sessionStorage.getItem("userEmail") || "nwoguelvis92@gmail.com";

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("orderToken");
      const response = await getMyOrders(token);

const fetchedOrders = response.orders || response || [];
setOrders(fetchedOrders);
    } catch (err) {
      console.error("Failed to load orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = useMemo(
    () => orders.reduce((sum, o) => sum + Number(o.totalAmount || o.total_amount || 0), 0),
    [orders]
  );
  const filteredOrders = useMemo(() => {
  if (statusFilter === "All Orders") return orders;

  return orders.filter(
    (order) => order.orderStatus === statusFilter
  );
}, [orders, statusFilter]);

const totalPages = Math.max(
  1,
  Math.ceil(filteredOrders.length / ordersPerPage)
);

const currentOrders = useMemo(() => {
  const start = (currentPage - 1) * ordersPerPage;

  return filteredOrders.slice(
    start,
    start + ordersPerPage
  );
}, [filteredOrders, currentPage]);

  const formatDate = (date) => {
    if (!date) return "21 July 2026";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status = "Paid") => {
    let bg = "#EAF7ED";
    let color = "#2D8A4E";
    let label = status;

    if (status.toLowerCase().includes("deliver")) {
      bg = "#EAF7ED";
      color = "#2D8A4E";
      label = "Delivered";
    } else if (status.toLowerCase().includes("process")) {
      bg = "#FAF3E6";
      color = "#C89B2C";
      label = "Processing";
    } else {
      bg = "#EAF7ED";
      color = "#2D8A4E";
      label = "Paid";
    }

    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 14px",
          borderRadius: "20px",
          backgroundColor: bg,
          color: color,
          fontSize: "13px",
          fontWeight: "600",
        }}
      >
        <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: color }} />
        {label}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#FAF8F5", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Navbar />
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
          <div style={{ width: "36px", height: "36px", border: "3px solid #E5DFD5", borderTopColor: "#C89B2C", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#FAF8F5", color: "#1C1917", display: "flex", flexDirection: "column", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1160px", width: "100%", margin: "0 auto", padding: "40px 24px 80px 24px", boxSizing: "border-box" }}>
        
        {/* ================= VIEW 1: MAIN DASHBOARD ================= */}
        {!selectedOrder ? (
          <>
          {/* ================= Header ================= */}

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 420px",
    alignItems: "center",
    gap: "60px",
    marginBottom: "70px",
  }}
>

  {/* Left Side */}

  <div>

    <span
      style={{
        color: "#C89B2C",
        fontSize: "12px",
        fontWeight: "700",
        letterSpacing: "0.35em",
        textTransform: "uppercase",
      }}
    >
      Royal Rings
    </span>

    <h1
      style={{
        marginTop: "18px",
        marginBottom: "18px",
        fontFamily: "'Arial', serif",
        fontSize: "72px",
        lineHeight: "72px",
        fontWeight: "400",
        color: "#1C1917",
      }}
    >
      Purchase
      <br />
      History
    </h1>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "28px",
      }}
    >

      <div
        style={{
          width: "95px",
          height: "2px",
          background: "#C89B2C",
        }}
      />

      <div
        style={{
          width: "8px",
          height: "8px",
          border: "1px solid #C89B2C",
          transform: "rotate(45deg)",
        }}
      />

    </div>

    <p
      style={{
        maxWidth: "520px",
        fontSize: "18px",
        lineHeight: "34px",
        color: "#78716C",
        margin: 0,
      }}
    >
      Review every Royal Rings purchase made with your verified email address.
      Track orders, view invoices and manage your purchase history.
    </p>

  </div>

  {/* Right Side */}

  <div
    style={{
      background: "#FFFFFF",
      border: "1px solid #ECE7DF",
      borderRadius: "24px",
      padding: "30px",
      boxShadow: "0 15px 45px rgba(0,0,0,.04)",
    }}
  >

    <div
      style={{
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >

      <div
        style={{
          width: "72px",
          height: "72px",
          borderRadius: "50%",
          background: "#F7F3EC",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <User size={30} color="#C89B2C" />
      </div>

      <div>

        <div
          style={{
            fontSize: "11px",
            color: "#A8A29E",
            letterSpacing: ".25em",
            textTransform: "uppercase",
            fontWeight: "700",
          }}
        >
          Verified Customer
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "17px",
            fontWeight: "600",
            color: "#1C1917",
            wordBreak: "break-word",
          }}
        >
          {userEmail}
        </div>

        <div
          style={{
            marginTop: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#C89B2C",
            fontWeight: "600",
            fontSize: "14px",
          }}
        >
          <CheckCircle2 size={16} />
          Verified Purchase History
        </div>

      </div>

    </div>

  </div>

</div>
            {/* Top 2 Metric Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px", marginBottom: "40px" }}>
              
              {/* Total Orders Card */}
              <div
                style={{
                  backgroundColor: "#FAF6F0",
                  border: "1px solid #EFEAE3",
                  borderRadius: "20px",
                  padding: "28px 32px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                  display: "flex",
                  alignItems: "center",
                  gap: "24px"
                }}
              >
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#ECE4D8", display: "flex", alignItems: "center", justifyContent: "center", color: "#C89B2C", flexShrink: 0 }}>
                  <Package size={28} />
                </div>

                <div style={{ zIndex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#1C1917" }}>Total Orders</div>
                  <div style={{ fontFamily: "'Arial', serif", fontSize: "42px", fontWeight: "400", color: "#1C1917", lineHeight: "1.1", margin: "4px 0 8px 0" }}>
                    {orders.length || 29}
                  </div>
                  <a href="#recent" style={{ fontSize: "13px", color: "#C89B2C", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  </a>
                </div>

                {/* Watermark SVG */}
                <svg style={{ position: "absolute", right: "-10px", bottom: "-10px", opacity: 0.1, pointerEvents: "none" }} width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#C89B2C" strokeWidth="1">
                  <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
                  <line x1="11" y1="3" x2="8" y2="9" /><line x1="13" y1="3" x2="16" y2="9" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="12" y1="22" x2="8" y2="9" /><line x1="12" y1="22" x2="16" y2="9" />
                </svg>
              </div>

              {/* Total Investment Card */}
              <div
                style={{
                  backgroundColor: "#FAF6F0",
                  border: "1px solid #EFEAE3",
                  borderRadius: "20px",
                  padding: "28px 32px",
                  position: "relative",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                  display: "flex",
                  alignItems: "center",
                  gap: "24px"
                }}
              >
                <div style={{ width: "64px", height: "64px", borderRadius: "50%", backgroundColor: "#ECE4D8", display: "flex", alignItems: "center", justifyContent: "center", color: "#C89B2C", flexShrink: 0 }}>
                  <Diamond size={28} />
                </div>

                <div style={{ zIndex: 1 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#1C1917" }}>Total Investment</div>
                  <div style={{ fontFamily: "'Arial', serif", fontSize: "38px", fontWeight: "400", color: "#1C1917", lineHeight: "1.1", margin: "4px 0 8px 0" }}>
                    ₦{(totalSpent || 10065000).toLocaleString()}
                  </div>
                  <a href="#recent" style={{ fontSize: "13px", color: "#C89B2C", fontWeight: "600", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  </a>
                </div>

                <svg style={{ position: "absolute", right: "-10px", bottom: "-10px", opacity: 0.1, pointerEvents: "none" }} width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="#C89B2C" strokeWidth="1">
                  <polygon points="6 3 18 3 22 9 12 22 2 9 6 3" />
                  <line x1="11" y1="3" x2="8" y2="9" /><line x1="13" y1="3" x2="16" y2="9" /><line x1="2" y1="9" x2="22" y2="9" /><line x1="12" y1="22" x2="8" y2="9" /><line x1="12" y1="22" x2="16" y2="9" />
                </svg>
              </div>

            </div>

           {/* ================= Recent Purchases ================= */}

<section id="recent" style={{ marginBottom: "50px" }}>

  {/* Section Header */}

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: "32px",
    }}
  >
    <div>

      <span
        style={{
          color: "#C89B2C",
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: ".3em",
          textTransform: "uppercase",
        }}
      >
        Orders
      </span>

      <h2
        style={{
          margin: "10px 0 6px",
          fontFamily: "'Arial', serif",
          fontSize: "42px",
          fontWeight: "400",
          color: "#1C1917",
        }}
      >
        Recent Purchases
      </h2>

      <div
  style={{
    marginTop: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  }}
>
  <p
    style={{
      margin: 0,
      color: "#78716C",
      fontSize: "15px",
    }}
  >
    Showing {currentOrders.length} of {filteredOrders.length} orders
  </p>

  <div
  style={{
    position: "relative",
    width: "250px",
  }}
>
  <p
    style={{
      margin: "0 0 8px 2px",
      fontSize: "11px",
      fontWeight: "600",
      letterSpacing: ".2em",
      textTransform: "uppercase",
      color: "#A89F91",
    }}
  >
    Filter Orders
  </p>

  <select
    value={statusFilter}
    onChange={(e) => {
      setStatusFilter(e.target.value);
      setCurrentPage(1);
    }}
    style={{
      width: "100%",
      height: "52px",
      padding: "0 18px",
      border: "1px solid #DCC9A1",
      borderRadius: "16px",
      background: "#FFFFFF",
      color: "#1C1917",
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      outline: "none",
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "none",
      boxShadow: "0 8px 24px rgba(0,0,0,.04)",
      transition: "all .25s ease",
    }}
  >
    <option value="All Orders">All Orders</option>
    <option value="Pending">Pending</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
    <option value="Cancelled">Cancelled</option>
  </select>

  <ChevronRight
    size={18}
    style={{
      position: "absolute",
      right: "18px",
      bottom: "17px",
      transform: "rotate(90deg)",
      color: "#C89B2C",
      pointerEvents: "none",
    }}
  />
</div>

    </div>

  </div>
  </div>

  {/* Cards */}

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "22px",
    }}
  >

    {(currentOrders.length
      ? currentOrders
      : [
          {
            id: "RR031",
            name: "Diamond Eternity Ring",
            amount: 295000,
            date: "2026-07-21",
            status: "Paid",
          },
          {
            id: "RR030",
            name: "Luxury Gold Bracelet",
            amount: 450000,
            date: "2026-07-18",
            status: "Delivered",
          },
        ]).map((order, index) => (

      <div
        key={order._id || order.id || index}
        style={{
          background: "#FFFFFF",
          border: "1px solid #ECE7DF",
          borderRadius: "24px",
          padding: "28px 32px",
          display: "grid",
          gridTemplateColumns: "90px 1fr auto auto",
          alignItems: "center",
          gap: "28px",
          boxShadow: "0 8px 24px rgba(0,0,0,.03)",
        }}
      >

        {/* Order Number */}

        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "18px",
            background: "#FBF7EF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "700",
            color: "#C89B2C",
          }}
        >
          {order.orderNumber || order.id}
        </div>

        {/* Product */}

        <div>

          <h3
            style={{
              margin: 0,
              fontSize: "20px",
              color: "#1C1917",
            }}
          >
            {order.items?.[0]?.name ||
              order.name ||
              "Luxury Jewellery"}
          </h3>

          <p
            style={{
              marginTop: "8px",
              color: "#78716C",
              fontSize: "14px",
            }}
          >
            {formatDate(order.createdAt || order.date)}
          </p>

        </div>

        {/* Amount */}

        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontFamily: "'Arial', serif",
              fontSize: "15px",
              color: "#1C1917",
            }}
          >
            ₦
            {Number(
              order.totalAmount ||
              order.amount ||
              0
            ).toLocaleString()}
          </div>

          <div
            style={{
              marginTop: "6px",
            }}
          >
            {getStatusBadge(
              order.orderStatus ||
              order.status ||
              "Paid"
            )}
          </div>

        </div>

        {/* Button */}

        <button
          onClick={() => {
    console.log("Clicked Order:", order);
    setSelectedOrder(order);
}}
          style={{
            border: "none",
            background: "#C89B2C",
            boxShadow: "0 10px 20px rgba(200,155,44,.25)",
            color: "#fff",
            padding: "14px 22px",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Details
        </button>

      </div>

    ))}

  </div>

</section>
            {/* Pagination Controls */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px", marginTop: "32px" }}>
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                style={{ padding: "10px 20px", borderRadius: "20px", border: "1px solid #EFEAE3", backgroundColor: "#FAF6F0", color: "#78716C", fontSize: "13px", fontWeight: "600", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
              >
                Previous
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{ width: "38px", height: "38px", borderRadius: "50%", border: "none", backgroundColor: currentPage === page ? "#C89B2C" : "#FAF6F0", color: currentPage === page ? "#FFFFFF" : "#78716C", fontSize: "13px", fontWeight: "700", cursor: "pointer" }}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                style={{ padding: "10px 20px", borderRadius: "20px", border: "1px solid #EFEAE3", backgroundColor: "#FAF6F0", color: "#78716C", fontSize: "13px", fontWeight: "600", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          /* ================= VIEW 2: ORDER DETAILS (IN-PAGE) ================= */
          <div style={{ backgroundColor: "#FAF6F0", border: "1px solid #EFEAE3", borderRadius: "20px", padding: "36px", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
            
            {/* Back Button */}
            <button
              onClick={() => setSelectedOrder(null)}
              style={{ background: "none", border: "none", display: "inline-flex", alignItems: "center", gap: "8px", color: "#C89B2C", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginBottom: "24px" }}
            >
              <ArrowLeft size={18} /> Back to Purchase History
            </button>

            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", paddingBottom: "20px", borderBottom: "1px solid #ECE4D8", marginBottom: "24px" }}>
              <div>
                <span style={{ fontSize: "12px", color: "#A8A29E", fontWeight: "600", textTransform: "uppercase" }}>Order Reference</span>
                <h2 style={{ fontFamily: "'Arial', serif", fontSize: "32px", margin: "4px 0 0 0", color: "#1C1917" }}>
                  Order #{selectedOrder.orderNumber || selectedOrder.id || "RR031"}
                </h2>
              </div>
              <div>{getStatusBadge(selectedOrder.orderStatus)}</div>
            </div>

            {/* Details Breakdown */}

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    padding: "24px",
    background: "#FFFFFF",
    border: "1px solid #ECE7DF",
    borderRadius: "16px",
    marginBottom: "28px",
  }}
>
  <div>
    <div style={{ fontSize: "12px", color: "#A8A29E" }}>
      Date Placed
    </div>

    <div style={{ marginTop: "6px", fontWeight: "600" }}>
      {formatDate(selectedOrder.createdAt)}
    </div>
  </div>

  <div>
    <div style={{ fontSize: "12px", color: "#A8A29E" }}>
      Total Amount
    </div>

    <div
      style={{
        marginTop: "6px",
        fontWeight: "700",
        color: "#C89B2C",
      }}
    >
      ₦{Number(selectedOrder.totalAmount).toLocaleString()}
    </div>
  </div>

  <div>
    <div style={{ fontSize: "12px", color: "#A8A29E" }}>
      Payment Status
    </div>

    <div style={{ marginTop: "6px", fontWeight: "600" }}>
      {selectedOrder.paymentStatus
  ? selectedOrder.paymentStatus.charAt(0).toUpperCase() +
    selectedOrder.paymentStatus.slice(1)
  : "Pending"}
    </div>
  </div>

  <div>
    <div style={{ fontSize: "12px", color: "#A8A29E" }}>
      Order Status
    </div>

    <div style={{ marginTop: "6px", fontWeight: "600" }}>
      {selectedOrder.orderStatus}
    </div>
  </div>

  <div>
    <div style={{ fontSize: "12px", color: "#A8A29E" }}>
      Order Number
    </div>

    <div style={{ marginTop: "6px", fontWeight: "600" }}>
      {selectedOrder.orderNumber}
    </div>
  </div>

  <div>
    <div style={{ fontSize: "12px", color: "#A8A29E" }}>
      Payment Reference
    </div>

    <div style={{ marginTop: "6px", fontWeight: "600" }}>
      {selectedOrder.paymentReference || "—"}
    </div>
  </div>
</div>

            {/* Purchased Items */}

<h3
  style={{
    fontFamily: "'Arial', serif",
    fontSize: "26px",
    margin: "0 0 20px",
    color: "#1C1917",
  }}
>
  Acquired Items
</h3>

<div
  style={{
    background: "#FFFFFF",
    border: "1px solid #ECE7DF",
    borderRadius: "18px",
    overflow: "hidden",
  }}
>
  {(selectedOrder.items?.length
    ? selectedOrder.items
    : [
        {
          name: selectedOrder.name || "Diamond Eternity Ring",
          quantity: 1,
          price: selectedOrder.totalAmount,
        },
      ]
  ).map((item, index) => (
    <div
      key={index}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px",
        borderBottom:
          index !==
          (selectedOrder.items?.length
            ? selectedOrder.items.length
            : 1) - 1
            ? "1px solid #F2EEE8"
            : "none",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#1C1917",
          }}
        >
          {item.name || "Luxury Jewel"}
        </div>

        <div
          style={{
            marginTop: "8px",
            color: "#78716C",
            fontSize: "14px",
          }}
        >
          Quantity: {item.quantity || 1}
        </div>
      </div>

      <div
        style={{
          fontWeight: "700",
          fontSize: "18px",
          color: "#1C1917",
        }}
      >
        ₦{Number(item.price || selectedOrder.totalAmount || 0).toLocaleString()}
      </div>
    </div>
  ))}
</div>

  {/* Payment & Support */}

<div
  style={{
    marginTop: "28px",
    background: "#FFFFFF",
    border: "1px solid #ECE7DF",
    borderRadius: "18px",
    padding: "28px",
  }}
>
  <h3
    style={{
      margin: 0,
      marginBottom: "24px",
      fontFamily: "'Arial', serif",
      fontSize: "32px",
      color: "#1C1917",
      fontWeight: "400",
    }}
  >
    Payment & Support
  </h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
      gap: "24px",
      marginBottom: "28px",
    }}
  >
    <div>
      <p
        style={{
          margin: 0,
          color: "#A89F91",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: ".15em",
        }}
      >
        Payment Status
      </p>

      <h4
        style={{
          marginTop: "8px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#1C1917",
        }}
      >
        {selectedOrder.paymentStatus
  ? selectedOrder.paymentStatus.charAt(0).toUpperCase() +
    selectedOrder.paymentStatus.slice(1)
  : "Pending"}
      </h4>
    </div>

    <div>
      <p
        style={{
          margin: 0,
          color: "#A89F91",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: ".15em",
        }}
      >
        Payment Method
      </p>

      <h4
        style={{
          marginTop: "8px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#1C1917",
        }}
      >
        {selectedOrder.paymentMethod || "Card"}
      </h4>
    </div>

    <div>
      <p
        style={{
          margin: 0,
          color: "#A89F91",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: ".15em",
        }}
      >
        Order Status
      </p>

      <h4
        style={{
          marginTop: "8px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#1C1917",
        }}
      >
        {selectedOrder.orderStatus}
      </h4>
    </div>

    <div>
      <p
        style={{
          margin: 0,
          color: "#A89F91",
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: ".15em",
        }}
      >
        Shipping
      </p>

      <h4
        style={{
          marginTop: "8px",
          fontSize: "18px",
          fontWeight: "600",
          color: "#1C1917",
        }}
      >
        Awaiting Dispatch
      </h4>
    </div>
  </div>

  <div
    style={{
      borderTop: "1px solid #ECE7DF",
      paddingTop: "24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "20px",
    }}
  >
    <div>
      <p
        style={{
          margin: 0,
          fontSize: "12px",
          letterSpacing: ".2em",
          textTransform: "uppercase",
          color: "#A89F91",
        }}
      >
        Grand Total
      </p>

      <h2
        style={{
          margin: "8px 0 0",
          fontFamily: "'Arial', serif",
          fontSize: "42px",
          fontWeight: "400",
          color: "#1C1917",
        }}
      >
        ₦{Number(selectedOrder.totalAmount || 0).toLocaleString()}
      </h2>
    </div>

   <button
  onClick={() => setShowReportModal(true)}
  style={{
    background: "#C89B2C",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "14px",
    padding: "16px 28px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(200,155,44,.25)",
  }}
>
  Report Payment Issue
</button>
  </div>
</div>
          </div>
        )}

      </main>

      {showReportModal && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,.45)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        background: "#FFFFFF",
        borderRadius: "24px",
        padding: "40px",
        textAlign: "center",
        boxShadow: "0 25px 60px rgba(0,0,0,.2)",
      }}
    >
      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "#FBF7EF",
          color: "#C89B2C",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "34px",
          fontWeight: "700",
        }}
      >
        ✓
      </div>

      <h2
        style={{
          marginTop: "24px",
          fontFamily: "'Arial', serif",
          fontSize: "36px",
          color: "#1C1917",
          fontWeight: "400",
        }}
      >
        Payment Issue Submitted
      </h2>

      <p
        style={{
          marginTop: "18px",
          color: "#78716C",
          lineHeight: "30px",
          fontSize: "16px",
        }}
      >
        Order: <strong>{selectedOrder?.orderNumber || "N/A"}</strong>

        <br />
        <br />

        We've received your payment support request.

        <br />

        Our support team will review your transaction and contact you shortly.
      </p>

      <button
        onClick={() => setShowReportModal(false)}
        style={{
          marginTop: "28px",
          background: "#C89B2C",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "14px",
          padding: "14px 34px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
      <Footer />
    </div>
  );
}