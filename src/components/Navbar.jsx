import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/LOGO.jpeg";
import { useCart } from "../context/CartContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Rings", path: "/rings" },
  { name: "Necklace", path: "/necklace" },
  { name: "Bracelets", path: "/bracelets" },
  { name: "Earrings", path: "/earrings" },
  { name: "Jewelry Set", path: "/jewelryset" },
  { name: "My Orders", path: "/myorders" },
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Close drawer on route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key and desktop breakpoint resize
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.toLowerCase().startsWith(path.toLowerCase());
  };

  return (
    <>
      {/* Top Navigation Bar: Grand Height, Big Visible Logo, Responsive Across All Screens */}
      <header className="sticky top-0 z-40 w-full bg-[#fdfcfc]/98 backdrop-blur-md border-b border-[#f0ede6] shadow-[0_2px_15px_rgba(0,0,0,0.04)] font-['Poppins',sans-serif] transition-all">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 flex items-center justify-between">
          
          {/* Brand Logo: Big, Bold, Majestic */}
          <div className="flex items-center shrink-0">
            <Link to="/" className="flex items-center group py-1" aria-label="Royal Rings Home">
              <img
                src={logo}
                alt="Royal Rings"
                className="h-14 sm:h-16 lg:h-20 xl:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links (>= 1024px / lg) */}
          <nav className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center gap-6 xl:gap-8 2xl:gap-10 text-[13px] xl:text-[14px] uppercase tracking-[0.18em] font-medium whitespace-nowrap">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative py-2 transition-colors duration-200 ${
                      active
                        ? "text-[#C89B2C] font-semibold"
                        : "text-[#4a4540] hover:text-[#C89B2C]"
                    }`}
                  >
                    {link.name}
                    {active && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#C89B2C] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Actions: Cart with Badge + Animated Luxury Hamburger */}
          <div className="flex items-center gap-4 sm:gap-6 shrink-0">
            
            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-full text-[#161311] hover:text-[#C89B2C] hover:bg-black/5 transition-all"
              aria-label={`Shopping cart with ${cartCount} items`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 sm:w-7 sm:h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V7.875a3.75 3.75 0 10-7.5 0V10.5m-3 0h13.5l-.825 8.25a1.5 1.5 0 01-1.492 1.35H7.567a1.5 1.5 0 01-1.492-1.35L5.25 10.5z"
                />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C89B2C] text-white text-[10px] sm:text-[11px] font-bold min-w-[20px] h-[20px] rounded-full flex items-center justify-center px-1 shadow-md animate-in zoom-in-75">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Custom Animated Luxury Hamburger Button (< 1024px / lg:hidden) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative p-2 rounded-xl text-[#161311] hover:bg-black/5 transition-colors focus:outline-none flex flex-col justify-center items-center gap-1.5 w-11 h-11"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-[2.5px] w-6 bg-[#161311] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2 bg-[#C89B2C]" : ""
                }`}
              />
              <span
                className={`block h-[2.5px] w-6 bg-[#161311] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2.5px] w-6 bg-[#161311] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-[#C89B2C]" : ""
                }`}
              />
            </button>
          </div>

        </div>
      </header>

      {/* World-Class Teleported Boutique Mobile Drawer */}
      {isMobileMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[999999] lg:hidden font-['Poppins',sans-serif]">
            {/* Dark Velvet Dimmed Backdrop */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Full-Height Right Slide-Over Showcase Drawer */}
            <div className="fixed top-0 right-0 bottom-0 w-[84%] sm:w-[380px] max-w-[420px] bg-[#fdfcfc] h-screen shadow-[-15px_0_35px_rgba(0,0,0,0.18)] z-[1000000] flex flex-col justify-between overflow-y-auto border-l border-[#f0ede6]">
              
              <div>
                {/* Drawer Top Bar: Brand Logo + Close Button */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-[#f0ede6]">
                  <img
                    src={logo}
                    alt="Royal Rings"
                    className="h-11 sm:h-13 w-auto object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full text-[#161311] hover:text-[#C89B2C] hover:bg-black/5 transition-colors focus:outline-none"
                    aria-label="Close menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.4}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Section Header */}
                <div className="pt-6 pb-2 px-6">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-[#9c958d] font-semibold">
                    Collections & Navigation
                  </p>
                </div>

                {/* Core Navigation Items with Generous Spacing and Gold Chevrons */}
                <div className="flex flex-col px-4">
                  {navLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-4 px-4 rounded-xl transition-all border-b border-[#f5f2eb] ${
                          active
                            ? "bg-[#faf6ee] text-[#C89B2C] font-semibold"
                            : "text-[#1a1a1a] hover:bg-[#faf8f5] hover:text-[#C89B2C] font-medium"
                        }`}
                      >
                        <span className="text-[17px] tracking-wide">{link.name}</span>
                        <span className="text-[#C89B2C] text-[20px] font-semibold leading-none">›</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Drawer Bottom Hub: Quick Action & Prominent Gold CTA */}
              <div className="p-6 border-t border-[#f0ede6] bg-[#faf8f5]/80">
                <Link
                  to="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-4 bg-[#C89B2C] hover:bg-[#b08723] active:scale-[0.98] text-white text-[15px] font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-[#C89B2C]/25 transition-all"
                >
                  <span>Explore All Pieces</span>
                  <span className="text-lg">→</span>
                </Link>

                <p className="text-center text-[11px] text-[#9c958d] mt-3 tracking-wide">
                  ✦ Handcrafted Fine Jewelry • Fast Delivery
                </p>
              </div>

            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default Navbar;