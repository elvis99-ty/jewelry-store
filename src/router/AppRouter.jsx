import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from '../pages/Home.jsx'
import Shop from '../pages/Shop.jsx'
import ProductDetails from '../pages/ProductDetails.jsx'
import Cart from '../pages/Cart.jsx'
import Bracelets from "../pages/Bracelets.jsx";
import Rings from "../pages/Rings.jsx";
import Chains from "../pages/Chains.jsx";
import MyOrders from "../pages/MyOrders.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/bracelets" element={<Bracelets/>}/>
                <Route path="/rings" element={<Rings/>}/>
                <Route path="/chains" element={<Chains/>}/>
                <Route path="/myorders" element={<MyOrders/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter