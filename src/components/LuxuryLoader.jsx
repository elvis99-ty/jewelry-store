import { motion } from "framer-motion";
import { Gem } from "lucide-react";

export function LuxuryLoader({ message = "Curating Royal Pieces..." }) {
  return (
    <div
      style={{
        minHeight: "60vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        padding: "60px 20px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div style={{ position: "relative", width: "90px", height: "90px" }}>
        {/* Outer glowing pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.75, 0.35],
          }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: "-6px",
            borderRadius: "50%",
            border: "1.5px dashed rgba(200, 155, 44, 0.4)",
          }}
        />

        {/* Smooth rotating gold border */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: "linear",
          }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            border: "2.5px solid #F2ECE1",
            borderTopColor: "#C89B2C",
            borderRightColor: "#E2C37A",
          }}
        />

        {/* Center glowing gem diamond icon */}
        <motion.div
          animate={{
            scale: [0.92, 1.05, 0.92],
            opacity: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#C89B2C",
          }}
        >
          <Gem size={30} strokeWidth={1.75} />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          marginTop: "24px",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "24px",
          color: "#1C1917",
          letterSpacing: "0.5px",
          fontWeight: 400,
        }}
      >
        {message}
      </motion.p>

      <span
        style={{
          marginTop: "6px",
          fontSize: "11px",
          letterSpacing: "3px",
          textTransform: "uppercase",
          color: "#A89F91",
          fontWeight: 600,
        }}
      >
        Royal Rings
      </span>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "32px 24px",
        width: "100%",
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {/* Image skeleton with shimmer */}
          <div
            style={{
              aspectRatio: "1/1",
              width: "100%",
              borderRadius: "16px",
              backgroundColor: "#F4F0E8",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.6,
                ease: "easeInOut",
              }}
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.65), transparent)",
              }}
            />
          </div>

          {/* Text skeletons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div
              style={{
                width: "40%",
                height: "12px",
                borderRadius: "4px",
                backgroundColor: "#EFEAE2",
              }}
            />
            <div
              style={{
                width: "75%",
                height: "18px",
                borderRadius: "6px",
                backgroundColor: "#EFEAE2",
              }}
            />
            <div
              style={{
                width: "35%",
                height: "16px",
                borderRadius: "4px",
                backgroundColor: "#E8DEC8",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default LuxuryLoader;
