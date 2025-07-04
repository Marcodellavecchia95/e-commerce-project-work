import { BrowserRouter, Routes, Route } from "react-router";
import Homepage from "./pages/Homepage";
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
