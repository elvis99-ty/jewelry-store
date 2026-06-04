import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";

function Necklace() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");

    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";

    link.rel = "stylesheet";

    document.head.appendChild(link);
  }, []);

  const necklaceProducts = products.filter(
    (product) => product.category === "necklace"
  );

  const styles = {
    mainBg: {
      backgroundColor: "#fdfcfc",
      minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    },

    divider: {
      borderTop: "1px solid #e7e1d8",
    },

    container: {
      maxWidth: "1400px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "40px",
      paddingRight: "40px",
      boxSizing: "border-box",
    },

    heroSpace: {
      paddingTop: "110px",
      paddingBottom: "30px",
    },

    title: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "42px",
      lineHeight: "1.2",
      fontWeight: "400",
      color: "#111111",
      marginBottom: "8px",
      marginTop: 0,
    },

    subtext: {
      fontSize: "16px",
      color: "#6f6f6f",
      marginBottom: "24px",
      marginTop: 0,
    },

    productSection: {
      paddingTop: "40px",
      paddingBottom: "70px",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "32px 24px",
    },

    card: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
    },

    imageWrapper: {
      aspectRatio: "1/1",
      width: "100%",
      overflow: "hidden",
      borderRadius: "16px",
      backgroundColor: "#f5f5f5",
      position: "relative",
    },

    badge: {
      position: "absolute",
      top: "16px",
      left: "16px",
      zIndex: 10,
      backgroundColor: "#cfa76e",
      color: "#ffffff",
      fontSize: "11px",
      fontWeight: "bold",
      textTransform: "uppercase",
      letterSpacing: "1px",
      padding: "4px 12px",
      borderRadius: "6px",
    },

    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
      transition: "0.4s ease",
    },

    cartOverlay: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      padding: "16px",
      background:
        "linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0))",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "opacity 0.25s ease, transform 0.25s ease",
      boxSizing: "border-box",
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
    },

    infoContainer: {
      marginTop: "14px",
    },

    category: {
      fontSize: "11px",
      textTransform: "uppercase",
      color: "#8c8c8c",
      fontWeight: "600",
      marginBottom: "4px",
      display: "block",
    },

    productTitle: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "22px",
      fontWeight: "400",
      color: "#111111",
      margin: "0 0 6px 0",
      lineHeight: "1.2",
    },

    price: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#cfa76e",
      margin: 0,
    },
  };

  return (
    <>
      <Navbar />

      <main style={styles.mainBg}>
        <div style={styles.divider} />

        <section style={styles.heroSpace}>
          <div style={styles.container}>
            <h1 style={styles.title}>Necklace Collection</h1>

            <p style={styles.subtext}>
              {necklaceProducts.length} Necklaces Available
            </p>
          </div>
        </section>

        <div style={styles.divider} />

        <section style={styles.productSection}>
          <div style={styles.container}>
            <div style={styles.grid}>
              {necklaceProducts.map((product, index) => {
                const isHovered = hoveredIndex === index;

                return (
                  <div
                    key={product.id}
                    style={styles.card}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div style={styles.imageWrapper}>
                      {product.featured && (
                        <span style={styles.badge}>
                          Featured
                        </span>
                      )}

                      <img
                        src={product.image}
                        alt={product.name}
                        style={{
                          ...styles.image,
                          transform: isHovered
                            ? "scale(1.05)"
                            : "scale(1)",
                        }}
                      />

                      <div
                        style={{
                          ...styles.cartOverlay,
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered
                            ? "translateY(0)"
                            : "translateY(10px)",
                        }}
                      >
                        <button style={styles.addToCartBtn}>
                          Add To Cart
                        </button>
                      </div>
                    </div>

                    <div style={styles.infoContainer}>
                      <span style={styles.category}>
                        Necklace
                      </span>

                      <h3 style={styles.productTitle}>
                        {product.name}
                      </h3>

                      {product.price && (
                        <p style={styles.price}>
                          ₦{product.price.toLocaleString()}
                        </p>
                      )}
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

export default Necklace;