import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home.jsx'
import Shop from '../pages/Shop.jsx'
import ProductDetails from '../pages/ProductDetails.jsx'
import Cart from '../pages/Cart.jsx'
import Bracelets from "../pages/Bracelets.jsx";
import Rings from "../pages/Rings.jsx";
import MyOrders from "../pages/MyOrders.jsx";
import ScrollToTop from "../components/ScrollToTop.jsx";
import Necklace from "../pages/Necklace.jsx";

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
                <Route path="/myorders" element={<MyOrders />} />
            </Routes>

        </BrowserRouter>
    )
}

export default AppRouter