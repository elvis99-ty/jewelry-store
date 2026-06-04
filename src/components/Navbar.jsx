import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/images/LOGO.jpeg"

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#fdfcfc] py-5 md:px-12 md:py-14 flex items-center justify-between md:justify-start">

      {/* Logo Container */}
      <div className="w-[120px] md:w-[175px] flex justify-start md:justify-end pl-6 md:pl-0">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="w-full md:w-50 h-auto object-contain"
          />
        </Link>
      </div>

      {/* Nav Links - Desktop only (Hidden on mobile) */}
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

      {/* Desktop Cart Icon Container (Hidden on mobile) */}
      <div className="hidden md:flex w-[80px] justify-start">
        <Link to="/cart">
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
        </Link>
      </div>

      {/* Mobile Right Icons Group */}
      {/* Changing mr-8 to mr-12 or mr-16 will push the icons further left */}
      <div className="flex items-center gap-6 md:hidden mr-8">
        {/* Mobile Cart */}
        <Link to="/cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-6 h-6 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V7.875a3.75 3.75 0 10-7.5 0V10.5m-3 0h13.5l-.825 8.25a1.5 1.5 0 01-1.492 1.35H7.567a1.5 1.5 0 01-1.492-1.35L5.25 10.5z"
            />
          </svg>
        </Link>

        {/* Hamburger Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="text-black focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Full Overlay Mobile Menu Side-Drawer */}
      <div 
        className={`fixed inset-0 z-50 bg-[#fdfcfc] transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-full py-5 flex items-center justify-between">
          <div className="w-[120px] pl-6">
            <img src={logo} alt="Logo" className="w-full h-auto object-contain" />
          </div>

          {/* Matches the same left margin setting as the outer bar header structure */}
          <div className="flex items-center gap-6 mr-8">
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V7.875a3.75 3.75 0 10-7.5 0V10.5m-3 0h13.5l-.825 8.25a1.5 1.5 0 01-1.492 1.35H7.567a1.5 1.5 0 01-1.492-1.35L5.25 10.5z"
                />
              </svg>
            </Link>

            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-9 px-8 pt-14 text-[14px] uppercase tracking-widest text-[#6b6b6b]">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition duration-200">HOME</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition duration-200">SHOP</Link>
          <Link to="/rings" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition duration-200">RINGS</Link>
          <Link to="/necklace" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition duration-200">CHAINS</Link>
          <Link to="/bracelets" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition duration-200">BRACELETS</Link>
           <Link to="/earrings" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition duration-200">EAR RINGS</Link>
          <Link to="/myorders" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-[#d4af37] transition duration-200">MY ORDERS</Link>
        </div>
      </div>

    </nav>
  )
}

export default Navbar