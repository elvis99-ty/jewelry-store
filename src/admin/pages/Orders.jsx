import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminTable from "../components/AdminTable";
import OrderRow from "../components/OrderRow";
import OrderDetailModal from "../components/OrderDetailModal";
import { getAllOrders, updateOrderStatus } from "../../api/orderApi";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Orders");
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filter]);

  const fetchOrders = async () => {
    try {
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

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);

    const previousOrders = orders;

    // Optimistic update
    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );

    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      // Roll back on failure
      setOrders(previousOrders);
      alert("Could not update order status. Please try again.");
    } finally {
      setUpdatingOrderId(null);
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
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1C1917",
              fontWeight: "500",
            }}
            className="text-3xl sm:text-4xl md:text-[46px]"
          >
            Orders
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#78716C",
              fontSize: "15px",
            }}
          >
            Manage every customer order.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full md:w-auto"
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
            }}
            className="w-full sm:w-[170px]"
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
            className="w-full sm:w-[320px]"
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
              onStatusChange={handleStatusChange}
              updating={updatingOrderId === order._id}
              onViewDetails={(ord) => setSelectedOrder(ord)}
            />
          ))
        )}
      </AdminTable>

      {/* Pagination */}

      {!loading && filteredOrders.length > 0 && (
        <div
          className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
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

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={(orderId, newStatus) => {
            handleStatusChange(orderId, newStatus);
            setSelectedOrder((prev) =>
              prev ? { ...prev, orderStatus: newStatus } : null
            );
          }}
          updating={updatingOrderId === selectedOrder._id}
        />
      )}
    </AdminLayout>
  );
}

export default Orders;