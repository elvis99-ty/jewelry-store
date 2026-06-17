import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import RingS925 from "../assets/products/Wedding Rings/S925 - Black/S925-Black1.png"
import RingS925Moissanite from "../assets/products/Wedding Rings/S925 + Moissanite Stone/S925+Moissanite1.png"
import RingTitaniumSteelGold from "../assets/products/Wedding Rings/Titanium Steel - Gold/TitaniumSteelGold1.png"
import RingTitaniumSteelSilver from "../assets/products/Wedding Rings/Titanium Steel - Silver/TitaniumSteelSilver1.png"
import RingZirconia from "../assets/products/Wedding Rings/Zirconia - Black/ZirconiaBlack1.png"
import RingZirconiaStoneSilver from "../assets/products/Wedding Rings/Zirconia Stone + Silver Plated/Wedding Ring1.jpg"
import EngRingS925Moissanite from "../assets/products/Engagment or Proposal/S925 + Moissanite Stone/Engring Moiss1.jpg"
import EngRingS925Zirconia from "../assets/products/Engagment or Proposal/S925 + Zirconia Stone/Engrng Zir1.png"
import Earings from "../assets/products/Earings/Ear ring1.jpg"
import FemaleBracelets from "../assets/products/Female Bracelets/Female Brac2.jpg"
import MaleBracelets from "../assets/products/Male Bracelets/Male Bracelets2.jpg"
import JewelrySets from "../assets/products/Jewelry Sets/Jewelry Set1.jpg"
import Necklace from "../assets/products/Necklace/Necklace1.jpg"


