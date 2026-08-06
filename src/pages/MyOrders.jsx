import { useState, useEffect, useRef } from "react";
import { Mail, PackageX, Search, Clock, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../services/otpService";
import { getMyOrders } from "../services/orderService";

function MyOrdersPage() {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [foundOrders, setFoundOrders] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [step, setStep] = useState("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  const stopCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleResetSearch = () => {
    stopCountdown();
    setIsSearching(false);
    setFoundOrders([]);
    setTimeLeft(45);
    setStep("email");
    setOtp(["", "", "", "", "", ""]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setIsSearching(true);
      stopCountdown();

      const response = await sendOtp(email);
      console.log(response);

      // Trigger countdown timer
      setTimeLeft(45);
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleResetSearch();
            return 45;
          }
          return prev - 1;
        });
      }, 1000);
      setStep("otp");

    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleVerifyOtp = async () => {

  const code = otp.join("");

  if (code.length !== 6) return;

  try {

    setIsSearching(true);

    const response = await verifyOtp(email, code);

const token = response.token;

sessionStorage.setItem("orderToken", token);

navigate("/myorders/history");

  } catch (err) {

    console.error(err);

    alert(
      err.response?.data?.message ||
      "Invalid verification code."
    );

  } finally {

    setIsSearching(false);

  }

};

  useEffect(() => {
    return () => stopCountdown();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FCFBF9] text-[#1A1A1A] flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />

      <main 
        className="flex-grow w-full flex flex-col justify-center items-center text-center px-6 py-12"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <div className="w-full max-w-[500px] mx-auto flex flex-col items-center">
          
          {/* Conditional View Rendering */}
          {isSearching ? (
            /* ================= LOADING STATE ================= */
            <div className="w-full flex flex-col items-center py-16 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EFEAE4] flex items-center justify-center mb-5 text-[#C89B2C]">
                <Loader2 size={26} className="animate-spin" />
              </div>
              <h2 
                className="text-[#1A1A1A] text-2xl font-normal mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
               Sending Your Verification Code
              </h2>
              <p className="text-[#888077] text-sm font-normal">
                Searching account for <span className="text-[#1A1A1A] font-medium">{email}</span>...
              </p>
            </div>
          ) : step === "email" ? (
            /* ================= VIEW 1: DEFAULT SEARCH FORM ================= */
            <div className="w-full flex flex-col items-center transition-all duration-500 animate-fade-in">
              
              <span className="uppercase tracking-[0.35em] text-[#C89B2C] text-[11px] mb-6 font-semibold">
                FIND YOUR ORDERS
              </span>

              <h1 
                className="text-[#1A1A1A] mb-3 tracking-tight"
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontWeight: 400, 
                  fontSize: "44px", 
                  lineHeight: "1.1"
                }}
              >
                Find Your Orders
              </h1>

              <p className="text-[#888077] text-[14px] font-normal leading-relaxed mb-8 max-w-xs">
                Enter the email used during checkout to securely access your order history and tracking information.
              </p>

              <form onSubmit={handleSearch} className="w-full flex flex-col gap-4">
                <div className="relative w-full">
                  <Mail
                    size={18}
                    strokeWidth={1.6}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A89F91] pointer-events-none z-10"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ paddingLeft: "52px" }}
                    className="
                      w-full h-[52px] rounded-xl border border-[#E7E2DA] bg-white pr-5 text-left text-[14px] text-[#1A1A1A] 
                      placeholder:text-[#B0A79B] placeholder:font-light outline-none focus:border-[#C89B2C] focus:ring-2 focus:ring-[#C89B2C]/10 transition-all duration-300
                    "
                  />
                </div>

                <button
                  type="submit"
                  className="
                    w-full h-[50px] rounded-xl bg-[#C89B2C] text-white font-medium text-[14px] tracking-wide 
                    transition-all duration-200 hover:bg-[#B58B24] active:scale-[0.99] flex items-center justify-center shadow-sm
                  "
                >
                  CONTINUE
                </button>
              </form>
            </div>

            ) : step === "otp" ? (

<div className="w-full flex justify-center animate-fade-in">

  <div className="w-full max-w-[650px] bg-white rounded-[28px] border border-[#EFEAE4] shadow-[0_12px_40px_rgba(0,0,0,0.05)] px-10 py-12">

    {/* Success Icon */}
    <div className="flex justify-center mb-6">

      <div className="relative">

        <div className="w-20 h-20 rounded-full border border-[#E8DDBE] bg-[#FDFBF7] flex items-center justify-center">

          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#C89B2C"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>

        </div>

      </div>

    </div>

    {/* Heading */}

    <h2
      className="text-center text-[#1A1A1A]"
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "54px",
        fontWeight: 400,
        lineHeight: 1,
      }}
    >
      Check Your Email
    </h2>

    {/* Gold Divider */}

    <div className="flex justify-center items-center mt-6 mb-8">

      <div className="w-16 h-px bg-[#E7D4A0]" />

      <div className="w-2 h-2 rounded-full bg-[#C89B2C] mx-3" />

      <div className="w-16 h-px bg-[#E7D4A0]" />

    </div>

    {/* Text */}

    <p className="text-center text-[#7E776F] text-[17px] leading-8">

      We've sent a secure verification code to

      <br />

      <span className="text-[#1A1A1A] font-semibold">

        {email}

      </span>

    </p>

    <p className="text-center text-[#A49C93] text-[15px] mt-3 mb-10">

      Enter the 6-digit code below to continue.

    </p>

    {/* OTP */}

    <div className="flex justify-center gap-4 mb-10">

      {otp.map((digit, index) => (

        <input
          key={index}
          ref={(el) => (otpRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, "");

            const newOtp = [...otp];
            newOtp[index] = value;

            setOtp(newOtp);

            if (value && index < 5) {
              otpRefs.current[index + 1]?.focus();
            }
          }}
          onKeyDown={(e) => {
            if (
              e.key === "Backspace" &&
              !otp[index] &&
              index > 0
            ) {
              otpRefs.current[index - 1]?.focus();
            }
          }}
          className="
            w-[56px]
            h-[56px]
            rounded-xl
            border
            border-[#E9E3DA]
            bg-[#FCFBF9]
            text-center
            text-2xl
            font-semibold
            text-[#1A1A1A]
            outline-none
            transition-all
            duration-200
            focus:border-[#C89B2C]
            focus:ring-4
            focus:ring-[#C89B2C]/10
          "
        />

      ))}

    </div>

    {/* Verify */}

    <button
      onClick={handleVerifyOtp}
      disabled={otp.join("").length !== 6}
      className="
        w-full
        h-[58px]
        rounded-2xl
        bg-[#C89B2C]
        text-white
        text-[15px]
        font-semibold
        transition-all
        hover:bg-[#B88A23]
        disabled:opacity-40
        disabled:cursor-not-allowed
      "
    >

      Verify Code

    </button>

    {/* Divider */}

    <div className="flex items-center my-10">

      <div className="flex-1 h-px bg-[#F1ECE5]" />

      <span className="mx-4 text-[#B5ACA2] text-sm">

        or

      </span>

      <div className="flex-1 h-px bg-[#F1ECE5]" />

    </div>

    {/* Resend */}

    <div className="text-center">

      <p className="text-[#888077]">

        Didn't receive the code?

      </p>

      <button
        className="mt-2 text-[#C89B2C] font-medium hover:underline"
      >

        Resend Code

      </button>

      <p className="mt-2 text-[13px] text-[#AAA39A]">

        Available in {timeLeft}s

      </p>

    </div>

  </div>

</div>

            ) : (
            /* ================= VIEW 2: SEARCH RESPONSE CARD ================= */
            <div className="w-full flex flex-col items-center transition-all duration-500 animate-fade-in">
              
              <div className="mb-8">
                <span className="uppercase tracking-[0.35em] text-[#C89B2C] text-[11px] font-semibold">
                  ROYAL RINGS
                </span>
              </div>

              {foundOrders.length > 0 ? (
                /* ORDERS FOUND RESPONSE */
                <div className="w-full min-h-[460px] p-8 rounded-[24px] bg-white border border-[#EFEAE4] flex flex-col justify-between text-left shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                  <div>
                    <h2 
                      className="text-[#1A1A1A] text-2xl text-center mb-1"
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    >
                      Your Purchase History
                    </h2>
                    <p className="text-[#888077] text-[11px] uppercase tracking-widest text-center mb-6">
                      Showing results for <span className="text-[#1A1A1A] font-semibold">{email}</span>
                    </p>

                    <div className="flex flex-col gap-4">
                      {foundOrders.map((order, idx) => (
                        <div 
                          key={order.id || idx}
                          className="p-4 rounded-xl bg-[#FCFBF9] border border-[#E7E2DA] flex flex-col gap-2"
                        >
                          <div className="flex justify-between items-center pb-2 border-b border-[#EFEAE4]">
                            <div>
                              <p className="text-[10px] uppercase tracking-wider text-[#A89F91] font-semibold">Order ID</p>
                              <p className="text-xs font-medium text-[#1A1A1A]">#{order.id || order.orderId || "100" + idx}</p>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-white text-[#C89B2C] border border-[#E7E2DA]">
                              {order.status || "Processing"}
                            </span>
                          </div>

                          <div className="flex justify-between items-center text-xs">
                            <span className="text-[#888077]">Total</span>
                            <span className="font-semibold text-[#1A1A1A]">${order.total || order.amount || "0.00"}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleResetSearch}
                    className="mt-6 text-xs font-medium text-[#A89F91] hover:text-[#C89B2C] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Search size={13} /> Search a different email address
                  </button>
                </div>
              ) : (
                /* NO ORDERS FOUND: TALLER CARD WITH INTERNAL SPACING */
                <div className="w-full min-h-[460px] px-8 pt-12 pb-8 rounded-[24px] bg-white border border-[#EFEAE4] flex flex-col justify-between items-center text-center shadow-[0_6px_25px_rgba(0,0,0,0.03)]">
                  
                  <div className="flex flex-col items-center w-full">
                    {/* Icon Badge sitting clearly below the border line */}
                    <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#EFEAE4] flex items-center justify-center mb-6 text-[#C89B2C]">
                      <PackageX size={28} strokeWidth={1.3} />
                    </div>

                    {/* Title */}
                    <h2 
                      className="text-[#1A1A1A] font-normal mb-4 tracking-tight"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "34px", lineHeight: "1.1" }}
                    >
                      No Orders Found
                    </h2>
                    
                    {/* Paragraph */}
                    <p className="text-[#888077] text-[14px] font-normal mb-8 max-w-sm leading-relaxed px-2">
                      We couldn't find any purchases associated with <span className="font-semibold text-[#1A1A1A]">{email}</span>. Please double-check your spelling or search using another email.
                    </p>

                    {/* Button */}
                    <button
                      onClick={handleResetSearch}
                      className="
                        h-[42px] px-7 rounded-lg bg-[#C89B2C] text-white text-[11px] font-medium tracking-[0.1em] uppercase
                        hover:bg-[#B58B24] transition-all duration-200 flex items-center justify-center gap-2 shadow-sm
                        active:scale-[0.98]
                      "
                    >
                      <Search size={13} />
                      Try Another Email
                    </button>
                  </div>

                  {/* Countdown Footer */}
                  <div className="pt-4 border-t border-[#F7F4EF] w-full flex items-center justify-center mt-6">
                    <p className="text-[11px] text-[#A89F91] flex items-center gap-1.5 font-medium tracking-wide">
                      <Clock size={12} className="text-[#C89B2C]" /> 
                      Auto-resetting in <span className="text-[#1A1A1A] font-semibold">{timeLeft}s</span>
                    </p>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyOrdersPage;