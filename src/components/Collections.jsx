function Collections() {
  return (

    <section className="w-full bg-[#f8f6f2] border-t border-[#ece7de]">

      {/* Main Section Container */}
      <div className="min-h-[850px] flex items-center">

        {/* Inner Container */}
        <div className="max-w-[1280px] mx-auto w-full px-10">

          {/* Heading */}
          <div className="text-center mb-24">

            <p className="text-[#c9951a] uppercase tracking-[7px] text-[12px] mb-5">

              Browse By

            </p>

            <h2 className="text-[52px] text-[#111111] font-light leading-none">

              Our Collections

            </h2>

          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="group cursor-pointer">

              {/* Image */}
              <div className="h-[430px] overflow-hidden rounded-[2px]">

                <img
                  src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1974&auto=format&fit=crop"
                  alt="Rings"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              {/* Content */}
              <div className="text-center pt-7">

                <h3 className="text-[26px] text-[#111111] font-light mb-2">

                  Rings

                </h3>

                <p className="text-[#7c7c7c] text-[14px]">

                  Luxury handcrafted rings

                </p>

              </div>

            </div>

            {/* Card 2 */}
            <div className="group cursor-pointer">

              <div className="h-[430px] overflow-hidden rounded-[2px]">

                <img
                  src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop"
                  alt="Chains"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              <div className="text-center pt-7">

                <h3 className="text-[26px] text-[#111111] font-light mb-2">

                  Chains

                </h3>

                <p className="text-[#7c7c7c] text-[14px]">

                  Elegant premium chains

                </p>

              </div>

            </div>

            {/* Card 3 */}
            <div className="group cursor-pointer">

              <div className="h-[430px] overflow-hidden rounded-[2px]">

                <img
                  src="https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=1974&auto=format&fit=crop"
                  alt="Bracelets"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />

              </div>

              <div className="text-center pt-7">

                <h3 className="text-[26px] text-[#111111] font-light mb-2">

                  Bracelets

                </h3>

                <p className="text-[#7c7c7c] text-[14px]">

                  Modern timeless bracelets

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  )
}

export default Collections