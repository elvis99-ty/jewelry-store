import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Shop() {
  // State to track which product card is currently being hovered over
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Dynamically inject the luxury Serif font family into the page header
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const styles = {
    mainBg: { 
      backgroundColor: "#fdfcfc", 
      minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    },
    divider: { borderTop: "1px solid #e7e1d8" },
    container: {
      maxWidth: "1400px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "40px",
      paddingRight: "40px",
      boxSizing: "border-box"
    },
    
    // Header Space combining everything before the divider line
    heroSpace: { paddingTop: "120px", paddingBottom: "40px" },
    title: { 
      fontFamily: "'Cormorant Garamond', serif", 
      fontSize: "42px", 
      lineHeight: "1.2", 
      fontWeight: "400", 
      color: "#111111", 
      marginBottom: "8px", 
      marginTop: 0 
    },
    subtext: { fontSize: "16px", color: "#6f6f6f", marginBottom: "32px", marginTop: 0 },
    
    controlsRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap" },
    filterGroup: { display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" },
    
    // Controls Buttons
    iconBtn: { padding: "10px", border: "1px solid #e7e1d8", borderRadius: "50%", backgroundColor: "#ffffff", cursor: "pointer", display: "flex", alignItems: "center" },
    activePill: { padding: "8px 20px", fontSize: "14px", backgroundColor: "#cfa76e", color: "#ffffff", border: "none", borderRadius: "9999px", fontWeight: "500", cursor: "pointer" },
    inactivePill: { padding: "8px 20px", fontSize: "14px", backgroundColor: "#ffffff", border: "1px solid #e7e1d8", borderRadius: "9999px", color: "#111111", cursor: "pointer" },
    dropdownGroup: { display: "flex", gap: "12px" },
    select: { padding: "10px 16px", backgroundColor: "#ffffff", border: "1px solid #e7e1d8", borderRadius: "8px", fontSize: "14px", color: "#111111", minWidth: "140px", cursor: "pointer" },
    
    // Product Section below the divider line
    productSection: { paddingTop: "40px", paddingBottom: "64px" },
    grid: { 
      display: "grid", 
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", 
      gap: "32px 24px" 
    },
    
    // Card Structures
    card: { position: "relative", display: "flex", flexDirection: "column" },
    imageWrapper: { aspectRatio: "1/1", width: "100%", overflow: "hidden", borderRadius: "16px", backgroundColor: "#f5f5f5", position: "relative" },
    badge: { position: "absolute", top: "16px", left: "16px", zIndex: 10, backgroundColor: "#cfa76e", color: "#ffffff", fontSize: "11px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", padding: "4px 12px", borderRadius: "6px" },
    image: { height: "100%", width: "100%", objectFit: "cover", objectPosition: "center" },
    
    // Hover Overlay
    cartOverlay: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      padding: "16px",
      background: "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "opacity 0.25s ease, transform 0.25s ease",
      boxSizing: "border-box"
    },
    addToCartBtn: {
      width: "100%",
      backgroundColor: "#cfa76e",
      color: "#ffffff",
      border: "none",
      padding: "12px 0",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
    },

    // Typography below the image card
    infoContainer: { marginTop: "14px" },
    category: { fontSize: "11px", textTransform: "uppercase", tracking: "1px", color: "#8c8c8c", fontWeight: "600", marginBottom: "4px", display: "block" },
    productTitle: { fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "400", color: "#111111", margin: "0 0 6px 0", lineHeight: "1.2" },
    price: { fontSize: "16px", fontWeight: "600", color: "#cfa76e", margin: 0 }
  };

  const products = Array.from({ length: 16 }).map((_, index) => ({
    id: index + 1,
    category: "Rings",
    title: index === 0 ? "Royal Princess Cut Diamond Ring" 
         : index === 1 ? "Classic Gold Solitaire Ring" 
         : index === 2 ? "Platinum Eternity Band" 
         : index === 3 ? "Silver Halo Diamond Ring" 
         : `Luxury Jewelry Piece ${index + 1}`,
    price: index === 0 ? "$2,499.99" : index === 1 ? "$1,899.99" : index === 2 ? "$3,299.99" : index === 3 ? "$799.99" : "$1,250.00",
    isFeatured: true
  }));

  return (
    <>
      <Navbar />

      <main style={styles.mainBg}>
        {/* LINE BELOW NAVBAR */}
        <div style={styles.divider} />

        {/* TOP HEADER SPACE: Everything goes before the divider line */}
        <section style={styles.heroSpace}>
          <div style={styles.container}>
            <h1 style={styles.title}>All Jewelry</h1>
            <p style={styles.subtext}>16 pieces available</p>
            
            {/* CONTROLS (PILLS & DROPDOWNS) */}
            <div style={styles.controlsRow}>
              <div style={styles.filterGroup}>
                <button style={styles.iconBtn}>
                  <svg style={{ width: "16px", height: "16px", color: "#6f6f6f" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </button>
                <button style={styles.activePill}>All</button>
                <button style={styles.inactivePill}>Rings</button>
                <button style={styles.inactivePill}>Chains</button>
                <button style={styles.inactivePill}>Bracelets</button>
                <button style={styles.inactivePill}>Earrings</button>
                <button style={styles.inactivePill}>Necklaces</button>
                <button style={styles.inactivePill}>Pendants</button>
              </div>

              <div style={styles.dropdownGroup}>
                <select style={styles.select}>
                  <option>All Materials</option>
                </select>
                <select style={styles.select}>
                  <option>Newest</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* THE MIDDLE DIVIDER LINE */}
        <div style={styles.divider} />

        {/* IMAGES GRID SECTION */}
        <section style={styles.productSection}>
          <div style={styles.container}>
            
            <div style={styles.grid}>
              {products.map((product, index) => {
                const isHovered = hoveredIndex === index;
                
                return (
                  <div 
                    key={product.id} 
                    style={styles.card}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Image Area Container */}
                    <div style={styles.imageWrapper}>
                      {product.isFeatured && <span style={styles.badge}>Featured</span>}
                      
                      <img 
                        src={`/path-to-your-jewelry-${product.id}.jpg`} 
                        alt={product.title} 
                        style={styles.image} 
                        onError={(e) => { e.target.style.display = 'none'; }} 
                      />

                      {/* Smooth Hover "Add to Cart" Overlay */}
                      <div style={{
                        ...styles.cartOverlay,
                        opacity: isHovered ? 1 : 0,
                        transform: isHovered ? "translateY(0px)" : "translateY(10px)"
                      }}>
                        <button style={styles.addToCartBtn}>
                          <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                          </svg>
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Metadata Content block beneath image container */}
                    <div style={styles.infoContainer}>
                      <span style={styles.category}>{product.category}</span>
                      <h3 style={styles.productTitle}>{product.title}</h3>
                      <p style={styles.price}>{product.price}</p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Shop;