import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cartItems } = useCart();
  const [errors, setErrors] = useState({});

  const [deliveryMethod, setDeliveryMethod] =
    useState("delivery");

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


  const handleCheckout = () => {
    if (!validateForm()) {
        return;
    }
    alert("Validation Passed");
  };


  const validateForm = () => {
    const newErrors = {};

    if (!formData.contact.trim()) {
        newErrors.contact = "Contact is required"
    }

    if(!formData.firstName.trim()) {
        newErrors.firstName = "First name is required"
    }

    if(!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required"
    }

    if(!formData.phone.trim()) {
        newErrors.phone = "Phone Number is required"
    }

    if(deliveryMethod === "delivery") {
        if(!formData.address.trim()) {
            newErrors.address = "address is required"
        }

        if(!formData.city.trim()) {
            newErrors.city = "City is required"
        }

        if(!formData.state.trim()) {
            newErrors.state = "State is required"
        }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const totalPieces = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
                fontFamily:
                  "'Cormorant Garamond', serif",
                fontSize: "48px",
                color: "#111",
                marginBottom: "30px",
              }}
            >
              Checkout
            </h1>

            {/* CONTACT */}
            <h2
              style={{
                marginBottom: "20px",
                color: "#111",
              }}
            >
              Contact
            </h2>

            <input
              name="contact"
              placeholder="Email Address or Phone Number"
              value={formData.contact}
              onChange={handleChange}
              style={inputStyle}
            />

            {errors.contact && (
    <p
      style={{
        color: "#d32f2f",
        marginTop: "-10px",
        marginBottom: "15px",
        fontSize: "14px"
      }}
    >
      {errors.contact}
    </p>
  )}

            {/* DELIVERY METHOD */}
            <h2
  style={{
    marginTop: "35px",
    marginBottom: "20px",
    color: "#111",
    fontSize: "32px",
    fontFamily: "'Cormorant Garamond', serif",
  }}
>
  Delivery
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    backgroundColor: "#f4f1ec",
    borderRadius: "14px",
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
      backgroundColor:
        deliveryMethod === "delivery"
          ? "#fff"
          : "transparent",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow:
        deliveryMethod === "delivery"
          ? "0 2px 10px rgba(0,0,0,0.08)"
          : "none",
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
      backgroundColor:
        deliveryMethod === "pickup"
          ? "#fff"
          : "transparent",
      fontSize: "18px",
      fontWeight: "600",
      cursor: "pointer",
      boxShadow:
        deliveryMethod === "pickup"
          ? "0 2px 10px rgba(0,0,0,0.08)"
          : "none",
    }}
  >
    📦 Pickup
  </button>
