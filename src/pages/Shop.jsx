import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";

function Shop() {

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    const link = document.createElement("link");

    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";

    link.rel = "stylesheet";

    document.head.appendChild(link);

  }, []);

  const styles = {

    mainBg: {
      backgroundColor: "#fdfcfc",
      minHeight: "100vh",
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    },

    divider: {
      borderTop: "1px solid #e7e1d8"
    },

    container: {
      maxWidth: "1400px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "40px",
      paddingRight: "40px",
      boxSizing: "border-box"
    },

    heroSpace: {
      paddingTop: "50px",
      paddingBottom: "40px"
    },

    title: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "42px",
      lineHeight: "1.2",
      fontWeight: "400",
      color: "#111111",
      marginBottom: "8px",
      marginTop: 0
    },

    subtext: {
      fontSize: "16px",
      color: "#6f6f6f",
      marginBottom: "32px",
      marginTop: 0
    },

    controlsRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap"
    },

    filterGroup: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      flexWrap: "wrap"
    },

    activePill: {
      padding: "8px 20px",
      fontSize: "14px",
      backgroundColor: "#cfa76e",
      color: "#ffffff",
      border: "none",
      borderRadius: "9999px",
      fontWeight: "500",
      cursor: "pointer"
    },

    inactivePill: {
      padding: "8px 20px",
      fontSize: "14px",
      backgroundColor: "#ffffff",
      border: "1px solid #e7e1d8",
      borderRadius: "9999px",
      color: "#111111",
      cursor: "pointer"
    },

    productSection: {
      paddingTop: "40px",
      paddingBottom: "64px"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "32px 24px"
    },

    card: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      cursor: "pointer"
    },

    imageWrapper: {
      aspectRatio: "1/1",
      width: "100%",
      overflow: "hidden",
      borderRadius: "16px",
      backgroundColor: "#f5f5f5",
      position: "relative"
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
      borderRadius: "6px"
    },

    image: {
      height: "100%",
      width: "100%",
      objectFit: "cover",
      objectPosition: "center",
      transition: "transform 0.4s ease"
    },

    cartOverlay: {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      padding: "16px",
      background:
        "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0))",
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
      cursor: "pointer"
    },

    infoContainer: {
      marginTop: "14px"
    },

    category: {
      fontSize: "11px",
      textTransform: "uppercase",
      color: "#8c8c8c",
      fontWeight: "600",
      marginBottom: "4px",
      display: "block",
      letterSpacing: "1px"
    },

    productTitle: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "22px",
      fontWeight: "400",
      color: "#111111",
      margin: "0 0 6px 0",
      lineHeight: "1.2"
    },

    price: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#cfa76e",
      margin: 0
    }
  };

  return (
    <>
      <Navbar />

      <main style={styles.mainBg}>

        <div style={styles.divider} />

        {/* HERO */}
        <section style={styles.heroSpace}>

          <div style={styles.container}>

            <h1 style={styles.title}>
              All Jewelry
            </h1>

            <p style={styles.subtext}>
              {products.length} Pieces Available
            </p>

            <div style={styles.controlsRow}>

              <div style={styles.filterGroup}>

                <button style={styles.activePill}>
                  All
                </button>

                {/* RINGS */}
                <button
                  style={styles.inactivePill}
                  onClick={() => navigate("/rings")}
                >
                  Rings
                </button>

                {/* BRACELETS */}
                <button
                  style={styles.inactivePill}
                  onClick={() => navigate("/bracelets")}
                >
                  Bracelets
                </button>

                {/* NECKLACE */}
                <button
                  style={styles.inactivePill}
                  onClick={() => navigate("/necklace")}
                >
                  Necklace
                </button>

                {/* EARRINGS */}
                <button style={styles.inactivePill}>
                  Earrings
                </button>

              </div>

            </div>

          </div>

        </section>

        <div style={styles.divider} />

        {/* PRODUCTS */}
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

                    onClick={() => {

                      // RINGS
                      if (product.category === "rings") {

                        navigate("/rings", {
                          state: {
                            subCategory:
                              product.subCategory || "all"
                          }
                        });

                      }

                      // BRACELETS
                      else if (
                        product.category === "female-bracelets" ||
                        product.category === "male-bracelets"
                      ) {

                        navigate("/bracelets");

                      }

                      // NECKLACE
                      else if (
                        product.category === "Necklace"
                      ) {

                        navigate("/necklace");

                      }

                    }}
                  >

                    {/* IMAGE */}
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
                            : "scale(1)"
                        }}
                      />

                      {/* ADD TO CART */}
                      <div
                        style={{
                          ...styles.cartOverlay,
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered
                            ? "translateY(0px)"
                            : "translateY(10px)"
                        }}
                      >

                        <button style={styles.addToCartBtn}>
                          Add to Cart
                        </button>

                      </div>

                    </div>

                    {/* INFO */}
                    <div style={styles.infoContainer}>

                      <span style={styles.category}>
                        {product.category
                          .replaceAll("-", " ")
                          .toUpperCase()}
                      </span>

                      <h3 style={styles.productTitle}>
                        {product.name}
                      </h3>

                      <p style={styles.price}>

                        {product.price
                          ? `₦${product.price.toLocaleString()}`
                          : "Luxury Piece"}

                      </p>

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