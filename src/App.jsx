import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./Pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";
import ProductDetailPage from "./pages/ProductDetailPage";
import { CartProvider } from "../src/context/cartContext";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}
