import { NavLink } from "react-router";

export default function CartSummary({ cart, viewCartBtn, closeOffcanvas }) {
  return (
    <div className="cart-summary">
      <h2>Riepilogo Carrello</h2>
      <p> Costo spedizione: Calcolato al checkout </p>
      <p>
        Totale: €{" "}
        {cart
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)}
      </p>
      <NavLink to="/checkout" className="btn" onClick={closeOffcanvas}>
        Procedi al Checkout
      </NavLink>
      {viewCartBtn && (
        <NavLink to="/cart" className="btn" onClick={closeOffcanvas}>
          Visualizza carrello
        </NavLink>
      )}
    </div>
  );
}
