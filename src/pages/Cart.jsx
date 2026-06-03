import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Cart() {
  // Inject the elegant Serif font family for the heading styles
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const styles = {
    mainBg: { 
      backgroundColor: "#fdfcfc", 
      minHeight: "70vh", // Gives enough vertical breathing room between navbar and footer
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      padding: "80px 20px",
      boxSizing: "border-box"
    },
    divider: { borderTop: "1px solid #e7e1d8", width: "100%" },
    
    // Central Container Content Block
    contentBox: {
      textAlign: "center",
      maxWidth: "500px",
      width: "100%"
    },
    
    // Empty Bag Icon Frame
    iconContainer: {
      marginBottom: "24px",
      display: "inline-flex",
      justifyContent: "center",
      alignItems: "center"
    },
    iconSvg: {
      width: "80px",
      height: "80px",
      color: "#cccccc", // Soft grey stroke outline matching the screenshot
    },
    
    // Typography Matching
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

  // Quick helper for simple button interaction style feedback
  const handleButtonPress = (e, press) => {
    e.target.style.backgroundColor = press ? "#b8935c" : "#cfa76e";
  };

  return (
    <>
      <Navbar />
      
      {/* SEPARATING LINE DIRECTLY UNDER NAVBAR */}
      <div style={styles.divider} />

      {/* EMPTY CART HERO CONTENT PANEL */}
      <main style={styles.mainBg}>
        <div style={styles.contentBox}>
          
          {/* SHOPPING BAG VECTOR GRAPHIC */}
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

          {/* HEADLINE SECTIONS */}
          <h1 style={styles.heading}>Your Cart is Empty</h1>
          <p style={styles.subtext}>Discover beautiful pieces from our collection</p>

          {/* CALL TO ACTION LINK */}
          <button 
            style={styles.actionBtn}
            onMouseDown={(e) => handleButtonPress(e, true)}
            onMouseUp={(e) => handleButtonPress(e, false)}
            onClick={() => window.location.href = "/shop"} // Adjust this route value if needed
          >
            Start Shopping
          </button>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Cart;