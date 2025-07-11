import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./Pages/Homepage.jsx";
import ProductsPage from "./Pages/ProductsPage.jsx";
import Navbar from "./components/Navbar";
import ProductDetailPage from "./Pages/ProductDetailPage.jsx";
import { CartProvider } from "../src/context/CartContext";
import CartPage from "./Pages/CartPage.jsx";
import CheckoutForm from "./components/checkout/CheckoutForm.jsx";
import ReturnPage from "./components/checkout/ReturnPage.jsx";
import ClippyBot from "./components/AI-chat/ClippyBot.jsx";
import NotFoundPage from "./Pages/NotFoundPage.jsx";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<ReturnPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <ClippyBot />
      </BrowserRouter>
    </CartProvider>
  );
}
