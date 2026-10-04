import { useState, useEffect, useRef } from "react";
import { Mail, ArrowLeft, RotateCw, CheckCircle2, AlertCircle, ShieldCheck, KeyRound, Loader2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { sendOtp, verifyOtp } from "../services/otpService";

function MyOrdersPage() {
  const [email, setEmail] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [step, setStep] = useState("email"); // "email" | "otp"
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(45);
  const [errorMessage, setErrorMessage] = useState("");
  const [resendSuccess, setResendSuccess] = useState(false);
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const intervalRef = useRef(null);

  // If already authenticated with orderToken, redirect to order history directly
  useEffect(() => {
    const existingToken = sessionStorage.getItem("orderToken");
    if (existingToken) {
      navigate("/myorders/history", { replace: true });
    }
  }, [navigate]);

  const stopCountdown = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startCountdown = (seconds = 45) => {
    stopCountdown();
    setTimeLeft(seconds);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopCountdown();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleResetSearch = () => {
    stopCountdown();
    setIsSearching(false);
    setTimeLeft(45);
    setStep("email");
    setOtp(["", "", "", "", "", ""]);
    setErrorMessage("");
    setResendSuccess(false);
  };

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!email.trim()) return;

    try {
      setIsSearching(true);
      setErrorMessage("");
      setResendSuccess(false);

      await sendOtp(email.trim().toLowerCase());

      setStep("otp");
      setOtp(["", "", "", "", "", ""]);
      startCountdown(45);
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ||
        "Could not send verification code. Please check your email address and try again."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0 || isSearching) return;

    try {
      setIsSearching(true);
      setErrorMessage("");
      setResendSuccess(false);

      await sendOtp(email.trim().toLowerCase());

      setOtp(["", "", "", "", "", ""]);
      setResendSuccess(true);
      startCountdown(45);
      setTimeout(() => {
        otpRefs.current[0]?.focus();
      }, 100);
      setTimeout(() => setResendSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ||
        "Unable to resend verification code. Please try again in a few moments."
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleVerifyOtp = async (overrideCode) => {
    const code = typeof overrideCode === "string" ? overrideCode : otp.join("");
    if (code.length !== 6) return;

    try {
      setIsSearching(true);
      setErrorMessage("");

      const response = await verifyOtp(email.trim().toLowerCase(), code);
      const token = response.token;

      sessionStorage.setItem("orderToken", token);
      sessionStorage.setItem("userEmail", email.trim().toLowerCase());

      // Standard e-commerce navigation: replace current history so back arrow returns to shopping
      navigate("/myorders/history", { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.message ||
        "Invalid or expired verification code. Please check your inbox or request a new one."
      );
    } finally {
      setIsSearching(false);
    }
  };

  // Clipboard paste support across all 6 inputs
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim().replace(/\D/g, "").slice(0, 6);
    if (!pasteData) return;

    const newOtp = pasteData.split("");
    while (newOtp.length < 6) newOtp.push("");
    setOtp(newOtp);

    if (pasteData.length === 6) {
      otpRefs.current[5]?.focus();
      handleVerifyOtp(pasteData);
    } else {
      otpRefs.current[pasteData.length]?.focus();
    }
  };

  const handleOtpInput = (index, val) => {
    const clean = val.replace(/\D/g, "");
    if (!clean) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }

    const lastChar = clean[clean.length - 1];
    const newOtp = [...otp];
    newOtp[index] = lastChar;
    setOtp(newOtp);

    if (index < 5) {
      otpRefs.current[index + 1]?.focus();
    } else {
      // If 6th digit entered and full
      if (newOtp.join("").length === 6) {
        handleVerifyOtp(newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        otpRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  useEffect(() => {
    return () => stopCountdown();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FCFBF9] text-[#1A1A1A] flex flex-col justify-between font-['Plus_Jakarta_Sans',sans-serif]">
      <Navbar />

      <main 
        className="flex-grow w-full flex flex-col justify-center items-center text-center px-6 py-14"
        style={{ minHeight: "calc(100vh - 140px)" }}
      >
        <div className="w-full max-w-[560px] mx-auto flex flex-col items-center">
          
          {step === "email" ? (
            /* ================= VIEW 1: EMAIL ENTRY FORM ================= */
            <div className="w-full flex flex-col items-center transition-all duration-300">
              
              <span className="uppercase tracking-[0.35em] text-[#C89B2C] text-[11px] mb-4 font-semibold">
                ROYAL RINGS ARCHIVES
              </span>

              <h1 
                className="text-[#1A1A1A] mb-3 tracking-tight"
                style={{ 
                  fontFamily: "'Cormorant Garamond', serif", 
                  fontWeight: 400, 
                  fontSize: "48px", 
                  lineHeight: "1.1"
                }}
              >
                Track Your Orders
              </h1>

              <p className="text-[#78716C] text-[15px] font-normal leading-relaxed mb-8 max-w-sm">
                Enter the email address used during purchase. We will send a secure 6-digit access code to view your orders.
              </p>

              {errorMessage && (
                <div className="w-full mb-6 p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-sm flex items-start gap-3 text-left">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5 text-[#DC2626]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSearch} className="w-full flex flex-col gap-4">
                <div className="relative w-full">
                  <Mail
                    size={18}
                    strokeWidth={1.6}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#A89F91] pointer-events-none z-10"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) setErrorMessage("");
                    }}
                    required
                    style={{ paddingLeft: "52px" }}
                    className="
                      w-full h-[54px] rounded-xl border border-[#E7E2DA] bg-white pr-5 text-left text-[14px] text-[#1A1A1A] 
                      placeholder:text-[#B0A79B] placeholder:font-light outline-none focus:border-[#C89B2C] focus:ring-2 focus:ring-[#C89B2C]/10 transition-all duration-300
                    "
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearching || !email.trim()}
                  className="
                    w-full h-[52px] rounded-xl bg-[#C89B2C] text-white font-medium text-[14px] tracking-wide 
                    transition-all duration-200 hover:bg-[#B58B24] active:scale-[0.99] flex items-center justify-center gap-2 shadow-sm
                    disabled:opacity-60 disabled:cursor-not-allowed
                  "
                >
                  {isSearching ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending Verification Code...</span>
                    </>
                  ) : (
                    <span>CONTINUE SECURELY</span>
                  )}
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#A8A29E]">
                <ShieldCheck size={14} className="text-[#C89B2C]" />
                <span>Protected by Royal Rings encrypted verification</span>
              </div>
            </div>

          ) : (

            /* ================= VIEW 2: OTP VERIFICATION VIEW ================= */
            <div className="w-full flex justify-center transition-all duration-300">
              <div className="w-full bg-white rounded-[28px] border border-[#EFEAE4] shadow-[0_16px_45px_rgba(0,0,0,0.04)] px-8 sm:px-12 py-10">
                
                {/* Header Icon */}
                <div className="flex justify-center mb-5">
                  <div className="w-16 h-16 rounded-2xl border border-[#E8DDBE] bg-[#FDFBF7] flex items-center justify-center text-[#C89B2C] shadow-sm">
                    <KeyRound size={28} strokeWidth={1.5} />
                  </div>
                </div>

                {/* Heading */}
                <h2
                  className="text-center text-[#1A1A1A]"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "42px",
                    fontWeight: 400,
                    lineHeight: 1.15,
                  }}
                >
                  Enter Verification Code
                </h2>

                {/* Subtitle / Email pill */}
                <div className="flex flex-col items-center justify-center mt-3 mb-6">
                  <p className="text-[#78716C] text-[14px]">
                    We sent a 6-digit access code to
                  </p>
                  <div className="inline-flex items-center gap-2 mt-1 px-3 py-1 bg-[#FAF6EE] border border-[#EADBBE] rounded-full text-xs font-semibold text-[#1A1A1A]">
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={handleResetSearch}
                      className="text-[#C89B2C] hover:underline font-medium text-[11px] ml-1"
                      title="Use a different email"
                    >
                      (Edit)
                    </button>
                  </div>
                </div>

                {/* Feedback Alerts */}
                {errorMessage && (
                  <div className="w-full mb-6 p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs sm:text-sm flex items-start gap-2.5 text-left">
                    <AlertCircle size={17} className="flex-shrink-0 mt-0.5 text-[#DC2626]" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {resendSuccess && (
                  <div className="w-full mb-6 p-3.5 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-[#166534] text-xs sm:text-sm flex items-center gap-2 text-left">
                    <CheckCircle2 size={17} className="flex-shrink-0 text-[#16A34A]" />
                    <span>A fresh verification code has been sent to your inbox.</span>
                  </div>
                )}

                {/* OTP 6-Box Grid */}
                <div className="flex justify-center gap-2.5 sm:gap-3.5 mb-8">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (otpRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onPaste={handlePaste}
                      onChange={(e) => handleOtpInput(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="
                        w-[46px] h-[54px] sm:w-[56px] sm:h-[62px]
                        rounded-xl
                        border border-[#E2D9CC]
                        bg-[#FCFBF9]
                        text-center
                        text-xl sm:text-2xl
                        font-semibold
                        text-[#1A1A1A]
                        outline-none
                        transition-all duration-200
                        focus:border-[#C89B2C] focus:bg-white focus:ring-4 focus:ring-[#C89B2C]/10
                      "
                    />
                  ))}
                </div>

                {/* Primary Verify Action */}
                <button
                  type="button"
                  onClick={() => handleVerifyOtp()}
                  disabled={isSearching || otp.join("").length !== 6}
                  className="
                    w-full
                    h-[54px]
                    rounded-xl
                    bg-[#C89B2C]
                    text-white
                    text-[15px]
                    font-semibold
                    tracking-wide
                    transition-all
                    hover:bg-[#B88A23]
                    active:scale-[0.99]
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    flex items-center justify-center gap-2
                    shadow-sm
                  "
                >
                  {isSearching ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Verifying Code...</span>
                    </>
                  ) : (
                    <span>VIEW ORDER HISTORY</span>
                  )}
                </button>

                {/* Resend & Back Section */}
                <div className="mt-8 pt-6 border-t border-[#F2ECE3] flex flex-col items-center gap-3">
                  <div className="flex items-center gap-2 text-[14px] text-[#78716C]">
                    <span>Didn't receive the email?</span>
                    {timeLeft > 0 ? (
                      <span className="text-[#A8A29E] font-medium text-xs">
                        Resend in <strong className="text-[#1A1A1A]">{timeLeft}s</strong>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isSearching}
                        className="text-[#C89B2C] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw size={13} />
                        Resend Code
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleResetSearch}
                    className="text-xs text-[#8C827A] hover:text-[#1A1A1A] inline-flex items-center gap-1.5 transition-colors mt-2"
                  >
                    <ArrowLeft size={13} />
                    Use a different email address
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MyOrdersPage;
