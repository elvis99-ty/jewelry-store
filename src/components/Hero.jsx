import { motion } from "framer-motion"

function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">

      <img
        src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1974&auto=format&fit=crop"
        alt="Jewelry"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 flex items-center justify-center h-full px-6">

        <motion.div
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.0,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="w-full max-w-[560px] flex flex-col items-center -mt-10"
        >

          {/* Small Top Text */}
          <div className="flex items-center gap-3 mb-4 sm:mb-5">

            <span className="text-[#d4af37] text-[16px] sm:text-[18px]">
              ✦
            </span>

            <p className="text-[#d4af37] uppercase tracking-[5px] sm:tracking-[8px] text-[12px] sm:text-[14px]">

              Handcrafted Luxury

            </p>

          </div>
          <div className="w-full leading-[0.95] sm:leading-[0.92] text-center sm:text-left">

            <h1 className="text-[48px] sm:text-[68px] md:text-[88px] font-light text-white">
              Timeless
            </h1>

            <h1 className="text-[48px] sm:text-[68px] md:text-[88px] italic font-light text-[#d4af37]">
              Elegance
            </h1>

            <h1 className="text-[48px] sm:text-[68px] md:text-[88px] font-light text-white">
              Redefined
            </h1>

          </div>
          <div className="w-full mt-6 sm:mt-8 text-center sm:text-left">

            <p className="text-gray-300 text-[15px] sm:text-[18px] leading-[26px] sm:leading-[46px] font-light">

              Discover our exquisite collection of handcrafted
              rings, chains, bracelets, and more — designed to
              make every moment unforgettable.

            </p>

          </div>
          <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-3.5 sm:gap-5 mt-7 sm:mt-9">
            <button className="w-full sm:w-[200px] h-[44px] sm:h-[42px] bg-[#f59e0b] hover:bg-[#c29d2c] transition-all duration-300 rounded-full flex items-center justify-center gap-4 text-[13px] font-semibold text-black">

              Shop Collection

              <span className="text-[20px]">
                →
              </span>

            </button>
            <button className="w-full sm:w-[200px] h-[44px] sm:h-[42px] bg-[#2f2f2f]/70 hover:bg-[#3a3a3a] transition-all duration-300 rounded-full border border-gray-500 backdrop-blur-sm text-[13px] text-white">

              View Rings

            </button>

          </div>

        </motion.div>

      </div>

    </section>
  )
}

export default Hero