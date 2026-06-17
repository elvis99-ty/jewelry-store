import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import products from "../data/products";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess ] = useState(false);
  const { addToCart} = useCart(); 

  if (!product) {
    return (
      <>
        <Navbar />
        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h2>Product Not Found</h2>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === product.category &&
        item.id !== product.id
    )
    .slice(0, 4);

  const whatsappNumber = "234XXXXXXXXXX";

  return (
    <>
      <Navbar />
  {showSuccess && (
    <div
      style={{
        position: "fixed",
        top: "120px",
        right: "30px",
        backgroundColor: "#ffffff",
        border: "1px solid #e7e1d8",
        borderLeft: "4px solid #cfa76e",
        padding: "16px 22px",
        borderRadius: "14px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        zIndex: 9999,
        minWidth: "280px"
      }}
    >
      <p
        style={{
          margin: 0,
          fontWeight: "600",
          color: "#111"
        }}
      >
        Added to Cart
      </p>

      <p
        style={{
          margin: "4px 0 0",
          fontSize: "14px",
          color: "#777"
        }}
      >
        {product.name} added successfully.
      </p>
    </div>
  )}

      <main
        style={{
          backgroundColor: "#fdfcfc",
          minHeight: "100vh"
        }}
      >
        <div
          style={{
            borderTop: "1px solid #e7e1d8"
          }}
        />

        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "60px 40px"
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            style={{
            display: "grid",
            gridTemplateColumns: "0.8fr 1.3fr",
            gap: "80px",
            alignItems: "start"
            }}
          >
            {/* IMAGE */}
            <div>
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",
                  maxWidth: "380px",
                  borderRadius: "20px",
                  boxShadow:
                    "0 10px 30px rgba(0,0,0,0.08)"
                }}
              />
            </div>

            {/* PRODUCT INFO */}
            <div>
              <p
                style={{
                  color: "#cfa76e",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontSize: "12px",
                  fontWeight: "600"
                }}
              >
                {product.category}
              </p>

              <h1
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                  fontSize: "54px",
                  fontWeight: "400",
                  marginTop: "10px",
                  marginBottom: "20px",
                  color: "#111111"
                }}
              >
                {product.name}
              </h1>

              <p
                style={{
                  color: "#666",
                  marginBottom: "12px"
                }}
              >
                Type:
                {" "}
                {product.type
                  ?.replaceAll("-", " ")
                  .toUpperCase()}
              </p>

              <p
                style={{
                  color: "#2e7d32",
                  fontWeight: "600",
                  marginBottom: "30px"
                }}
              >
                ✓ Available
              </p>

        <div style={{ marginTop: "25px" }}>
         <p
          style={{
          fontWeight: "600",
          marginBottom: "12px",
          color: "#111"
          }}
          >
            Quantity
     </p>


                <div
  style={{
    display: "flex",
    alignItems: "center",
    width: "180px",
    border: "2px solid #cfa76e",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#ffffff"
  }}
>
                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        prev > 1
                          ? prev - 1
                          : 1
                      )
                    }
                    style={{
  width: "60px",
  height: "55px",
  border: "none",
  backgroundColor: "#f5f5f5",
  color: "#111",
  cursor: "pointer",
  fontSize: "24px",
  fontWeight: "700"
}}
                  >
                    −
                  </button>

                  <div
                    style={{
  flex: 1,
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "700",
  color: "#111"
}}
                  >
                    {quantity}
                  </div>

                  <button
                    onClick={() =>
                      setQuantity((prev) =>
                        prev < 10
                          ? prev + 1
                          : 10
                      )
                    }
                    style={{
  width: "60px",
  height: "55px",
  border: "none",
  backgroundColor: "#f5f5f5",
  color: "#111",
  cursor: "pointer",
  fontSize: "24px",
  fontWeight: "700"
}}
                  >
                    +
                  </button>
                </div>
              </div>
<p
  style={{
    marginTop: "8px",
    fontSize: "13px",
    color: "#777"
  }}
>
  Maximum order quantity: 10
</p>

              {/* BUTTONS */}
              <button onClick={() => {
                addToCart(product, quantity);
                setShowSuccess(true);

                setTimeout(() => {
                  setShowSuccess(false);
                }, 2500);
              }}

                style={{
                  width: "100%",
                  height: "52px",
                  marginTop: "30px",
                  backgroundColor:
                    "#cfa76e",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                CONFIRM
              </button>

              <button
                onClick={() =>
                  window.open(
                    `https://wa.me/${whatsappNumber}?text=Hello, I'm interested in ${product.name}. Quantity: ${quantity}`
                  )
                }
                style={{
                  width: "100%",
                  height: "52px",
                  marginTop: "12px",
                  backgroundColor:
                    "#ffffff",
                  color: "#25D366",
                  border:
                    "1px solid #25D366",
                  borderRadius: "12px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                Chat on WhatsApp
              </button>
            </div>
          </motion.div>

          {/* RELATED PRODUCTS */}
          <div
            style={{
              marginTop: "100px"
            }}
          >
            <h2
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
                fontSize: "36px",
                marginBottom: "30px"
              }}
            >
              You May Also Like
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "24px",
                cursor : "pointer"
              }}
            >
              {relatedProducts.map(
                (item) => (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    style={{
                      textDecoration:
                        "none",
                      color: "inherit"
                    }}
                  >
                    <div>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "100%",
                          borderRadius: "16px",
                          transition : "0.4s ease"
                        }}
                      />

                      <h4
                        style={{
                          marginTop:
                            "12px"
                        }}
                      >
                        {item.name}
                      </h4>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ProductDetails;