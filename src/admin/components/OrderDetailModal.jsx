function OrderDetailModal({ order, onClose, onStatusChange, updating }) {
  if (!order) return null;

  const STATUS_STYLES = {
    Pending: { colour: "#B8860B", bg: "#FFF8E8" },
    Processing: { colour: "#2563EB", bg: "#DBEAFE" },
    Shipped: { colour: "#7C3AED", bg: "#EDE9FE" },
    Delivered: { colour: "#15803D", bg: "#DCFCE7" },
    Cancelled: { colour: "#DC2626", bg: "#FEE2E2" },
  };

  const currentStatusStyle =
    STATUS_STYLES[order.orderStatus] || STATUS_STYLES.Pending;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "680px",
          maxHeight: "88vh",
          overflowY: "auto",
        }}
        className="p-5 sm:p-9"
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            borderBottom: "1px solid #ECE7DF",
            paddingBottom: "18px",
            marginBottom: "24px",
          }}
        >
          <div>
            <span
              style={{
                fontSize: "12px",
                letterSpacing: ".2em",
                textTransform: "uppercase",
                color: "#C89B2C",
                fontWeight: "700",
              }}
            >
              Order Details
            </span>
            <h2
              style={{
                margin: "6px 0 0",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "32px",
                color: "#1C1917",
              }}
            >
              Order #{order.orderNumber}
            </h2>
            <p style={{ margin: "4px 0 0", color: "#78716C", fontSize: "14px" }}>
              Placed on {new Date(order.createdAt).toLocaleDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          <button
            onClick={onClose}
            style={{
              background: "#F5F2EC",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#666",
            }}
          >
            ✕
          </button>
        </div>

        {/* Customer & Shipping Details */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-6 p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] text-sm"
        >
          <div>
            <strong style={{ color: "#1C1917", display: "block", marginBottom: "6px" }}>
              Customer Information
            </strong>
            <p style={{ margin: "2px 0", color: "#444" }}>
              {order.customer?.firstName} {order.customer?.lastName}
            </p>
            <p style={{ margin: "2px 0", color: "#444" }}>{order.customer?.email}</p>
            <p style={{ margin: "2px 0", color: "#444" }}>{order.customer?.phone}</p>
          </div>

          <div>
            <strong style={{ color: "#1C1917", display: "block", marginBottom: "6px" }}>
              Delivery ({order.deliveryMethod === "pickup" ? "Pickup" : "Shipping"})
            </strong>
            {order.deliveryMethod === "pickup" ? (
              <p style={{ margin: "2px 0", color: "#444" }}>
                Store Pickup at Royal Rings Showroom
              </p>
            ) : (
              <>
                <p style={{ margin: "2px 0", color: "#444" }}>{order.customer?.address}</p>
                <p style={{ margin: "2px 0", color: "#444" }}>
                  {order.customer?.city}, {order.customer?.state}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Payment & Status Control */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 p-4 rounded-2xl bg-white border border-[#ECE7DF]"
        >
          <div>
            <span style={{ fontSize: "12px", color: "#78716C", display: "block" }}>
              Payment Status
            </span>
            <span
              style={{
                display: "inline-block",
                marginTop: "4px",
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "capitalize",
                background:
                  order.paymentStatus === "paid"
                    ? "#EAF8EE"
                    : order.paymentStatus === "failed"
                    ? "#FEE2E2"
                    : "#FFF8E8",
                color:
                  order.paymentStatus === "paid"
                    ? "#2E8B57"
                    : order.paymentStatus === "failed"
                    ? "#DC2626"
                    : "#B8860B",
              }}
            >
              {order.paymentStatus || "pending"}
            </span>
          </div>

          <div>
            <span style={{ fontSize: "12px", color: "#78716C", display: "block" }}>
              Payment Reference
            </span>
            <span
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#1C1917",
                display: "block",
                marginTop: "4px",
                wordBreak: "break-all",
              }}
            >
              {order.paymentReference || "—"}
            </span>
          </div>

          <div>
            <span style={{ fontSize: "12px", color: "#78716C", display: "block", marginBottom: "4px" }}>
              Order Status
            </span>
            <select
              value={order.orderStatus || "Pending"}
              disabled={updating}
              onChange={(e) => onStatusChange(order._id, e.target.value)}
              style={{
                padding: "6px 10px",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: "600",
                color: currentStatusStyle.colour,
                backgroundColor: currentStatusStyle.bg,
                border: "1px solid #ECE7DF",
                cursor: updating ? "not-allowed" : "pointer",
                outline: "none",
                width: "100%",
              }}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Items List */}
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "22px",
            margin: "0 0 14px",
            color: "#1C1917",
          }}
        >
          Ordered Items
        </h3>

        <div
          style={{
            border: "1px solid #ECE7DF",
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "24px",
          }}
        >
          {order.items?.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderBottom:
                  index !== order.items.length - 1 ? "1px solid #F0EBE4" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "10px",
                      objectFit: "cover",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                )}
                <div>
                  <strong style={{ color: "#1C1917", fontSize: "15px" }}>{item.name}</strong>
                  <p style={{ margin: "2px 0 0", color: "#78716C", fontSize: "13px" }}>
                    Qty: {item.quantity} × ₦{item.price?.toLocaleString()}
                  </p>
                </div>
              </div>

              <strong style={{ color: "#1C1917", fontSize: "15px" }}>
                ₦{((item.price || 0) * (item.quantity || 1)).toLocaleString()}
              </strong>
            </div>
          ))}
        </div>

        {/* Total Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "14px",
            borderTop: "1px solid #ECE7DF",
          }}
        >
          <span style={{ fontSize: "16px", fontWeight: "600", color: "#1C1917" }}>
            Total Order Amount
          </span>
          <span
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#C89B2C",
            }}
          >
            ₦{order.totalAmount?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;
