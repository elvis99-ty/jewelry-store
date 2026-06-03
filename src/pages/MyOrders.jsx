import { useEffect, useState } from "react";

// Importing your global constant components
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";

function MyOrdersPage() {
  // Set to true later when implementing active dynamic order lists
  const [hasOrders, setHasOrders] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col justify-between select-none">
      
      {/* Global Constant Navbar */}
      <Navbar />

      {/* 
        MAIN CONTENT CONTAINER FRAME
        Using an exact min-height layout container so it pushes the footer down 
        and vertically centers everything beautifully exactly like image_84065c.png
      */}
      <main 
        className="flex-grow w-full flex flex-col justify-center items-center text-center px-4"
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        
        {!hasOrders ? (
          /* =========================================================================
             EMPTY STATE: 1:1 Match of the beautiful Cart Page (image_84065c.png)
             ========================================================================= */
          <div className="w-full flex flex-col items-center justify-center animate-fade-in">
            
            {/* 
              Exact Custom Luxury Bag SVG 
              Recreates the exact clean trapezoid shape and top arch handle from image_84065c.png
            */}
            <div className="text-[#c5bbb2] flex items-center justify-center" style={{ marginBottom: "32px" }}>
              <svg 
                width="84" 
                height="84" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.0" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                {/* Arched top handle */}
                <path d="M16 10a4 4 0 0 0-8 0" />
                {/* Elegant trapezoid base body */}
                <path d="M6 21h12a2 2 0 0 0 2-1.7l1.2-10A2 2 0 0 0 19.2 7H4.8a2 2 0 0 0-2 2.3l1.2 10A2 2 0 0 0 6 21z" />
              </svg>
            </div>

            {/* Premium Center-Aligned Title Typography */}
            <h2 
              className="text-[#1a1a1a]"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif", 
                fontWeight: 400, 
                fontSize: "42px", 
                marginBottom: "20px",
                letterSpacing: "0.2px"
              }}
            >
              Your Order History is Empty
            </h2>
            
            {/* Descriptive Context Subtitle */}
            <p 
              className="text-[#888179] text-[16px] font-light tracking-wide mb-10" 
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              Discover beautiful pieces from our collection
            </p>

            {/* Beautiful, elongated luxury pill shape button matching image_84065c.png */}
            <button 
              className="inline-flex items-center justify-center text-white transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
              style={{ 
                backgroundColor: "#cca469",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "15px",
                fontWeight: "400",
                height: "54px",
                paddingLeft: "48px",
                paddingRight: "48px",
                marginTop: "20px",
                borderRadius: "9999px" // Perfect elegant rounded pill shape
              }}
            >
              Start Shopping
            </button>

          </div>
        ) : (
          /* =========================================================================
             ACTIVE ORDERS VIEW PORT: Ready for dynamic state activation later
             ========================================================================= */
          <div className="w-full max-w-[1180px] mx-auto px-8 lg:px-12 flex flex-col items-start text-left pt-[140px] pb-[60px]">
            <h2 
              className="text-[#1a1a1a] leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: "42px", marginBottom: "32px" }}
            >
              My Orders
            </h2>
            {/* Your dynamic orders listing maps loop cleanly inside here */}
          </div>
        )}

      </main>

      {/* Global Constant Footer */}
      <Footer />

    </div>
  );
}

export default MyOrdersPage;