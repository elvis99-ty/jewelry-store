import { useState, useEffect } from "react";
import WeddingRing from "../assets/products/Wedding Rings/Zirconia Stone + Silver Plated/Wedding Ring1.jpg"
import Earings from "../assets/products/Earings/Ear ring1.jpg"
import EngagmentRing from "../assets/products/Engagment or Proposal/S925 + Moissanite Stone/Engring Moiss1.jpg"
import EngagmentRing2 from "../assets/products/Engagment or Proposal/S925 + Zirconia Stone/Engrng Zir17.png"
import JewelrySet from "../assets/products/Jewelry Sets/Jewelry Set1.jpg"
import Necklace from "../assets/products/Necklace/Necklace1.jpg"
import MaleBracelets from "../assets/products/Male Bracelets/Male Bracelets1.jpg"
import FemaleBracelets from "../assets/products/Female Bracelets/Female Brac1.jpg"
function Collections() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

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
    name: "Wedding Ring",
    src: WeddingRing
  },

  {
    id: 2,
    name: "Ear Rings",
    src: Earings
  },

  {
    id: 3,
    name: "Engagement Ring 1",
    src: EngagmentRing
  },

  {
    id: 4,
    name: "Engagement Ring 2",
    src: EngagmentRing2
  },

  {
    id: 5,
    name: "Jewelry Set",
    src: JewelrySet
  },

  {
    id: 6,
    name : "Necklace",
    src : Necklace
  },

  {
    id : 7,
    name : "Male Bracelets",
    src : MaleBracelets
  },
  
  {
    id : 8,
    name : "Female Bracelets",
    src : FemaleBracelets,
  }
];

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
          {collectionsData.map((item, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={item.id}
                style={styles.cardFrame}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* BACKGROUND IMAGE WITH ZOOM EFFECT */}
                <img
                  src={item.src || "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1974&auto=format&fit=crop"}
                  alt={item.name}
                  style={{
                    ...styles.imageAsset,
                    transform: isHovered ? "scale(1.04)" : "scale(1)"
                  }}
                  onError={(e) => {
                    // Generates fallback soft neutral placeholder fill if image source is empty or missing
                    e.target.style.opacity = "0.15";
                  }}
                />

                {/* THE INSIDE TEXT OVERLAY PANEL */}
                <div style={styles.contentOverlay}>
                  <h3 style={styles.cardTitle}>{item.name}</h3>
                  
                  <div style={styles.exploreGroup}>
                    <p style={styles.exploreText}>Explore</p>
                    <svg 
                      style={{
                        ...styles.arrowIcon,
                        transform: isHovered ? "translateX(4px)" : "translateX(0px)"
                      }} 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Collections;