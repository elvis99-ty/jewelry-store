import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orderApi";
import { initializePayment } from "../api/paymentApi";

function Checkout() {
  const { cartItems } = useCart();
  const [errors, setErrors] = useState({});
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  const [formData, setFormData] = useState({
    contact: "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckout = async () => {
    console.log("checkout clicked");

  if (!validateForm()) {
    console.log("Validation failed");
    return;
  }
  console.log("Validation passed");

  try {
    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.contact,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
      },

      deliveryMethod,

      items: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        category: item.category,
        type: item.type,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      })),

      totalAmount: total,
    };

    console.log(orderData);

    const orderResponse = await createOrder(orderData);

console.log(orderResponse);

const paymentResponse = await initializePayment({
  orderId : orderResponse.order._id,
  email: formData.contact,
  amount: total,
});
  window.location.href = paymentResponse.data.authorization_url;
  } catch (error) {
    console.error(error);

    alert("Unable to save order.");
  }
};

  const validateForm = () => {
    const newErrors = {};

    // Personal info is always required regardless of pickup or delivery
    if (!formData.contact.trim()) {
      newErrors.contact = "CONTACT IS REQUIRED";
    }
    if (!formData.firstName.trim()) {
      newErrors.firstName = "FIRST NAME IS REQUIRED";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "LAST NAME IS REQUIRED";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "PHONE NUMBER IS REQUIRED";
    }

    // Address info is only required if shipping is selected
    if (deliveryMethod === "delivery") {
      if (!formData.address.trim()) {
        newErrors.address = "ADDRESS IS REQUIRED";
      }
      if (!formData.city.trim()) {
        newErrors.city = "CITY IS REQUIRED";
      }
      if (!formData.state.trim()) {
        newErrors.state = "STATE IS REQUIRED";
      }
    }

    console.log(newErrors);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const totalPieces = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * item.quantity,
    0
  );

  const deliveryFee = deliveryMethod === "pickup" ? 0 : 5000;
  const total = subtotal + deliveryFee;

  return (
    <>
      <Navbar />

      <main
        style={{
          backgroundColor: "#fdfcfc",
          minHeight: "100vh",
          padding: "40px 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: "40px",
          }}
        >
          {/* LEFT SIDE */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "35px",
              borderRadius: "20px",
              border: "1px solid #e7e1d8",
            }}
          >
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "48px",
                color: "#111",
                marginBottom: "30px",
              }}
            >
              Checkout
            </h1>

            {/* DELIVERY METHOD TOGGLE */}
            <h2
              style={{
                marginTop: "35px",
                marginBottom: "20px",
                color: "#111",
                fontSize: "32px",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Delivery Method
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                backgroundColor: "#f4f1ec",
                borderRadius: "14px",
                color: "#111",
                padding: "4px",
                marginBottom: "30px",
              }}
            >
              <button
                onClick={() => setDeliveryMethod("delivery")}
                style={{
                  height: "64px",
                  border: "none",
                  borderRadius: "12px",
                  backgroundColor: deliveryMethod === "delivery" ? "#fff" : "transparent",
                  fontSize: "18px",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: deliveryMethod === "delivery" ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
                }}
              >
                🚚 Delivery
              </button>

              <button
                onClick={() => setDeliveryMethod("pickup")}
                style={{
                  height: "64px",
                  border: "none",
                  borderRadius: "12px",
                  backgroundColor: deliveryMethod === "pickup" ? "#fff" : "transparent",
                  fontSize: "18px",
                  color: "#000",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: deliveryMethod === "pickup" ? "0 2px 10px rgba(0,0,0,0.08)" : "none",
                }}
              >
                📦 Pickup
              </button>
            </div>

            {/* CORE CUSTOMER INFO (Always Visible) */}
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", marginBottom: "15px", color: "#111" }}>
              Contact Information
            </h3>
            
            <input
              name="contact"
              placeholder="Email Address"
              value={formData.contact}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.contact && <p style={errorStyle}>{errors.contact}</p>}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <input
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={inputStyle}
                />
                {errors.firstName && <p style={errorStyle}>{errors.firstName}</p>}
              </div>

              <div>
                <input
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={inputStyle}
                />
                {errors.lastName && <p style={errorStyle}>{errors.lastName}</p>}
              </div>
            </div>

            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              style={inputStyle}
            />
            {errors.phone && <p style={errorStyle}>{errors.phone}</p>}

            {/* SHIPPING ADDRESS FIELDS (Conditional) */}
            {deliveryMethod === "delivery" && (
              <>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", marginTop: "25px", marginBottom: "15px", color: "#111" }}>
                  Shipping Address
                </h3>
                <input
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleChange}
                  style={inputStyle}
                />
                {errors.address && <p style={errorStyle}>{errors.address}</p>}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <input
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                    {errors.city && <p style={errorStyle}>{errors.city}</p>}
                  </div>

                  <div>
                    <input
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                    {errors.state && <p style={errorStyle}>{errors.state}</p>}
                  </div>
                </div>
              </>
            )}

            {/* PICKUP ADDRESS DISPLAY (Conditional) */}
            {deliveryMethod === "pickup" && (
              <div style={{ padding: "25px", borderRadius: "16px", border: "1px solid #e7e1d8", backgroundColor: "#fff", marginTop: "20px" }}>
                <h3 style={{ marginTop: 0, marginBottom: "15px", color: "#111", fontSize: "22px" }}>
                  Pickup Location
                </h3>
                <div style={{ padding: "20px", backgroundColor: "#faf6ef", borderRadius: "14px", border: "1px solid #e7d6b5" }}>
                  <strong style={{ display: "block", color: "#111", marginBottom: "10px" }}>
                    ROYAL RINGS JEWELRIES
                  </strong>
                  <p style={{ margin: 0, lineHeight: "1.8", color: "#555" }}>
                    70 International Airport Road
                    <br />
                    Lagos State, Nigeria
                  </p>
                </div>
              </div>
            )}

            {/* PAYMENT BOX */}
            <h2 style={{ marginTop: "40px", marginBottom: "20px", color: "#111" }}>
              Payment Method
            </h2>
            <div style={{ border: "1px solid #e7e1d8", borderRadius: "12px", padding: "20px" }}>
              <strong>Paystack</strong>
              <p style={{ marginTop: "10px", color: "#777", fontSize: "14px" }}>
                You'll pay securely via card or bank transfer using Paystack layers.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div
            style={{
              backgroundColor: "#fff",
              padding: "30px",
              borderRadius: "20px",
              border: "1px solid #e7e1d8",
              position: "sticky",
              top: "120px",
              height: "fit-content",
            }}
          >
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", color: "#111", marginBottom: "25px" }}>
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div key={item.id} style={{ display: "flex", gap: "15px", marginBottom: "20px", paddingBottom: "20px", borderBottom: "1px solid #f0ebe4" }}>
                <img src={item.image} alt={item.name} style={{ width: "70px", height: "70px", objectFit: "cover", borderRadius: "12px" }} />
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "11px", letterSpacing: "1px", color: "#999", textTransform: "uppercase", fontWeight: "600" }}>
                    {item.category?.replaceAll("-", " ")}
                  </p>
                  <h4 style={{ margin: "5px 0", color: "#111", fontSize: "18px", fontWeight: "600" }}>
                    {item.name}
                  </h4>
                  <p style={{ margin: "0 0 8px", color: "#777", fontSize: "13px" }}>
                    {item.type?.replaceAll("-", " ").replace(/\b\w/g, letter => letter.toUpperCase())}
                  </p>
                  <p style={{ margin: 0, color: "#777", fontSize: "14px" }}>
                    Qty: {item.quantity}
                  </p>
                  <p style={{ marginTop: "8px", color: "#cfa76e", fontWeight: "700", fontSize: "16px" }}>
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}

            <hr style={{ border: "none", borderTop: "1px solid #e7e1d8", margin: "25px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", color: "black", marginBottom: "15px" }}>
              <span>Products</span>
              <strong>{cartItems.length}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", color: "black", marginBottom: "15px" }}>
              <span>Total Pieces</span>
              <strong>{totalPieces}</strong>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", color: "black", marginBottom: "20px" }}>
              <span>{deliveryMethod === "pickup" ? "Pickup Fee" : "Delivery Fee"}</span>
              <strong>₦{deliveryFee.toLocaleString()}</strong>
            </div>

            <div style={{ padding: "20px", backgroundColor: "#faf6ef", border: "1px solid #e7d6b5", borderRadius: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "black" }}>
                <span>Subtotal</span>
                <strong>₦{subtotal.toLocaleString()}</strong>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "black" }}>
                <span>{deliveryMethod === "pickup" ? "Pickup" : "Delivery"}</span>
                <strong>₦{deliveryFee.toLocaleString()}</strong>
              </div>

              <hr style={{ border: "none", borderTop: "1px solid #e7d6b5", margin: "15px 0" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: "18px", color: "#111" }}>Total</strong>
                <strong style={{ color: "#cfa76e", fontSize: "28px" }}>₦{total.toLocaleString()}</strong>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                height: "55px",
                marginTop: "25px",
                border: "none",
                borderRadius: "12px",
                backgroundColor: "#cfa76e",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              CONTINUE TO PAYMENT
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// STYLES
const inputStyle = {
  width: "100%",
  height: "58px",
  border: "1px solid #d8d1c7",
  borderRadius: "12px",
  padding: "0 18px",
  fontSize: "16px",
  fontWeight: "500",
  color: "#111",
  backgroundColor: "#fff",
  outline: "none",
  marginBottom: "16px",
  boxSizing: "border-box",
};

const errorStyle = {
  color: "#d32f2f",
  marginTop: "-12px",
  marginBottom: "16px",
  fontSize: "14px",
  fontWeight: "500",
};

export default Checkout;