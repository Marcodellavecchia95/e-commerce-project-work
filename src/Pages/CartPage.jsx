import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";
import "../assets/css/CartPage.css";

export default function CartPage() {
  const { cart, removeFromCart } = useContext(CartContext);
  return (
    <main>
      <div className="cart-wrapper">
        <div className="container">
          <h1>Il tuo carrello</h1>
          {cart.length > 0 ? (
            <>
              <div className="cart-row">
                <div className="col-75">
                  <CartItems cart={cart} removeFromCart={removeFromCart} />
                </div>
                <div className="col-20">
                  <CartSummary cart={cart} />
                </div>
              </div>
            </>
          ) : (
            <p>Nessun prodotto aggiunto al carrello</p>
          )}
        </div>
      </div>
    </main>
  );
}
