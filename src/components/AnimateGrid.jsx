import { motion } from "framer-motion";

function AnimatedGrid({ children, index }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.05
      }}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedGrid;