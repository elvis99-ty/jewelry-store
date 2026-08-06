import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import AdminTable from "../components/AdminTable";
import OrderRow from "../components/OrderRow";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/orders/admin/all-orders"
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        order.orderNumber?.toLowerCase().includes(searchText) ||
        order.customer?.firstName?.toLowerCase().includes(searchText) ||
        order.customer?.lastName?.toLowerCase().includes(searchText) ||
        order.customer?.email?.toLowerCase().includes(searchText);

      let matchesFilter = true;

      if (filter !== "All Orders") {
        if (filter === "Paid" || filter === "Failed") {
          matchesFilter =
            order.paymentStatus?.toLowerCase() === filter.toLowerCase();
        } else {
          matchesFilter =
            order.orderStatus?.toLowerCase() === filter.toLowerCase();
        }
      }

      return matchesSearch && matchesFilter;
    });
  }, [orders, search, filter]);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  return (
    <AdminLayout>
      {/* Header */}

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
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "46px",
              color: "#1C1917",
              fontWeight: "500",
            }}
          >
            Orders
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#78716C",
              fontSize: "16px",
            }}
          >
            Manage every customer order.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
        >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              height: "48px",
              borderRadius: "12px",
              border: "1px solid #D9D2C7",
              padding: "0 16px",
              background: "#FFFFFF",
              color: "#1C1917",
              fontSize: "15px",
              outline: "none",
              cursor: "pointer",
              minWidth: "170px",
            }}
          >
            <option>All Orders</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
            <option>Paid</option>
            <option>Failed</option>
          </select>

          <input
            type="text"
            placeholder="Search by Order No., Customer or Email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "320px",
              height: "48px",
              borderRadius: "12px",
              border: "1px solid #D9D2C7",
              padding: "0 18px",
              outline: "none",
              background: "#FFFFFF",
              color: "#1C1917",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Orders Table */}

      <AdminTable
        columns="1fr 2fr 1fr 1fr 1fr 1fr .8fr"
        headers={[
          "Order No",
          "Customer",
          "Date",
          "Amount",
          "Payment",
          "Status",
          "Action",
        ]}
      >
        {loading ? (
          <div style={{ padding: "40px" }}>Loading orders...</div>
        ) : currentOrders.length === 0 ? (
          <div style={{ padding: "40px", color : "black", textAlign : "center" }}>No Orders Found!!</div>
        ) : (
          currentOrders.map((order) => (
            <OrderRow
              key={order._id}
              order={order}
            />
          ))
        )}
      </AdminTable>

      {/* Pagination */}

      {!loading && filteredOrders.length > 0 && (
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#78716C",
              fontSize: "14px",
            }}
          >
            Showing {(currentPage - 1) * ordersPerPage + 1} -{" "}
            {Math.min(currentPage * ordersPerPage, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
          </span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                border: "1px solid #D9D2C7",
                background: "#FFFFFF",
                color: "#1C1917",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              ←
            </button>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "10px",
                    border:
                      currentPage === page
                        ? "none"
                        : "1px solid #D9D2C7",
                    background:
                      currentPage === page
                        ? "#C89B2C"
                        : "#FFFFFF",
                    color:
                      currentPage === page
                        ? "#FFFFFF"
                        : "#1C1917",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={
                currentPage === totalPages ||
                totalPages === 0
              }
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "10px",
                border: "1px solid #D9D2C7",
                background: "#FFFFFF",
                color: "#1C1917",
                cursor:
                  currentPage === totalPages
                    ? "not-allowed"
                    : "pointer",
                opacity:
                  currentPage === totalPages
                    ? 0.5
                    : 1,
              }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Orders;