</div>

          {/* DELIVERY FORM */}
{deliveryMethod === "delivery" && (
  <>
    {/* FIRST NAME + LAST NAME */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
      }}
    >
      <div>
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          style={inputStyle}
        />

        {errors.firstName && (
          <p
            style={{
              color: "#d32f2f",
              marginTop: "-10px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {errors.firstName}
          </p>
        )}
      </div>

      <div>
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          style={inputStyle}
        />

        {errors.lastName && (
          <p
            style={{
              color: "#d32f2f",
              marginTop: "-10px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {errors.lastName}
          </p>
        )}
      </div>
    </div>

    {/* PHONE */}
    <input
      name="phone"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={handleChange}
      style={inputStyle}
    />

    {errors.phone && (
      <p
        style={{
          color: "#d32f2f",
          marginTop: "-10px",
          marginBottom: "15px",
          fontSize: "14px",
        }}
      >
        {errors.phone}
      </p>
    )}

    {/* ADDRESS */}
    <input
      name="address"
      placeholder="Address"
      value={formData.address}
      onChange={handleChange}
      style={inputStyle}
    />

    {errors.address && (
      <p
        style={{
          color: "#d32f2f",
          marginTop: "-10px",
          marginBottom: "15px",
          fontSize: "14px",
        }}
      >
        {errors.address}
      </p>
    )}

    {/* CITY + STATE */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
      }}
    >
      <div>
        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          style={inputStyle}
        />

        {errors.city && (
          <p
            style={{
              color: "#d32f2f",
              marginTop: "-10px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {errors.city}
          </p>
        )}
      </div>

      <div>
        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          style={inputStyle}
        />

        {errors.state && (
          <p
            style={{
              color: "#d32f2f",
              marginTop: "-10px",
              marginBottom: "15px",
              fontSize: "14px",
            }}
          >
            {errors.state}
          </p>
        )}
      </div>
    </div>
  </>
)}
            {/* PICKUP */}
            {deliveryMethod === "pickup" && (
              <div
  style={{
    padding: "25px",
    borderRadius: "16px",
    border: "1px solid #e7e1d8",
    backgroundColor: "#fff",
  }}
>
  <h3
    style={{
      marginTop: 0,
      marginBottom: "15px",
      color: "#111",
      fontSize: "22px",
    }}
  >
    Pickup Location
  </h3>

  <div
    style={{
      padding: "20px",
      backgroundColor: "#faf6ef",
      borderRadius: "14px",
      border: "1px solid #e7d6b5",
    }}
  >
    <strong
      style={{
        display: "block",
        marginBottom: "10px",
      }}
    >
      Royal Rings Jewelries
    </strong>

    <p
      style={{
        margin: 0,
        lineHeight: "1.8",
        color: "#555",
      }}
    >
      70 International Airport Road
      <br />
      Lagos State, Nigeria
    </p>
  </div>
</div>
)}

            {/* PAYMENT */}
            <h2
              style={{
                marginTop: "40px",
                marginBottom: "20px",
                color: "#111",
              }}
            >
              Payment Method
            </h2>

            <div
              style={{
                border: "1px solid #e7e1d8",
                borderRadius: "12px",
                padding: "20px",
              }}
            >
              <strong>Paystack</strong>

              <p
                style={{
                  marginTop: "10px",
                  color: "#777",
                  fontSize: "14px",
                }}
              >
                You'll be redirected to Paystack
                to complete your purchase.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
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
            <h2
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
                fontSize: "36px",
                color: "#111",
                marginBottom: "25px",
              }}
            >
              Order Summary
            </h2>

            {cartItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "15px",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "12px",
                  }}
                />

                <div>
                  <h4
                    style={{
                      margin: "0 0 5px",
                    }}
                  >
                    {item.name}
                  </h4>

                  <p
                    style={{
                      margin: 0,
                      color: "#777",
                    }}
                  >
                    Quantity: {item.quantity}
                  </p>

                  <p
                    style={{
                      marginTop: "6px",
                      color: "#cfa76e",
                      fontWeight: "600",
                    }}
                  >
                    Price: Pending
                  </p>
                </div>
              </div>
            ))}

            <hr
              style={{
                border: "none",
                borderTop: "1px solid #e7e1d8",
                margin: "25px 0",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "15px",
              }}
            >
              <span>Products</span>

              <strong>
                {cartItems.length}
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "15px",
              }}
            >
              <span>Total Pieces</span>

              <strong>
                {totalPieces}
              </strong>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "20px",
              }}
            >
              <span>
                {deliveryMethod === "pickup"
                  ? "Pickup Fee"
                  : "Delivery Fee"}
              </span>

              <strong>
                {deliveryMethod === "pickup"
                  ? "₦0"
                  : "Pending"}
              </strong>
            </div>

            <div
              style={{
                padding: "18px",
                backgroundColor: "#faf6ef",
                border: "1px solid #e7d6b5",
                borderRadius: "12px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#777",
                }}
              >
                Order Total
              </p>

              <h3
                style={{
                  margin: "8px 0 0",
                  color: "#cfa76e",
                  fontSize: "28px",
                }}
              >
                Pending Prices
              </h3>
            </div>

            <button onClick={handleCheckout}
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
              Continue To Payment
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

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
export default Checkout;