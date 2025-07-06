import { NavLink } from "react-router";

export default function CartSummary({ cart }) {
  return (
    <div className="cart-summary">
      <h2>Riepilogo Carrello</h2>
      <p>Totale prodotti: {cart.length}</p>
      <p> Costo spedizione: €8.99 </p>
      <p>
        Totale: €{" "}
        {cart.reduce((total, item) => total + item.price, 0).toFixed(2)}
      </p>
      <NavLink to="/checkout" className="btn">
        Procedi al Checkout
      </NavLink>
    </div>
  );
}
