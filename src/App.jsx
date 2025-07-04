import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router";
import CheckoutForm from "./assets/components/checkout/CheckoutForm";
import ReturnPage from "./assets/components/checkout/ReturnPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/return" element={<ReturnPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
