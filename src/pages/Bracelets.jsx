import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate} from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";

function Bracelets() {

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("type");

  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState(
    categoryFromUrl === "female"
    ? "female-bracelets"
    : categoryFromUrl === "male"
    ? "male-bracelets"
    : "all"
);

  const braceletProducts = products.filter(
    product =>
      product.category === "female-bracelets" ||
      product.category === "male-bracelets"
  );

  const filteredProducts = braceletProducts.filter(product => {

    if (activeCategory === "all") {
      return true;
    }

    return product.category === activeCategory;

  });

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
      paddingBottom: "25px"
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
      marginBottom: "20px",
      marginTop: 0
    },

    controlsWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "16px"
    },

    filterGroup: {
      display: "flex",
      gap: "10px",
      alignItems: "center",
      flexWrap: "wrap"
    },

    activePill: {
      padding: "10px 22px",
      fontSize: "14px",
      backgroundColor: "#cfa76e",
      color: "#ffffff",
      border: "none",
      borderRadius: "9999px",
      fontWeight: "500",
      cursor: "pointer"
    },

    inactivePill: {
      padding: "10px 22px",
      fontSize: "14px",
      backgroundColor: "#ffffff",
      border: "1px solid #e7e1d8",
      borderRadius: "9999px",
      color: "#111111",
      cursor: "pointer"
    },

    productSection: {
      paddingTop: "35px",
      paddingBottom: "70px"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "32px 24px"
    },

    card: {
      position: "relative",
      display: "flex",
      flexDirection: "column"
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
      transition: "0.4s ease"
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

        <section style={styles.heroSpace}>

          <div style={styles.container}>

            <h1 style={styles.title}>
              Bracelets Collection
            </h1>

            <p style={styles.subtext}>
              {filteredProducts.length} Bracelets Available
            </p>

            <div style={styles.controlsWrapper}>

              <div style={styles.filterGroup}>

                <button
                  onClick={() => setActiveCategory("all")}
                  style={
                    activeCategory === "all"
                      ? styles.activePill
                      : styles.inactivePill
                  }
                >
                  All Bracelets
                </button>

                <button
                  onClick={() =>
                    setActiveCategory("female-bracelets")
                  }
                  style={
                    activeCategory === "female-bracelets"
                      ? styles.activePill
                      : styles.inactivePill
                  }
                >
                  Female Bracelets
                </button>

                <button
                  onClick={() =>
                    setActiveCategory("male-bracelets")
                  }
                  style={
                    activeCategory === "male-bracelets"
                      ? styles.activePill
                      : styles.inactivePill
                  }
                >
                  Male Bracelets
                </button>

              </div>

            </div>

          </div>

        </section>

        <div style={styles.divider} />

        <section style={styles.productSection}>

          <div style={styles.container}>

            <div style={styles.grid}>

              {filteredProducts.map((product, index) => {

                const isHovered = hoveredIndex === index;

                return (

                  <div
  key={product.id}
  style={{
    ...styles.card,
    cursor: "pointer",
  }}
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  onClick={() => navigate(`/product/${product.id}`)}
>

                    <div style={styles.imageWrapper}>
                      <img
                      loading="lazy"
                        src={product.image}
                        alt={product.name}
                        style={{
                          ...styles.image,
                          transform: isHovered
                            ? "scale(1.05)"
                            : "scale(1)"
                        }}
                      />

                      <div
                        style={{
                          ...styles.cartOverlay,
                          opacity: isHovered ? 1 : 0,
                          transform: isHovered
                            ? "translateY(0)"
                            : "translateY(10px)"
                        }}
                      >

                      </div>

                    </div>

                    <div style={styles.infoContainer}>

                      <span style={styles.category}>
                        {product.category
                          .replaceAll("-", " ")
                          .toUpperCase()}
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

export default Bracelets;