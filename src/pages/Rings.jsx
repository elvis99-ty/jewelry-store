import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProducts } from "../api/productApi";
import { ProductGridSkeleton } from "../components/LuxuryLoader";
import { useSearchParams, Link } from "react-router-dom";

function Rings() {

  const [ringProducts, setRingProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [activeSubCategory, setActiveSubCategory] = useState("all");

  const [activeType, setActiveType] = useState("all");

  const [searchParams ] = useSearchParams();

  useEffect(() => {
    const loadRings = async () => {
      try {
        setLoading(true);
        const fetched = await getProducts("rings");
        setRingProducts(fetched);
      } catch (error) {
        console.error(error);
        setRingProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadRings();
  }, []);

  useEffect(() => {
  const subCategory = searchParams.get("subcategory");
  const type = searchParams.get("type");

  if (subCategory) {
    setActiveSubCategory(subCategory);
  }

  if (type) {
    setActiveType(type);
  }
}, [searchParams]);

// FILTER PRODUCTS
const filteredProducts = ringProducts.filter(product => {

  const matchesSubCategory =
    activeSubCategory === "all" ||
    product.subCategory === activeSubCategory;

  const matchesType =
    activeType === "all" ||
    product.type === activeType;

  return matchesSubCategory && matchesType;
});

const [shuffledProducts, setShuffledProducts] = useState([]);

useEffect(() => {
  setShuffledProducts(
    [...ringProducts].sort(() => Math.random() - 0.5)
  );
}, [ringProducts]);

const productVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.5,
      delay: index * 0.03
    }
  })
};

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
      paddingLeft: "clamp(16px, 4vw, 40px)",
      paddingRight: "clamp(16px, 4vw, 40px)",
      boxSizing: "border-box"
    },

    heroSpace: {
      paddingTop: "40px",
      paddingBottom: "25px"
    },

    title: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(32px, 5vw, 42px)",
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
      gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
      gap: "28px 20px"
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
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px"
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
              Rings Collection
            </h1>

            <p style={styles.subtext}>
              {filteredProducts.length} Rings Available
            </p>

            <div style={styles.controlsWrapper}>

              {/* MAIN CATEGORY */}
              <div style={styles.filterGroup}>

                <button
                  onClick={() => {
                    setActiveSubCategory("all");
                    setActiveType("all");
                  }}
                  style={
                    activeSubCategory === "all"
                      ? styles.activePill
                      : styles.inactivePill
                  }
                >
                  All Rings
                </button>

                <button
                  onClick={() => {
                    setActiveSubCategory("engagement-rings");
                    setActiveType("all");
                  }}
                  style={
                    activeSubCategory === "engagement-rings"
                      ? styles.activePill
                      : styles.inactivePill
                  }
                >
                  Engagement Rings
                </button>

                <button
                  onClick={() => {
                    setActiveSubCategory("wedding-rings");
                    setActiveType("all");
                  }}
                  style={
                    activeSubCategory === "wedding-rings"
                      ? styles.activePill
                      : styles.inactivePill
                  }
                >
                  Wedding Rings
                </button>

              </div>

              {/* ENGAGEMENT TYPES */}
              {activeSubCategory === "engagement-rings" && (

                <div style={styles.filterGroup}>

                  <button
                    onClick={() => setActiveType("all")}
                    style={
                      activeType === "all"
                        ? styles.activePill
                        : styles.inactivePill
                    }
                  >
                    All Types
                  </button>

                  <button
                    onClick={() =>
                      setActiveType("s925-moissanite-stone")
                    }
                    style={
                      activeType === "s925-moissanite-stone"
                        ? styles.activePill
                        : styles.inactivePill
                    }
                  >
                    S925+MOISSANITE STONE
                  </button>

                  <button
                    onClick={() =>
                      setActiveType("s925-zirconia-stone")
                    }
                    style={
                      activeType === "s925-zirconia-stone"
                        ? styles.activePill
                        : styles.inactivePill
                    }
                  >
                    S925+ZIRCONIA STONE
                  </button>

                </div>

              )}

              {/* WEDDING TYPES */}
              {activeSubCategory === "wedding-rings" && (

          <div style={styles.filterGroup}>  

      <button
        onClick={() => setActiveType("all")}
        style={
          activeType === "all"
          ? styles.activePill
          : styles.inactivePill
      }
    >
      All Types
    </button>

    <button
      onClick={() => setActiveType("s925-black")}
      style={
        activeType === "s925-black"
          ? styles.activePill
          : styles.inactivePill
      }
    >
      S925-BLACK
    </button>

    <button
      onClick={() => setActiveType("s925-moissanite-stone")}
      style={
        activeType === "s925-moissanite-stone"
          ? styles.activePill
          : styles.inactivePill
      }
    >
      S925 + MOISSANITE
    </button>

    <button
      onClick={() => setActiveType("titanium-steel-gold")}
      style={
        activeType === "titanium-steel-gold"
          ? styles.activePill
          : styles.inactivePill
      }
    >
      TITANIUM STEEL- GOLD
    </button>

    <button
      onClick={() => setActiveType("titanium-steel-silver")}
      style={
        activeType === "titanium-steel-silver"
          ? styles.activePill
          : styles.inactivePill
      }
    >
      TITANIUM STEEL - SILVER
    </button>

    <button
      onClick={() => setActiveType("zirconia-black")}
      style={
        activeType === "zirconia-black"
          ? styles.activePill
          : styles.inactivePill
      }
    >
      ZIRCONIA BLACK
    </button>

    <button
      onClick={() => setActiveType("zirconia-silver-plated")}
      style={
        activeType === "zirconia-silver-plated"
          ? styles.activePill
          : styles.inactivePill
      }
    >
      ZIRCONIA STONE + SILVER PLATED
    </button>

    <button
      onClick={() => setActiveType("s925-zirconia-stone")}
      style={
        activeType === "s925-zirconia-stone"
          ? styles.activePill
          : styles.inactivePill
      }
    >
      S925 + ZIRCONIA STONE
    </button>

    <button
      onClick={() => setActiveType("zirconia-gold-plated")}
      style={
        activeType === "zirconia-gold-plated"
          ? styles.activePill
          : styles.inactivePill
      }
    >
      ZIRCONIA STONE + GOLD PLATED
    </button>

  </div>

)}

            </div>

          </div>

        </section>

        <div style={styles.divider} />

        {/* PRODUCTS */}
        <section style={styles.productSection}>

          <div style={styles.container}>
            {loading ? (
              <ProductGridSkeleton count={8} />
            ) : filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "#78716C" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#1C1917", margin: "0 0 10px" }}>
                  No Rings Found
                </p>
                <p style={{ margin: 0, fontSize: "15px" }}>No pieces match this selected filter. Try choosing "All Rings".</p>
              </div>
            ) : (
              <div style={styles.grid}>

              {(
              activeSubCategory === "all" &&
              activeType === "all"
              ? shuffledProducts
              : filteredProducts
              ).map((product, index) => {

                const isHovered = hoveredIndex === index;

                return (
                  <Link to={`/product/${product.id}`} key={product.id}>
                  <motion.div
                    style={styles.card}
                    custom={index}
                    variants={productVariants}
                    initial="hidden"
                    animate="visible"
                    onMouseEnter={() =>
                    setHoveredIndex(index)
                    }
                    onMouseLeave={() =>
                    setHoveredIndex(null)
                    }
                    >
                    

                    {/* IMAGE */}
                    <div style={styles.imageWrapper}>
                      <img
                      loading="lazy"
                        src={product.image}
                        alt={product.name}
                        style={{
                          ...styles.image,
                          transform: isHovered
                            ? "scale(1.08)"
                            : "scale(1)"
                        }}
                      />

                      {/* ADD TO CART */}
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

                    {/* INFO */}
                    <div style={styles.infoContainer}>

                      <span style={styles.category}>

                        {product.type
                          ?.replaceAll("-", " ")
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
                  </motion.div>
                  </Link>

                );
              })}

            </div>
            )}

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}

export default Rings;