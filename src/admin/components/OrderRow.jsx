function Badge({ text, colour, bg }) {
  return (
    <span
      style={{
        background: bg,
        color: colour,
        padding: "6px 12px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
}

const STATUS_STYLES = {
  Pending: { colour: "#B8860B", bg: "#FFF8E8" },
  Processing: { colour: "#2563EB", bg: "#DBEAFE" },
  Shipped: { colour: "#7C3AED", bg: "#EDE9FE" },
  Delivered: { colour: "#15803D", bg: "#DCFCE7" },
  Cancelled: { colour: "#DC2626", bg: "#FEE2E2" },
};

function OrderRow({ order, onStatusChange, updating, onViewDetails }) {
  const paymentBadge = () => {
    switch (order.paymentStatus?.toLowerCase()) {
      case "paid":
        return (
          <Badge
            text="Paid"
            colour="#2E8B57"
            bg="#EAF8EE"
          />
        );

      case "failed":
        return (
          <Badge
            text="Failed"
            colour="#DC2626"
            bg="#FEE2E2"
          />
        );

      default:
        return (
          <Badge
            text="Pending"
            colour="#B8860B"
            bg="#FFF8E8"
          />
        );
    }
  };

  const currentStatusStyle =
    STATUS_STYLES[order.orderStatus] || STATUS_STYLES.Pending;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr 1fr 1fr 1fr .8fr",
        padding: "18px 24px",
        alignItems: "center",
        borderBottom: "1px solid #F2EFEB",
        color: "#1C1917",
        fontSize: "15px",
      }}
    >
      {/* Order Number */}
      <strong>{order.orderNumber}</strong>

      {/* Customer */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <span
          style={{
            fontWeight: "600",
            color: "#1C1917",
          }}
        >
          {order.customer?.firstName} {order.customer?.lastName}
        </span>

        <span
          style={{
            fontSize: "13px",
            color: "#78716C",
          }}
        >
          {order.customer?.email}
        </span>
      </div>

      {/* Date */}
      <div>
        {new Date(order.createdAt).toLocaleDateString()}
      </div>

      {/* Amount */}
      <div
        style={{
          fontWeight: "600",
        }}
      >
        ₦{order.totalAmount?.toLocaleString()}
      </div>

      {/* Payment */}
      <div>{paymentBadge()}</div>

      {/* Status - editable */}
      <div>
        <select
          value={order.orderStatus || "Pending"}
          disabled={updating}
          onChange={(e) => onStatusChange(order._id, e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "600",
            color: currentStatusStyle.colour,
            backgroundColor: currentStatusStyle.bg,
            border: "none",
            cursor: updating ? "not-allowed" : "pointer",
            outline: "none",
          }}
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Action */}
      <button
        onClick={() => onViewDetails?.(order)}
        style={{
          background: "#C89B2C",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "8px",
          padding: "8px 14px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "13px",
          transition: ".25s",
        }}
      >
        View
      </button>
    </div>
  );
}

export default OrderRow;