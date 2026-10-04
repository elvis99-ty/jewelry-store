import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { verifyPayment } from "../api/paymentApi";
import { ShieldCheck, CreditCard, Landmark, Smartphone } from "lucide-react";
import { useCart } from "../context/CartContext";

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  const [status, setStatus] = useState("verifying"); // "verifying" | "success" | "failed"
  const [orderInfo, setOrderInfo] = useState(null);

  useEffect(() => {
    const reference =
      searchParams.get("reference") || searchParams.get("trxref");

    if (!reference) {
      setStatus("failed");
      return;
    }

    const confirmPayment = async () => {
      try {
        const response = await verifyPayment(reference);

        if (response?.data?.status === "success") {
          setOrderInfo({
            reference: response.data.reference,
            amount: response.data.amount / 100,
          });
          setStatus("success");
          clearCart();
        } else {
          setStatus("failed");
        }
      } catch (error) {
        console.error(error);
        setStatus("failed");
      }
    };

    confirmPayment();
  }, [searchParams]);

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <Navbar />

      <main
        style={{
          backgroundColor: "#fdfcfc",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "520px",
            width: "100%",
            backgroundColor: "#fff",
            border: "1px solid #e7e1d8",
            borderRadius: "24px",
            padding: "50px 40px",
            textAlign: "center",
          }}
        >
          {status === "verifying" && (
            <>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  border: "4px solid #f0ebe4",
                  borderTopColor: "#cfa76e",
                  borderRadius: "50%",
                  margin: "0 auto 28px",
                  animation: "spin 0.9s linear infinite",
                }}
              />
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "32px",
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                Confirming Your Payment
              </h1>
              <p style={{ color: "#777", fontSize: "15px" }}>
                Please wait a moment, this won't take long.
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "#e9f5ec",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  fontSize: "36px",
                  color: "#2e7d32",
                }}
              >
                ✓
              </div>

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "36px",
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                Payment Successful
              </h1>

              <p style={{ color: "#777", fontSize: "15px", marginBottom: "28px" }}>
                Thank you for your order — a confirmation has been recorded and your items are being prepared.
              </p>

              {orderInfo && (
                <div
                  style={{
                    backgroundColor: "#faf6ef",
                    border: "1px solid #e7d6b5",
                    borderRadius: "14px",
                    padding: "20px",
                    marginBottom: "28px",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ color: "#777", fontSize: "14px" }}>Reference</span>
                    <strong style={{ color: "#111", fontSize: "14px" }}>{orderInfo.reference}</strong>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#777", fontSize: "14px" }}>Amount Paid</span>
                    <strong style={{ color: "#cfa76e", fontSize: "16px" }}>
                      ₦{orderInfo.amount.toLocaleString()}
                    </strong>
                  </div>
                </div>
              )}

              <div style={{ display: "flex", gap: "12px" }}>
                <Link
                  to="/myorders"
                  style={{
                    flex: 1,
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    border: "1px solid #cfa76e",
                    color: "#cfa76e",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  View Orders
                </Link>
                <Link
                  to="/shop"
                  style={{
                    flex: 1,
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    backgroundColor: "#cfa76e",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Continue Shopping
                </Link>
              </div>
            </>
          )}

          {status === "failed" && (
            <>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  backgroundColor: "#fdecea",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                  fontSize: "36px",
                  color: "#d32f2f",
                }}
              >
                ✕
              </div>

              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "32px",
                  color: "#111",
                  marginBottom: "12px",
                }}
              >
                We Couldn't Confirm Your Payment
              </h1>

              <p style={{ color: "#777", fontSize: "15px", marginBottom: "28px" }}>
                If you were charged, please don't worry — reach out to us with your reference and we'll sort it out. If the payment didn't go through, you can try again.
              </p>

              <div style={{ display: "flex", gap: "12px" }}>
                <Link
                  to="/cart"
                  style={{
                    flex: 1,
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    border: "1px solid #cfa76e",
                    color: "#cfa76e",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Back to Cart
                </Link>
                <Link
                  to="/"
                  style={{
                    flex: 1,
                    height: "50px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "12px",
                    backgroundColor: "#cfa76e",
                    color: "#fff",
                    textDecoration: "none",
                    fontWeight: "600",
                  }}
                >
                  Go Home
                </Link>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PaymentSuccess;