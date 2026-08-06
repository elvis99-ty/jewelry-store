import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import products from "../data/products";
import { motion } from "framer-motion";

function FeaturedPieces() {

  const items = [...products]
  .sort(() => 0.5 - Math.random())
  .slice(0,28);

  const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95
  },

  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.7,
      delay: index * 0.03
    }
  })
};
  
  return (
    <section 
      className="w-full bg-[#f7f6f6] overflow-hidden"
      style={{ 
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        marginTop: "120px" 
      }}
    >
      <div 
        className="mx-auto w-full"
        style={{ 
          maxWidth: "1380px", 
          paddingLeft: "48px", 
          paddingRight: "48px",
          paddingTop: "60px",
          paddingBottom: "100px"
        }}
      >
        <motion.div
  className="flex items-end justify-between"
  style={{ marginBottom: "48px" }}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8 }}
>
          <div>
            <p className="uppercase tracking-[4px] text-[#cda052] text-[12px] font-semibold" style={{ marginBottom: "12px" }}>
              Curated For You
            </p>
            <h2 
              className="text-[#1a1a1a] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "46px" }}
            >
              Featured Pieces
            </h2>
          </div>
        </motion.div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full"
          style={{ 
            columnGap: "28px", 
            rowGap: "44px" 
          }}
        >
              {items.map((item, index) => (
              <motion.div
              key={item.id}
              className="group flex flex-col"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              >
              
         
              <div className="relative overflow-hidden aspect-square w-full bg-[#0d0d0d] flex items-center justify-center rounded-[20px]">
                  <motion.img
                  loading="lazy"
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  whileHover={{
                  scale: 1.08
                  }}
                  transition={{
                  duration: 0.5
                 }}
                />

                <div className="absolute left-4 right-4 bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                </div>
              </div>

              <div style={{ marginTop: "14px" }} className="pl-0.5">
                <p className="uppercase tracking-[2.5px] text-[#9c9c9c] text-[11px] font-semibold">
                  {item.category}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedPieces;