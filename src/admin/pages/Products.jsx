import { useMemo, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import AdminTable from "../components/AdminTable";

function Products() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All Products");

  const products = [
    {
      id: 1,
      category: "Rings",
      subCategory: "Wedding",
      type: "Solitaire",
      price: 250000,
      stock: 18,
      status: "Active",
      image: "https://placehold.co/60x60",
    },
    {
      id: 2,
      category: "Chains",
      subCategory: "Cuban",
      type: "18K Gold",
      price: 500000,
      stock: 5,
      status: "Active",
      image: "https://placehold.co/60x60",
    },
    {
      id: 3,
      category: "Bracelets",
      subCategory: "Tennis",
      type: "Diamond",
      price: 180000,
      stock: 0,
      status: "Out of Stock",
      image: "https://placehold.co/60x60",
    },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const text = search.toLowerCase();

      const matchesSearch =
        product.category.toLowerCase().includes(text) ||
        product.subCategory.toLowerCase().includes(text) ||
        product.type.toLowerCase().includes(text);

      let matchesFilter = true;

      if (filter !== "All Products") {
        if (filter === "Active" || filter === "Out of Stock") {
          matchesFilter = product.status === filter;
        } else {
          matchesFilter = product.category === filter;
        }
      }

      return matchesSearch && matchesFilter;
    });
  }, [search, filter]);

  return (
    <AdminLayout>
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "35px",
          gap: "20px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "46px",
              color: "#1C1917",
              fontWeight: "500",
            }}
          >
            Products
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#78716C",
              fontSize: "16px",
            }}
          >
            Manage every product in your store.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
          }}
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
              minWidth: "190px",
              fontSize: "15px",
              outline: "none",
            }}
          >
            <option>All Products</option>
            <option>Rings</option>
            <option>Necklace</option>
            <option>Bracelets</option>
            <option>Earrings</option>
            <option>Jewelry Set</option>
            <option>Out of Stock</option>
          </select>

          <input
            type="text"
            placeholder="Search Category, Sub Category or Type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "320px",
              height: "48px",
              borderRadius: "12px",
              border: "1px solid #D9D2C7",
              padding: "0 18px",
              background: "#FFFFFF",
              color: "#1C1917",
              outline: "none",
              fontSize: "15px",
            }}
          />

          <button
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
            }}
          >
            + Add Product
          </button>
        </div>
      </div>
      
      <AdminTable
        columns="80px 1fr 1fr 1fr 1fr .8fr 1fr .8fr"
        headers={[
          "Image",
          "Category",
          "Sub Category",
          "Type",
          "Price",
          "Stock",
          "Status",
          "Action",
        ]}
      >
        {filteredProducts.map((product) => (
          <ProductRow
            key={product.id}
            product={product}
          />
        ))}
      </AdminTable>

      {/* Pagination */}

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

        <div
          style={{
            display: "flex",
            gap: "8px",
          }}
        >
          <button style={pageButton}>←</button>

          <button
            style={{
              ...pageButton,
              background: "#C89B2C",
              color: "#FFFFFF",
              border: "none",
            }}
          >
            1
          </button>

          <button style={pageButton}>→</button>
        </div>
      </div>
    </AdminLayout>
  );
}

const pageButton = {
  width: "42px",
  height: "42px",
  borderRadius: "10px",
  border: "1px solid #D9D2C7",
  background: "#FFFFFF",
  color: "#1C1917",
  fontWeight: "600",
  cursor: "pointer",
};

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

function ProductRow({ product }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1fr 1fr 1fr 1fr .8fr 1fr .8fr",
        padding: "20px 24px",
        alignItems: "center",
        borderBottom: "1px solid #F2EFEB",
      }}
    >
      <img
        src={product.image}
        alt={product.category}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "12px",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          color: "#1C1917",
          fontWeight: "600",
        }}
      >
        {product.category}
      </div>

      <div
        style={{
          color: "#444",
        }}
      >
        {product.subCategory}
      </div>

      <div
        style={{
          color: "#444",
        }}
      >
        {product.type}
      </div>

      <div
        style={{
          color: "#1C1917",
          fontWeight: "600",
        }}
      >
        ₦{product.price.toLocaleString()}
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
        text={product.status}
        bg={
          product.status === "Active"
            ? "#EAF8EE"
            : "#FEE2E2"
        }
        color={
          product.status === "Active"
            ? "#2E8B57"
            : "#DC2626"
        }
      />

      <button
        style={{
          background: "#C89B2C",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "8px",
          padding: "10px 14px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        View
      </button>
    </div>
  );
}

export default Products;