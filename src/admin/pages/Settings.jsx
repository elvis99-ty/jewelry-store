import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { getStoreSettings, updateStoreSettings } from "../../api/settingsApi";
import { Save, Store, Truck, Phone, MapPin, CheckCircle2, AlertCircle } from "lucide-react";

function Settings() {
  const [form, setForm] = useState({
    storeName: "Royal Rings",
    supportEmail: "concierge@royalrings.com",
    currency: "NGN (₦)",
    deliveryFee: 5000,
    whatsappNumber: "",
    pickupAddressLine: "",
    pickupCityState: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await getStoreSettings();
      if (data.success && data.settings) {
        setForm({
          storeName: data.settings.storeName || "Royal Rings",
          supportEmail: data.settings.supportEmail || "concierge@royalrings.com",
          currency: data.settings.currency || "NGN (₦)",
          deliveryFee: data.settings.deliveryFee ?? 5000,
          whatsappNumber: data.settings.whatsappNumber || "",
          pickupAddressLine: data.settings.pickupAddressLine || "",
          pickupCityState: data.settings.pickupCityState || "",
        });
      }
    } catch (err) {
      if (err.response?.status === 401) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin", { replace: true });
      } else {
        console.error("Failed to load settings:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "deliveryFee" ? Number(value) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const data = await updateStoreSettings(form);
      if (data.success) {
        setMessage({ text: "Store settings updated successfully!", type: "success" });
        setTimeout(() => setMessage({ text: "", type: "" }), 5000);
      }
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Failed to update settings.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div style={{ maxWidth: "800px" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "'Cormorant Garamond', serif",
            color: "#1C1917",
          }}
          className="text-3xl sm:text-4xl lg:text-[40px]"
        >
          Store Settings
        </h1>

        <p
          style={{
            color: "#78716C",
            marginTop: "8px",
            marginBottom: "28px",
            fontSize: "15px",
          }}
        >
          Configure store identity, delivery tariffs, customer support lines, and showroom pickup locations.
        </p>

        {message.text && (
          <div
            style={{
              padding: "14px 18px",
              borderRadius: "12px",
              marginBottom: "24px",
              fontSize: "14px",
              fontWeight: "500",
              backgroundColor: message.type === "success" ? "#EAF8EE" : "#FEE2E2",
              color: message.type === "success" ? "#2E8B57" : "#DC2626",
              border: `1px solid ${
                message.type === "success" ? "#BBF7D0" : "#FECACA"
              }`,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {message.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{message.text}</span>
          </div>
        )}

        {loading ? (
          <div style={{ color: "#78716C", padding: "40px 0" }}>
            Loading store settings...
          </div>
        ) : (
          <form
            onSubmit={handleSave}
            style={{
              background: "#FFFFFF",
              border: "1px solid #ECE7DF",
              borderRadius: "20px",
              boxShadow: "0 8px 24px rgba(0,0,0,.03)",
            }}
            className="p-5 sm:p-9"
          >
            {/* General Brand Details */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Store size={20} color="#C89B2C" />
              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1C1917",
                }}
              >
                Store Identity
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
              <div>
                <label style={labelStyle}>Store Name</label>
                <input
                  type="text"
                  name="storeName"
                  value={form.storeName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Royal Rings"
                />
              </div>

              <div>
                <label style={labelStyle}>Currency</label>
                <input
                  type="text"
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="NGN (₦)"
                />
              </div>
            </div>

            <div style={{ marginBottom: "26px" }}>
              <label style={labelStyle}>Concierge / Support Email</label>
              <input
                type="email"
                name="supportEmail"
                value={form.supportEmail}
                onChange={handleChange}
                style={inputStyle}
                placeholder="concierge@royalrings.com"
              />
              <span style={helperStyle}>
                Visible in customer communications and purchase receipts.
              </span>
            </div>

            {/* Delivery Section */}
            <hr style={dividerStyle} />

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Truck size={20} color="#C89B2C" />
              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1C1917",
                }}
              >
                Delivery & Tariffs
              </h3>
            </div>

            <div style={{ marginBottom: "26px" }}>
              <label style={labelStyle}>Standard Nationwide Delivery Fee (₦)</label>
              <input
                type="number"
                name="deliveryFee"
                value={form.deliveryFee}
                onChange={handleChange}
                required
                style={inputStyle}
                placeholder="5000"
              />
              <span style={helperStyle}>
                This fee applies to all orders where home delivery is selected during checkout.
              </span>
            </div>

            {/* Contact Section */}
            <hr style={dividerStyle} />

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Phone size={20} color="#C89B2C" />
              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1C1917",
                }}
              >
                Direct Support Hotline
              </h3>
            </div>

            <div style={{ marginBottom: "26px" }}>
              <label style={labelStyle}>WhatsApp Business Contact Number</label>
              <input
                type="text"
                name="whatsappNumber"
                value={form.whatsappNumber}
                onChange={handleChange}
                style={inputStyle}
                placeholder="2348012345678"
              />
              <span style={helperStyle}>
                Format with international country code (e.g. 234...).
              </span>
            </div>

            {/* Showroom Pickup Section */}
            <hr style={dividerStyle} />

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <MapPin size={20} color="#C89B2C" />
              <h3
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#1C1917",
                }}
              >
                Physical Showroom Location
              </h3>
            </div>

            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Street Address / Suite</label>
              <input
                type="text"
                name="pickupAddressLine"
                value={form.pickupAddressLine}
                onChange={handleChange}
                style={inputStyle}
                placeholder="70 International Airport Road"
              />
            </div>

            <div style={{ marginBottom: "32px" }}>
              <label style={labelStyle}>City & State</label>
              <input
                type="text"
                name="pickupCityState"
                value={form.pickupCityState}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Lagos State, Nigeria"
              />
              <span style={helperStyle}>
                Customers selecting showroom pickup at checkout will see this location.
              </span>
            </div>

            <button
              type="submit"
              disabled={saving}
              style={{
                background: saving ? "#B8AA7D" : "#C89B2C",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "12px",
                padding: "16px 36px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: saving ? "not-allowed" : "pointer",
                boxShadow: "0 10px 20px rgba(200,155,44,.25)",
                transition: "all .25s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Save size={16} />
              {saving ? "Saving Changes..." : "Save Settings"}
            </button>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  fontWeight: "600",
  fontSize: "14px",
  color: "#1C1917",
};

const inputStyle = {
  width: "100%",
  height: "48px",
  padding: "0 16px",
  borderRadius: "10px",
  border: "1px solid #D9D2C7",
  fontSize: "15px",
  color: "#1C1917",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#FFFFFF",
  transition: "border-color 0.2s ease",
};

const helperStyle = {
  display: "block",
  marginTop: "6px",
  fontSize: "12px",
  color: "#78716C",
};

const dividerStyle = {
  border: "none",
  borderTop: "1px solid #ECE7DF",
  margin: "28px 0",
};

export default Settings;
