import { useState } from "react";
import { updateProductAdmin, uploadProductImage } from "../../api/adminProductApi";

const CATEGORY_OPTIONS = [
  { value: "rings", label: "Rings" },
  { value: "necklace", label: "Necklace" },
  { value: "female-bracelets", label: "Female Bracelets" },
  { value: "male-bracelets", label: "Male Bracelets" },
  { value: "ear-rings", label: "Ear Rings" },
  { value: "jewelry-sets", label: "Jewelry Sets" },
];

function EditProductModal({ product, onClose, onProductUpdated }) {
  const [form, setForm] = useState({
    name: product.name || "",
    category: product.category || "rings",
    subCategory: product.subCategory || "",
    type: product.type || "",
    description: product.description || "",
    image: product.image || "",
    price: product.price ?? "",
    stock: product.stock ?? "",
    available: product.available ?? true,
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploading(true);
    setError("");

    try {
      const result = await uploadProductImage(file);
      setForm((prev) => ({ ...prev, image: result.url }));
    } catch (err) {
      setError("Image upload failed. Please try again.");
      setImagePreview("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.image || form.price === "") {
      setError("Name, image, and price are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await updateProductAdmin(product._id, {
        ...form,
        price: Number(form.price),
        stock: form.stock === "" ? 0 : Number(form.stock),
      });

      onProductUpdated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "520px",
          maxHeight: "88vh",
          overflowY: "auto",
        }}
        className="p-5 sm:p-9"
      >
        <h2
          style={{
            margin: 0,
            marginBottom: "24px",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "32px",
            color: "#1C1917",
          }}
        >
          Edit Product
        </h2>

        {error && (
          <div
            style={{
              backgroundColor: "#fdecea",
              border: "1px solid #f5c6c2",
              color: "#c0392b",
              borderRadius: "10px",
              padding: "12px 14px",
              fontSize: "14px",
              marginBottom: "18px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Product Name *</label>
          <input name="name" value={form.name} onChange={handleChange} style={inputStyle} />

          <label style={labelStyle}>Category *</label>
          <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <label style={labelStyle}>Sub Category</label>
          <input name="subCategory" value={form.subCategory} onChange={handleChange} style={inputStyle} />

          <label style={labelStyle}>Type</label>
          <input name="type" value={form.type} onChange={handleChange} style={inputStyle} />

          <label style={labelStyle}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />

          <label style={labelStyle}>Product Image *</label>

          <img
            src={imagePreview || form.image}
            alt="Preview"
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
              borderRadius: "12px",
              marginBottom: "10px",
              backgroundColor: "#f2efeb",
            }}
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            style={{
              ...inputStyle,
              height: "auto",
              padding: "10px 14px",
            }}
          />

          {uploading && (
            <p style={{ fontSize: "13px", color: "#C89B2C", marginTop: "6px" }}>
              Uploading image...
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label style={labelStyle}>Price (₦) *</label>
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>Stock</label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "18px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#1C1917",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
            Available for purchase
          </label>

          <div style={{ display: "flex", gap: "12px", marginTop: "26px" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                height: "50px",
                borderRadius: "12px",
                border: "1px solid #D9D2C7",
                backgroundColor: "#fff",
                color: "#1C1917",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              style={{
                flex: 1,
                height: "50px",
                borderRadius: "12px",
                border: "none",
                backgroundColor: loading || uploading ? "#B8AA7D" : "#C89B2C",
                color: "#fff",
                fontWeight: "600",
                cursor: loading || uploading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  marginTop: "16px",
  marginBottom: "6px",
  fontWeight: "600",
  fontSize: "14px",
  color: "#1C1917",
};

const inputStyle = {
  width: "100%",
  height: "46px",
  padding: "0 14px",
  borderRadius: "10px",
  border: "1px solid #D9D2C7",
  fontSize: "14px",
  color: "#1C1917",
  outline: "none",
  boxSizing: "border-box",
  backgroundColor: "#fff",
};

export default EditProductModal;