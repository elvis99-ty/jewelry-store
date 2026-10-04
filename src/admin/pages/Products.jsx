import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import AdminTable from "../components/AdminTable";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import ConfirmDialog from "../components/ConfirmDialog";
import { getAllProductsAdmin, deleteProductAdmin } from "../../api/adminProductApi";

const CATEGORY_FILTERS = [
  { value: "All Products", label: "All Products" },
  { value: "rings", label: "Rings" },
  { value: "necklace", label: "Necklace" },
  { value: "female-bracelets", label: "Female Bracelets" },
  { value: "male-bracelets", label: "Male Bracelets" },
  { value: "ear-rings", label: "Ear Rings" },
  { value: "jewelry-sets", label: "Jewelry Sets" },
  { value: "Out of Stock", label: "Out of Stock" },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Products");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [productPendingDelete, setProductPendingDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProductsAdmin();

      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin");
      } else {
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (product) => {
    setProductPendingDelete(product);
  };

  const handleDelete = async () => {
    const product = productPendingDelete;
    setDeletingId(product._id);

    try {
      await deleteProductAdmin(product._id);
      setProducts((prev) => prev.filter((p) => p._id !== product._id));
    } catch (err) {
      alert("Failed to delete product. Please try again.");
    } finally {
      setDeletingId(null);
      setProductPendingDelete(null);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const text = search.toLowerCase();

      const matchesSearch =
        product.name?.toLowerCase().includes(text) ||
        product.category?.toLowerCase().includes(text) ||
        product.subCategory?.toLowerCase().includes(text) ||
        product.type?.toLowerCase().includes(text);

      let matchesFilter = true;

      if (filter !== "All Products") {
        if (filter === "Out of Stock") {
          matchesFilter = product.stock === 0;
        } else {
          matchesFilter = product.category === filter;
        }
      }

      return matchesSearch && matchesFilter;
    });
  }, [products, search, filter]);

  return (
    <AdminLayout>
      {/* Header */}

      <div
        className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8"
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              color: "#1C1917",
              fontWeight: "500",
            }}
            className="text-3xl sm:text-4xl lg:text-[46px]"
          >
            Products
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#78716C",
              fontSize: "15px",
            }}
          >
            Manage every product in your store.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full lg:w-auto"
        >
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              height: "48px",
              borderRadius: "12px",
              border: "1px solid #D9D2C7",
              padding: "0 16px",
              background: "#FFFFFF",
              color: "#1C1917",
              fontSize: "15px",
              outline: "none",
            }}
            className="w-full sm:w-[190px]"
          >
            {CATEGORY_FILTERS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search name, category, type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              height: "48px",
              borderRadius: "12px",
              border: "1px solid #D9D2C7",
              padding: "0 18px",
              background: "#FFFFFF",
              color: "#1C1917",
              outline: "none",
              fontSize: "15px",
            }}
            className="w-full sm:w-[280px]"
          />

          <button
            onClick={() => setShowAddModal(true)}
            style={{
              height: "48px",
              padding: "0 24px",
              border: "none",
              borderRadius: "12px",
              background: "#C89B2C",
              color: "#FFFFFF",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "15px",
              whiteSpace: "nowrap",
            }}
          >
            + Add Product
          </button>
        </div>
      </div>

      <AdminTable
        columns="80px 1.2fr 1fr 1fr 1fr .8fr 1fr 1.3fr"
        minWidth="920px"
        headers={[
          "Image",
          "Name",
          "Category",
          "Sub Category",
          "Price",
          "Stock",
          "Status",
          "Action",
        ]}
      >
        {loading ? (
          <div style={{ padding: "40px" }}>Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ padding: "40px", color: "black", textAlign: "center" }}>
            No Products Found
          </div>
        ) : (
          filteredProducts.map((product) => (
            <ProductRow
              key={product._id}
              product={product}
              onEdit={() => setEditingProduct(product)}
              onDelete={() => confirmDelete(product)}
              deleting={deletingId === product._id}
            />
          ))
        )}
      </AdminTable>

      {/* Pagination */}

      {!loading && (
        <div
          style={{
            marginTop: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#78716C",
              fontSize: "14px",
            }}
          >
            Showing 1 - {filteredProducts.length} of {filteredProducts.length} products
          </span>
        </div>
      )}

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onProductAdded={fetchProducts}
        />
      )}

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onProductUpdated={fetchProducts}
        />
      )}

      {productPendingDelete && (
        <ConfirmDialog
          title="Delete Product"
          message={`Are you sure you want to delete "${productPendingDelete.name}"? This cannot be undone.`}
          confirmLabel="Delete"
          danger
          loading={deletingId === productPendingDelete._id}
          onConfirm={handleDelete}
          onCancel={() => setProductPendingDelete(null)}
        />
      )}
    </AdminLayout>
  );
}

function Badge({ text, bg, color }) {
  return (
    <span
      style={{
        padding: "6px 14px",
        borderRadius: "20px",
        background: bg,
        color,
        fontSize: "13px",
        fontWeight: "600",
      }}
    >
      {text}
    </span>
  );
}

function ProductRow({ product, onEdit, onDelete, deleting }) {
  const isActive = product.stock > 0 && product.available;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1.2fr 1fr 1fr 1fr .8fr 1fr 1.3fr",
        padding: "20px 24px",
        alignItems: "center",
        borderBottom: "1px solid #F2EFEB",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "12px",
          objectFit: "cover",
          backgroundColor: "#f2efeb",
        }}
      />

      <div
        style={{
          color: "#1C1917",
          fontWeight: "600",
        }}
      >
        {product.name}
      </div>

      <div
        style={{
          color: "#444",
        }}
      >
        {product.category?.replaceAll("-", " ")}
      </div>

      <div
        style={{
          color: "#444",
        }}
      >
        {product.subCategory || "—"}
      </div>

      <div
        style={{
          color: "#1C1917",
          fontWeight: "600",
        }}
      >
        ₦{product.price?.toLocaleString()}
      </div>

      <div
        style={{
          color: product.stock > 0 ? "#2E8B57" : "#DC2626",
          fontWeight: "600",
        }}
      >
        {product.stock}
      </div>

      <Badge
        text={isActive ? "Active" : "Out of Stock"}
        bg={isActive ? "#EAF8EE" : "#FEE2E2"}
        color={isActive ? "#2E8B57" : "#DC2626"}
      />

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={onEdit}
          style={{
            background: "#C89B2C",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            padding: "10px 14px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          disabled={deleting}
          style={{
            background: "#fff",
            color: "#DC2626",
            border: "1px solid #FCA5A5",
            borderRadius: "8px",
            padding: "10px 14px",
            cursor: deleting ? "not-allowed" : "pointer",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          {deleting ? "..." : "Delete"}
        </button>
      </div>
    </div>
  );
}

export default Products;