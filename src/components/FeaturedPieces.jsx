import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import products from "../data/products";

function FeaturedPieces() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const items = [...products]
  .sort(() => 0.5 - Math.random())
  .slice(0,16);
  
  return (
    <section 
      className="w-full bg-[#f7f6f6] overflow-hidden"
      style={{ 
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        // Force an intentional margin-top block to clear your floating header completely
        marginTop: "120px" 
      }}
    >
      {/* 
        Main Alignment Wrapper: 
        Using explicit side paddings to provide gorgeous breathing room matching your storefront view.
      */}
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

        {/* Heading Component Grid Line */}
        <div className="flex items-end justify-between" style={{ marginBottom: "48px" }}>
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

          {/* View All Action Nav */}
          <button className="flex items-center gap-2 text-[#cda052] text-[14px] font-medium tracking-wide pb-1 transition-opacity hover:opacity-80">
            View All
            <span className="text-[13px]">➔</span>
          </button>
        </div>

        {/* 16-Item Grid Container Frame */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full"
          style={{ 
            columnGap: "28px", 
            rowGap: "44px" 
          }}
        >
          {items.map((item) => (
            <div key={item.id} className="group flex flex-col">
              
              {/* Product Card Container Box Frame */}
              <div className="relative overflow-hidden aspect-square w-full bg-[#0d0d0d] flex items-center justify-center rounded-[20px]">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* Bottom Fixed Action Button Tray */}
                <div className="absolute left-4 right-4 bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <button className="w-full h-[44px] rounded-lg bg-[#cfa76e] text-white flex items-center justify-center gap-2 text-[13px] font-medium hover:bg-[#bfa065] transition-colors shadow-sm">
                    <ShoppingBag size={14} />
                    Add to Cart
                  </button>
                </div>
              </div>

              {/* Spacing and Category Label Stack */}
              <div style={{ marginTop: "14px" }} className="pl-0.5">
                <p className="uppercase tracking-[2.5px] text-[#9c9c9c] text-[11px] font-semibold">
                  {item.category}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FeaturedPieces;