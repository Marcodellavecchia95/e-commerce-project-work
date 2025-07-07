import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import Navbar from "./components/Navbar";
import ProductDetailPage from "./Pages/ProductDetailPage.jsx";
import { CartProvider } from "../src/context/CartContext";
import CartPage from "./Pages/CartPage.jsx";
import CheckoutForm from "./components/checkout/CheckoutForm.jsx";
import ReturnPage from "./components/checkout/ReturnPage.jsx";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<ReturnPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
