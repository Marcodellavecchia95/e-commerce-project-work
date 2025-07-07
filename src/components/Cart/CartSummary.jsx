import { NavLink } from "react-router";

export default function CartSummary({ cart }) {
  return (
    <div className="cart-summary">
      <h2>Riepilogo Carrello</h2>
      <p> Costo spedizione: Calcolato al checkout </p>
      <p>
        Totale: €{" "}
        {(
          cart.reduce((total, item) => total + item.price * item.quantity, 0) +
          8.99
        ).toFixed(2)}
      </p>
      <NavLink to="/checkout" className="btn">
        Procedi al Checkout
      </NavLink>
    </div>
  );
}
