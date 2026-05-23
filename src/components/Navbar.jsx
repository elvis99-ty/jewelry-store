import { Link } from "react-router-dom"
import logo from "../assets/images/logo.png"

function Navbar() {
  return (
    <nav className="w-full bg-[#fdfcfc] px-12 py-6 flex items-center">

      {/* Logo */}
      <div className="w-[170px] flex justify-end">
        <Link to="/">
        <img
          src={logo}
          alt="Logo"
          className="w-22"
        />
        </Link>
      </div>

      {/* Nav Links */}
      <div className="flex-1 flex justify-center">

        <div className="flex items-center gap-12 text-[15px] uppercase tracking-wide text-[#6b6b6b] whitespace-nowrap">

          <Link to="/">HOME</Link>

          <Link to="/shop">SHOP</Link>

          <Link to="/rings">RINGS</Link>

          <Link to="/chains">CHAINS</Link>

          <Link to="/bracelets">BRACELETS</Link>

          <Link to="/myorders">MY ORDERS</Link>

        </div>

      </div>

      {/* Cart Icon */}
      <div className="w-[80px] flex justify-start">
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

    </nav>
  )
}

export default Navbar