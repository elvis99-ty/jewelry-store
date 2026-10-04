import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { getProducts } from "../api/productApi";
import { motion } from "framer-motion";
import { ProductGridSkeleton } from "./LuxuryLoader";

function FeaturedPieces() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        setLoading(true);
        const fetched = await getProducts();
        const shuffled = [...fetched]
          .sort(() => 0.5 - Math.random())
          .slice(0, 28);
        setItems(shuffled);
      } catch (error) {
        console.error(error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

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
      className="w-full bg-[#f7f6f6] overflow-hidden mt-16 sm:mt-24 md:mt-[120px]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div 
        className="mx-auto w-full px-5 sm:px-8 md:px-12 py-12 md:py-20" 
        style={{ maxWidth: "1380px" }}
      >
        <motion.div
          className="flex items-end justify-between mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p className="uppercase tracking-[4px] text-[#cda052] text-[11px] sm:text-[12px] font-semibold mb-2 sm:mb-3">
              Curated For You
            </p>
            <h2 
              className="text-[#1a1a1a] leading-tight text-[32px] sm:text-[40px] md:text-[46px]"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
            >
              Featured Pieces
            </h2>
          </div>
        </motion.div>

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full gap-6 sm:gap-7 md:gap-x-7 md:gap-y-11">
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
              
         
              <div className="relative overflow-hidden aspect-square w-full bg-[#F5F2EC] flex items-center justify-center rounded-[20px]">
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
      )}

      </div>
    </section>
  );
}

export default FeaturedPieces;