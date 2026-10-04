import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/images/LOGO.jpeg"
import { useCart } from "../context/CartContext"

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#fdfcfc] py-5 md:px-12 md:py-14 flex items-center justify-between">

      <div className="w-[120px] md:w-[160px] flex justify-start md:justify-end pl-6 md:pl-0">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-full md:w-50 h-auto object-contain"
          />
        </Link>
      </div>
      <div className="hidden md:flex flex-1 justify-center">
        <div className="flex items-center gap-12 text-[15px] uppercase tracking-wide text-[#6b6b6b] whitespace-nowrap">
          <Link to="/" className="text-[#6b6b6b] hover:text-[#d4af37] transition duration-300">HOME</Link>
          <Link to="/shop" className="text-[#6b6b6b] hover:text-[#d4af37] transition duration-300">SHOP</Link>
          <Link to="/rings" className="text-[#6b6b6b] hover:text-[#d4af37] transition duration-300">RINGS</Link>
          <Link to="/Necklace" className="text-[#6b6b6b] hover:text-[#d4af37] transition duration-300">NECKLACE</Link>
          <Link to="/bracelets" className="text-[#6b6b6b] hover:text-[#d4af37] transition duration-300">BRACELETS</Link>
          <Link to="/earrings" className="text-[#6b6b6b] hover:text-[#d4af37] transition duration-300">EAR RINGS</Link>
          <Link to="/myorders" className="text-[#6b6b6b] hover:text-[#d4af37] transition duration-300">MY ORDERS</Link>
        </div>
      </div>
      <div className="hidden md:flex w-[80px] justify-start relative">
  <Link to="/cart" className="relative">
    
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.4}
      stroke="currentColor"
      className="w-6 h-6 text-black"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V7.875a3.75 3.75 0 10-7.5 0V10.5m-3 0h13.5l-.825 8.25a1.5 1.5 0 01-1.492 1.35H7.567a1.5 1.5 0 01-1.492-1.35L5.25 10.5z"
      />
    </svg>

    {cartCount > 0 && (
      <span
        className="
          absolute
          -top-2
          -right-3
          bg-[#cfa76e]
          text-white
          text-[11px]
          font-bold
          min-w-[18px]
          h-[18px]
          rounded-full
          flex
          items-center
          justify-center
          px-1
        "
      >
        {cartCount}
      </span>
    )}

  </Link>
</div>
      <div className="flex items-center gap-5 md:hidden pr-5">
        <Link to="/cart" className="relative p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.4}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V7.875a3.75 3.75 0 10-7.5 0V10.5m-3 0h13.5l-.825 8.25a1.5 1.5 0 01-1.492 1.35H7.567a1.5 1.5 0 01-1.492-1.35L5.25 10.5z"
            />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#cfa76e] text-white text-[10px] font-bold min-w-[16px] h-[16px] rounded-full flex items-center justify-center px-1">
              {cartCount}
            </span>
          )}
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-1 text-black focus:outline-none"
          aria-label="Open mobile menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.4}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Floating Navigation Card & Backdrop */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex justify-end items-start p-4">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Floating Compact Menu Card */}
          <div className="relative w-full max-w-[330px] bg-white rounded-2xl shadow-2xl border border-[#ede8df] z-10 overflow-hidden flex flex-col">
            {/* Header with Logo and Close button */}
            <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-[#f3efe6]">
              <div className="w-[115px]">
                <img src={logo} alt="Logo" className="w-full h-auto object-contain" />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 -mr-1 rounded-full text-[#4a4a4a] hover:text-[#cda052] hover:bg-[#faf8f5] transition-colors focus:outline-none"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Links with Chevron */}
            <div className="flex flex-col px-4 py-3 space-y-1 text-[14px] text-[#2c2c2c]">
              {[
                { name: "Home", path: "/" },
                { name: "Shop", path: "/shop" },
                { name: "Rings", path: "/rings" },
                { name: "Chains", path: "/necklace" },
                { name: "Bracelets", path: "/bracelets" },
                { name: "Ear Rings", path: "/earrings" },
                { name: "My Orders", path: "/myorders" },
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl hover:bg-[#faf7f0] hover:text-[#cda052] transition-colors font-medium"
                >
                  <span>{link.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 text-[#cda052]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Bottom Luxury Action Button */}
            <div className="p-5 pt-2">
              <Link
                to="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-3 bg-[#cda052] hover:bg-[#b88c3e] text-white text-[13px] font-semibold tracking-widest uppercase rounded-xl flex items-center justify-center transition-colors shadow-sm"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      )}

    </nav>
  )
}

export default Navbar