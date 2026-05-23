function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1974&auto=format&fit=crop"
        alt="Jewelry"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">

        <div className="w-full max-w-[560px] flex flex-col items-center -mt-10">

          {/* Small Top Text */}
          <div className="flex items-center gap-3 mb-5">

            <span className="text-[#d4af37] text-[18px]">
              ✦
            </span>

            <p className="text-[#d4af37] uppercase tracking-[8px] text-[14px]">

              Handcrafted Luxury

            </p>

          </div>

          {/* Heading Block */}
          <div className="w-full leading-[0.92]">

            <h1 className="text-[88px] font-light text-white">
              Timeless
            </h1>

            <h1 className="text-[88px] italic font-light text-[#d4af37]">
              Elegance
            </h1>

            <h1 className="text-[88px] font-light text-white">
              Redefined
            </h1>

          </div>

          {/* Paragraph */}
          <div className="w-full mt-8">

            <p className="text-gray-300 text-[18px] leading-[46px] font-light">

              Discover our exquisite collection of handcrafted
              rings, chains, bracelets, and more — designed to
              make every moment unforgettable.

            </p>

          </div>

          {/* Buttons */}
          <div className="w-full flex items-center gap-5 mt-9">

            {/* Shop Collection */}
            <button className="w-[200px] h-[42px] bg-[#f59e0b] hover:bg-[#c29d2c] transition-all duration-300 rounded-full flex items-center justify-center gap-4 text-[13px] font-semibold text-black">

              Shop Collection

              <span className="text-[20px]">
                →
              </span>

            </button>

            {/* View Rings */}
            <button className="w-[200px] h-[42px] bg-[#2f2f2f]/70 hover:bg-[#3a3a3a] transition-all duration-300 rounded-full border border-gray-500 backdrop-blur-sm text-[13px] text-white">

              View Rings

            </button>

          </div>

        </div>

      </div>

    </section>
  )
}

export default Hero