function Collections() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cardVariants = {
  hidden: {
    opacity: 0,
    y: 60
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.05
    }
  })
};

  const styles = {
    section: {
      width: "100%",
      backgroundColor: "#fdfcfc",
      paddingTop: "100px",
      paddingBottom: "100px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      boxSizing: "border-box"
    },
    container: {
      maxWidth: "1440px",
      marginLeft: "auto",
      marginRight: "auto",
      paddingLeft: "40px",
      paddingRight: "40px",
      boxSizing: "border-box"
    },
    
    // Header Style Typography
    headerBlock: { textAlign: "center", marginBottom: "64px" },
    subTitle: {
      color: "#cfa76e",
      textTransform: "uppercase",
      letterSpacing: "6px",
      fontSize: "13px",
      fontWeight: "600",
      marginBottom: "12px",
      marginTop: 0
    },
    mainTitle: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "56px",
      color: "#111111",
      fontWeight: "400",
      margin: 0,
      lineHeight: "1.1"
    },

    // Horizontal Layout Wrapper Setup
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
      gap: "20px",
      width: "100%"
    },

    // Card Core Styling Architecture
    cardFrame: {
      position: "relative",
      aspectRatio: "3/4", // Clean, elegant vertically tall aspect footprint
      borderRadius: "20px", // Exact rounded smooth edge contour matching screenshot
      overflow: "hidden",
      cursor: "pointer",
      backgroundColor: "#f5f5f5"
    },
    imageAsset: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
    },

    // Overlay Panel holding the text copy on top of the image container
    contentOverlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.2) 40%, rgba(0, 0, 0, 0) 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "24px 20px",
      boxSizing: "border-box"
    },

    // Text Elements Styles inside image frame
    cardTitle: {
      fontFamily: "'Cormorant Garamond', serif",
      color: "#ffffff",
      fontSize: "26px",
      fontWeight: "400",
      margin: "0 0 4px 0",
      lineHeight: "1.2"
    },
    exploreGroup: {
      display: "flex",
      alignItems: "center",
      gap: "6px"
    },
    exploreText: {
      color: "#cccccc",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      fontWeight: "500",
      margin: 0
    },
    arrowIcon: {
      width: "12px",
      height: "12px",
      color: "#cccccc",
      transition: "transform 0.3s ease"
    }
  };

  // Structured Array containing all 5 items mapping perfectly to the target screenshot values
  const collectionsData = [
  {
    id: 1,
    name: "Wedding Ring S925-Black",
    src: RingS925,
    link : "/rings?subcategory=wedding-rings&type=s925-black",
  },

  {
    id: 2,
    name: "Wedding Ring S925+Moissanite Stone",
    src: RingS925Moissanite,
    link : "/rings?subcategory=wedding-rings&type=s925-moissanite-stone"
  },

  {
    id: 3,
    name: "Wedding Ring Titanium Steel Gold",
    src: RingTitaniumSteelGold,
    link : "/rings?subcategory=wedding-rings&type=titanium-steel-gold"
  },

  {
    id: 4,
    name: "Wedding Ring Titanium Steel Silver",
    src: RingTitaniumSteelSilver,
    link : "/rings?subcategory=wedding-rings&type=titanium-steel-silver"
  },

  {
    id: 5,
    name: "Wedding Ring Zirconia Black",
    src: RingZirconia,
    link : "/rings?subcategory=wedding-rings&type=zirconia-black"
  },

  {
    id: 6,
    name : "Wedding Ring Zirconia Stone Silver Plated",
    src : RingZirconiaStoneSilver,
    link : "/rings?subcategory=wedding-rings&type=zirconia-silver-plated"
  },

  {
    id : 7,
    name : "Engagement Ring S925 Moissanite Stone",
    src : EngRingS925Moissanite,
    link : "/rings?subcategory=wedding-rings&type=moissanite-stone"
  },

  {
    id : 8,
    name : "Engagement Ring S925 Zirconia Stone",
    src : EngRingS925Zirconia,
    link : "/rings?subcategory=wedding-rings&type=s925-zirconia-stone"
  },

  {
    id : 9,
    name : "Ear Rings",
    src : Earings,
    link : "/earrings"
  },

  {
    id : 10,
    name : "Female Bracelets",
    src : FemaleBracelets,
    link : "/bracelets?type=female"
  },

  {
    id : 11,
    name : "Male Bracelets",
    src : MaleBracelets,
    link : "/bracelets?type=male",
  },

  {
    id : 12,
    name : "Jewelry Set",
    src : JewelrySets,
    link : "/jewelryset"
  },

  {
    id : 13,
    name : "Necklace",
    src : Necklace,
    link : "/necklace"
  }
];

const [shuffledCollections] = useState(() => {
  return [...collectionsData].sort(() => Math.random() - 0.5)
});

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        
        {/* HEADER */}
        <div style={styles.headerBlock}>
          <p style={styles.subTitle}>Browse By</p>
          <h2 style={styles.mainTitle}>Our Collections</h2>
        </div>

                {/* COLLECTIONS ITEM RENDER ENGINE */}
        <div style={styles.gridContainer}>
          {shuffledCollections.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <Link
                key={item.id}
                to={item.link || "/"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block"
                }}
              >
                <motion.div
                style={styles.cardFrame}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* BACKGROUND IMAGE WITH ZOOM EFFECT */}
                  <img
                  loading="lazy"
                    src={item.src}
                    alt={item.name}
                    style={{
                      ...styles.imageAsset,
                      transform: isHovered
                        ? "scale(1.04)"
                        : "scale(1)"
                    }}
                    onError={(e) => {
                      e.target.style.opacity = "0.15";
                    }}
                  />

                  {/* THE INSIDE TEXT OVERLAY PANEL */}
                  <div style={styles.contentOverlay}>
                    <h3 style={styles.cardTitle}>
                      {item.name}
                    </h3>

                    <div style={styles.exploreGroup}>
                      <p style={styles.exploreText}>
                        Explore
                      </p>

                      <svg
                        style={{
                          ...styles.arrowIcon,
                          transform: isHovered
                            ? "translateX(4px)"
                            : "translateX(0px)"
                        }}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Collections;