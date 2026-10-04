import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home.jsx'
import Shop from '../pages/Shop.jsx'
import ProductDetails from '../pages/ProductDetails.jsx'
import Cart from '../pages/Cart.jsx'
import Bracelets from "../pages/Bracelets.jsx";
import Earrings from "../pages/Earrings.jsx";
import Rings from "../pages/Rings.jsx";
import MyOrders from "../pages/MyOrders.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Necklace from "../pages/Necklace.jsx";
import JewelrySet from "../pages/JewelrySet.jsx";
import Checkout from "../pages/Checkout.jsx";
import PaymentSuccess from "../pages/PaymentSuccess.jsx";
import OrderHistory from "../pages/OrderHistory.jsx";
import AdminLogin from "../admin/pages/AdminLogin.jsx";
import Dashboard from "../admin/pages/Dashboard.jsx";
import Orders from "../admin/pages/Orders.jsx";
import Products from "../admin/pages/Products.jsx";
import Customers from "../admin/pages/Customers.jsx";
import Reports from "../admin/pages/Reports.jsx";
import PaymentIssues from "../admin/pages/PaymentIssues.jsx";
import Settings from "../admin/pages/Settings.jsx";
import ProtectedRoute from "../admin/components/ProtectedRoute.jsx";
import CustomerProtectedRoute from "../components/CustomerProtectedRoute.jsx";
import CustomerDetail from "../admin/pages/CustomerDetail.jsx";

function AppRouter() {
    return (
        <BrowserRouter>

            <ScrollToTop />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/bracelets" element={<Bracelets />} />
                <Route path="/rings" element={<Rings />} />
                <Route path="/necklace" element={<Necklace />} />
                <Route path="/earrings" element={<Earrings />} />
                <Route path="/jewelryset" element={<JewelrySet/>}/>
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/checkout" element={<Checkout/>}/>
                <Route path="/payment-success" element={<PaymentSuccess/>}/>
                <Route
                    path="/myorders/history"
                    element={
                        <CustomerProtectedRoute>
                            <OrderHistory/>
                        </CustomerProtectedRoute>
                    }
                />
                <Route path="/admin" element={<AdminLogin />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/orders"
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/products"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/customers"
                    element={
                        <ProtectedRoute>
                            <Customers />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/reports"
                    element={
                        <ProtectedRoute>
                            <Reports />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/settings"
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/admin/payment-issues"
                    element={
                        <ProtectedRoute>
                            <PaymentIssues />
                        </ProtectedRoute>
                    }
                />

                 <Route
                    path="/admin/customers/:email"
                    element={
                        <ProtectedRoute>
                            <CustomerDetail />
                        </ProtectedRoute>
                    }
                />
                
            </Routes>

        </BrowserRouter>
    )
}

export default AppRouter