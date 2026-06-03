import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import logo from "../assets/images/Logoo.jpeg"; 

function Footer() {
  return (
    <footer 
      className="w-full bg-[#131421] text-white mt-[120px]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Centered Alignment Main Stage Box Frame Wrapper */}
      <div 
        className="mx-auto w-full" 
        style={{ maxWidth: "1380px", paddingLeft: "48px", paddingRight: "48px", paddingTop:"50px", paddingBottom: "20px" }}
      >
        {/* 3 Column Grid Stack - Formatted for Perfect Brand Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10 items-start">
          
          {/* LEFT COLUMN: Brand Manifesto Identity block */}
          <div className="flex flex-col items-start">
            {/* Fixed Logo rendering by passing the imported reference object variable */}
            <Link to="/">
            <img
              src={logo}
              alt="Royal Rings Identity"
              className="w-[110px] h-auto object-contain" // Slightly adjusted width for brand visibility
              style={{ marginBottom: "24px" }}
            />
            </Link>
            <p 
              className="text-[#a39e96] text-[14px] leading-[1.85]" 
              style={{ maxWidth: "320px" }}
            >
              Crafting timeless elegance since our inception. Each piece tells a story of luxury, precision, and unparalleled beauty.
            </p>
          </div>

          {/* CENTER COLUMN: Navigation Hierarchy */}
          <div className="flex flex-col md:pl-12">
            <h3 
              className="text-[24px] text-white tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, marginBottom: "24px" }}
            >
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3.5 text-[#a39e96] text-[14px]">
              <ul className="flex flex-col gap-3.5 text-[#a39e96] text-[14px]">

  <li>
    <Link
      to="/shop"
      className="hover:text-[#cda052] transition-colors duration-200"
    >
      Shop
    </Link>
  </li>

  <li>
    <Link
      to="/rings"
      className="hover:text-[#cda052] transition-colors duration-200"
    >
      Rings
    </Link>
  </li>

  <li>
    <Link
      to="/chains"
      className="hover:text-[#cda052] transition-colors duration-200"
    >
      Chains
    </Link>
  </li>

  <li>
    <Link
      to="/bracelets"
      className="hover:text-[#cda052] transition-colors duration-200"
    >
      Bracelets
    </Link>
  </li>

  <li>
    <Link
      to="/myorders"
      className="hover:text-[#cda052] transition-colors duration-200"
    >
      My Orders
    </Link>
  </li>

</ul>
            </ul>
          </div>

          {/* RIGHT COLUMN: Contact Meta Block with Integrated Luxury Framework Icons */}
          <div className="flex flex-col">
            <h3 
              className="text-[24px] text-white tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, marginBottom: "24px" }}
            >
              Contact Us
            </h3>
            <div className="flex flex-col gap-4 text-[#a39e96] text-[14px]">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-[#cda052] shrink-0" />
                <span>+1 (234) 567-8900</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-[#cda052] shrink-0" />
                <span>info@royalrings.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={14} className="text-[#cda052] shrink-0" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

        </div>

        {/* Space Before Horizontal Divider Rule Line Block */}
        <div style={{ height: "25px" }} />

        {/* Flat Luxury Graphic Divider Grid Border */}
        <div className="w-full h-[1px] bg-[#1f1a16]" />

        {/* Bottom copyright segment row layout */}
        <div style={{ paddingTop: "24px", paddingBottom: "28px" }}>
          <p className="text-center text-[#6e6861] text-[13px] tracking-wide">
            © 2026 Royal Rings & Jewelries Limited. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;