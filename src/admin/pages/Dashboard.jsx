import AdminLayout from "../layouts/AdminLayout";
import StatCard from "../components/StatCard";

import {
  ShoppingBag,
  Wallet,
  Users,
  Gem,
} from "lucide-react";

function Dashboard() {
  return (
    <AdminLayout>
      <p
        style={{
          color: "#000",
          marginBottom: "40px",
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        Welcome back. Here's what's happening in your store today.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
        }}
      >
        <StatCard
          title="Total Orders"
          value="29"
          icon={<ShoppingBag size={22} />}
        />

        <StatCard
          title="Revenue"
          value="₦10,065,000"
          icon={<Wallet size={22} />}
        />

        <StatCard
          title="Customers"
          value="18"
          icon={<Users size={22} />}
        />

        <StatCard
          title="Products"
          value="53"
          icon={<Gem size={22} />}
        />
      </div>
    </AdminLayout>
  );
}

export default Dashboard;