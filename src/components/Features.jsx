function Features() {
  return (

    <section className="w-full min-h-[280px] bg-[#f8f6f2] border-t border-[#ece7de] flex items-center">

      {/* Main Container */}
      <div className="max-w-[1250px] mx-auto w-full px-10">

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Item 1 */}
          <div className="flex flex-col items-center text-center">

            {/* Icon */}
            <div className="w-[48px] h-[48px] rounded-full bg-[#f1ebe1] flex items-center justify-center mb-4">

              <span className="text-[#c9951a] text-[15px]">
                ♢
              </span>

            </div>

            {/* Title */}
            <h3 className="text-[15px] text-[#1b1b1b] mb-2 font-light">

              Authentic Quality

            </h3>

            {/* Text */}
            <p className="text-[13px] text-[#7c7c7c] leading-[24px]">

              Certified genuine materials

            </p>

          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center text-center">

            <div className="w-[48px] h-[48px] rounded-full bg-[#f1ebe1] flex items-center justify-center mb-4">

              <span className="text-[#c9951a] text-[14px]">
                ⛟
              </span>

            </div>

            <h3 className="text-[15px] text-[#1b1b1b] mb-2 font-light">

              Free Shipping

            </h3>

            <p className="text-[13px] text-[#7c7c7c] leading-[24px]">

              On orders over $500

            </p>

          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center text-center">

            <div className="w-[48px] h-[48px] rounded-full bg-[#f1ebe1] flex items-center justify-center mb-4">

              <span className="text-[#c9951a] text-[14px]">
                ↺
              </span>

            </div>

            <h3 className="text-[15px] text-[#1b1b1b] mb-2 font-light">

              Easy Returns

            </h3>

            <p className="text-[13px] text-[#7c7c7c] leading-[24px]">

              30-day return policy

            </p>

          </div>

          {/* Item 4 */}
          <div className="flex flex-col items-center text-center">

            <div className="w-[48px] h-[48px] rounded-full bg-[#f1ebe1] flex items-center justify-center mb-4">

              <span className="text-[#c9951a] text-[14px]">
                ⛨
              </span>

            </div>

            <h3 className="text-[15px] text-[#1b1b1b] mb-2 font-light">

              Secure Payment

            </h3>

            <p className="text-[13px] text-[#7c7c7c] leading-[24px]">

              Safe & encrypted checkout

            </p>

          </div>

        </div>

      </div>

    </section>

  )
}

export default Features