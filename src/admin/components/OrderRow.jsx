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

function OrderRow({ order }) {
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

  const statusBadge = () => {
    switch (order.orderStatus) {
      case "Processing":
        return (
          <Badge
            text="Processing"
            colour="#2563EB"
            bg="#DBEAFE"
          />
        );

      case "Shipped":
        return (
          <Badge
            text="Shipped"
            colour="#7C3AED"
            bg="#EDE9FE"
          />
        );

      case "Delivered":
        return (
          <Badge
            text="Delivered"
            colour="#15803D"
            bg="#DCFCE7"
          />
        );

      case "Cancelled":
        return (
          <Badge
            text="Cancelled"
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

      {/* Status */}
      <div>{statusBadge()}</div>

      {/* Action */}
      <button
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