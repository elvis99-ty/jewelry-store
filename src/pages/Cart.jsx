import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity, updateQuantity } = useCart();
  const styles = {
    mainBg: { 
      backgroundColor: "#fdfcfc", 
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: "80px 20px",
      boxSizing: "border-box"
    },
    divider: { borderTop: "1px solid #e7e1d8", width: "100%" },
    
    contentBox: {
      textAlign: "center",
      maxWidth: "500px",
      width: "100%"
    },
    
    iconContainer: {
      marginBottom: "24px",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center"
    },
    iconSvg: {
      width: "80px",
      height: "80px",
      color: "#cccccc",
    },
    

    heading: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "36px",
      fontWeight: "400",
      color: "#111111",
      margin: "0 0 12px 0",
      lineHeight: "1.2"
    },
    subtext: {
      fontSize: "16px",
      color: "#6f6f6f",
      fontWeight: "300",
      margin: "0 0 32px 0",
      lineHeight: "1.5"
    },
    
    // Golden "Start Shopping" Button Actions
    actionBtn: {
      backgroundColor: "#cfa76e",
      color: "#ffffff",
      border: "none",
      padding: "14px 36px",
      borderRadius: "9999px", // Fully rounded pill shape
      fontSize: "15px",
      fontWeight: "500",
      cursor: "pointer",
      boxShadow: "0 2px 8px rgba(207, 167, 110, 0.2)",
      transition: "background-color 0.2s ease, transform 0.2s ease",
      outline: "none"
    }
  };


  const handleButtonPress = (e, press) => {
    e.target.style.backgroundColor = press ? "#b8935c" : "#cfa76e";
  };

  if (cartItems.length === 0) {
  return (
    <>
      <Navbar />

      <div style={styles.divider} />

      <main style={styles.mainBg}>
        <div style={styles.contentBox}>
          
          <div style={styles.iconContainer}>
            <svg
              style={styles.iconSvg}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
              />
            </svg>
          </div>

          <h1 style={styles.heading}>Your Cart is Empty</h1>

          <p style={styles.subtext}>
            Discover beautiful pieces from our collection
          </p>

          <button
            style={styles.actionBtn}
            onMouseDown={(e) => handleButtonPress(e, true)}
            onMouseUp={(e) => handleButtonPress(e, false)}
            onClick={() => window.location.href = "/shop"}
          >
            Start Shopping
          </button>

        </div>
      </main>

      <Footer />
    </>
  );
}
  return (
    <>
      <Navbar />
      
      <div style={styles.divider} />
      <main
  style={{
    backgroundColor: "#fdfcfc",
    minHeight: "100vh",
    padding: "30px 60px 40px"
  }}
>
  <div
    style={{
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "40px"
    }}
  >
    {/* CART ITEMS */}
    <div>
      <h1
  style={{
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "54px",
    color: "#111",
    marginBottom: "8px"
  }}
>
  Shopping Bag
</h1>

<p
  style={{
    color: "#777",
    fontSize: "15px",
    marginBottom: "40px"
  }}
>
  Review your selected pieces before checkout
</p>

      {cartItems.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: "20px",
            backgroundColor: "#fff",
            border: "1px solid #e7e1d8",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "20px"
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "160px",
              height: "160px",
              objectFit: "cover",
              borderRadius: "12px"
            }}
          />

          <div style={{ flex: 1 }}>
            <h3
  style={{
    margin: 0,
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "30px",
    color: "#111",
    fontWeight: "500"
  }}
>
  {item.name}
</h3>         <p
  style={{
    marginTop: "8px",
    color: "#777",
    fontSize: "14px",
    letterSpacing: "1px"
  }}
>
  Type: {item.type?.replaceAll("-", " ").toUpperCase()}
</p>

<p
  style={{
    marginTop: "20px",
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#555"
  }}
>
  Quantity
</p>

            <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "18px"
  }}
>
  <button
    onClick={() => decreaseQuantity(item.id)}
    style={{
      width: "42px",
      height: "42px",
      textAlign : "center",
      border: "1px solid #cfa76e",
      backgroundColor: "#fff",
      borderRadius: "10px",
      fontSize: "20px",
      cursor: "pointer",
      outline : "none",
      fontWeight : "700",
      color : "#111"
    }}
  >
    −
  </button>

  <input
  type="number"
  min="1"
  value={item.quantity}
  onChange={(e) =>
    updateQuantity(
      item.id,
      Number(e.target.value) || 1
    )
  }
  style={{
  width: "53px",
  height: "42px",
  border: "1px solid #cfa76e",
  backgroundColor: "#fff",
  borderRadius: "12px",
  fontSize: "28px",
  fontWeight: "700",
  textAlign : "center",
  color: "#111",
  cursor: "pointer",
  appearance : "textfield",
  MozAppearance : "textfield"
}}

  />

  <button
    onClick={() => increaseQuantity(item.id)}
    style={{
      width: "42px",
      height: "42px",
      border: "1px solid #cfa76e",
      backgroundColor: "#fff",
      borderRadius: "10px",
      fontSize: "20px",
      cursor: "pointer",
      fontWeight : "700",
      color : "#111"
    }}
  >
    +
  </button>
</div>
            {item.price && (
              <p
                style={{
                  color: "#cfa76e",
                  fontWeight: "700"
                }}
              >
                ₦{item.price.toLocaleString()}
              </p>
            )}

            <button
              onClick={() => removeFromCart(item.id)}
              style={{
                marginTop: "12px",
                border: "none",
                background: "#fff0f0",
                color: "#d32f2f",
                padding: "10px 16px",
                borderRadius: "10px",
                cursor: "pointer"
              }}
            >
              Remove Item
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* ORDER SUMMARY */}
    <div>
      <div
        style={{
          backgroundColor: "#fff",
          border: "1px solid #e7e1d8",
          borderRadius: "18px",
          padding: "24px",
          position: "sticky",
          top: "120px"
        }}
      >
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "36px",
            color : "#111",
            marginBottom : "25px",
            marginTop: 0
          }}
        >
          Order Summary
        </h2>

        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px"
  }}
>
  <span
  style={{
    color : "#555",
    fontWeight : "600",
    fontSize : "15px"
  }}>
    Products
    </span>

  <span style={{
    color : "#111",
    fontWeight : "700",
    fontSize : "18px"
  }}
  >{cartItems.length}
  </span>
</div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "12px"
          }}
        >
          <span style={{
            color : "#555",
            fontWeight : "600",
            fontSize : "15px"
          }}
          >Total Pieces
          </span>

          <span style={{
            color : "#111",
            fontWeight : "700",
            fontSize : "18px"
          }}>
            {cartItems.reduce(
              (total, item) =>
                total + item.quantity,
              0
            )}
          </span>
        </div>

        
          <div
  style={{
    marginTop: "20px",
    padding: "18px",
    backgroundColor: "#faf6ef",
    border: "1px solid #e7d6b5",
    borderRadius: "12px"
  }}
>
  <p
    style={{
      margin: 0,
      fontSize: "13px",
      color: "#777"
    }}
  >
    Order Total
  </p>

  <h3
    style={{
      margin: "8px 0 0",
      color: "#cfa76e",
      fontSize: "28px",
      fontWeight: "700"
    }}
  >
    Coming Soon
  </h3>
</div>

        <hr
          style={{
            border: "none",
            borderTop:
              "1px solid #e7e1d8",
            margin: "20px 0"
          }}
        />

        <button onClick={() => navigate("/checkout")}
          style={{
            width: "100%",
            height: "52px",
            backgroundColor: "#cfa76e",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  </div>
</main>
      <Footer />
    </>
  );
}

export default Cart;