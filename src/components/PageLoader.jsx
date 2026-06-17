import { motion } from "framer-motion";

function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#fdfcfc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999
      }}
    >
      <motion.div
        animate={{
          rotate: 360
        }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear"
        }}
        style={{
          width: "50px",
          height: "50px",
          border: "3px solid #e7e1d8",
          borderTop: "3px solid #cfa76e",
          borderRadius: "50%"
        }}
      />
    </motion.div>
  );
}

export default PageLoader;