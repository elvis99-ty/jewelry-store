import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getMyOrders } from "../services/orderService";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");

  const [view, setView] = useState("summary");

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const ordersPerPage = 10;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const token = sessionStorage.getItem("orderToken");

      if (!token) {
        setLoading(false);
        return;
      }

      const response = await getMyOrders(token);

      const fetchedOrders = response.orders || [];

      setOrders(fetchedOrders);

      if (fetchedOrders.length > 0) {
        setEmail(
          fetchedOrders[0]?.customer?.email ||
            fetchedOrders[0]?.customerEmail ||
            ""
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const totalSpent = useMemo(() => {
    return orders.reduce(
      (sum, order) => sum + Number(order.totalAmount || 0),
      0
    );
  }, [orders]);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const currentOrders = useMemo(() => {
    const start = (currentPage - 1) * ordersPerPage;

    return orders.slice(start, start + ordersPerPage);
  }, [orders, currentPage]);

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setView("detail");
  };

  const handleViewOrders = () => {
    setView("list");
  };

  const handleViewSpent = () => {
    setView("list");
  };

  const handleBackToSummary = () => {
    setSelectedOrder(null);
    setView("summary");
  };

  const handleBackToList = () => {
    setView("list");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FCFBF9] flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-4 border-[#ECE7DF] border-t-[#C89B2C] animate-spin"></div>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-[#FCFBF9] flex flex-col">

      <Navbar />

      <main className="flex-1">

        {/* Header */}

        <section className="border-b border-[#ECE7DF] bg-white">

          <div className="max-w-7xl mx-auto px-8 py-16">

            <div className="max-w-3xl">

              <span className="uppercase tracking-[0.35em] text-[#C89B2C] text-[11px] font-semibold">
                ROYAL RINGS
              </span>

              <h1
                className="mt-4 text-[#1A1A1A]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(48px,6vw,74px)",
                  lineHeight: 1.05,
                  fontWeight: 400,
                }}
              >
                Purchase History
              </h1>

              <p className="mt-4 text-[#7D766F] text-[17px] leading-8 max-w-xl">
                View and manage every Royal Rings purchase made using your
                verified email address.
              </p>

            </div>

            {/* Customer Card */}

            <div className="mt-12">

              <div
                className="
                  bg-white
                  border
                  border-[#ECE7DF]
                  rounded-[28px]
                  shadow-[0_12px_35px_rgba(0,0,0,.04)]
                  p-8
                  max-w-xl
                "
              >

                <p className="uppercase tracking-[0.25em] text-[#A89F91] text-[11px] font-semibold">
                  Verified Customer
                </p>

                <h3
                  className="mt-3 text-[#1A1A1A]"
                  style={{
                    fontSize: "24px",
                    fontWeight: 500,
                  }}
                >
                  {email}
                </h3>

                <div className="mt-5 flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-[#FBF7EF] flex items-center justify-center">

                    ✓

                  </div>

                  <p className="text-[#7D766F]">
                    Your purchase history has been securely verified.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* Content */}

        <section className="max-w-7xl mx-auto w-full px-8 py-14">

          {view === "summary" && (

            <SummaryCards
              totalOrders={orders.length}
              totalSpent={totalSpent}
              onViewOrders={handleViewOrders}
              onViewSpent={handleViewSpent}
            />

          )}

          {view === "list" && (

            <OrderList
              orders={currentOrders}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onSelectOrder={handleOpenOrder}
            />

          )}

          {view === "detail" && (

            <OrderDetails
              order={selectedOrder}
              onBack={handleBackToList}
            />

          )}

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default OrderHistory;