import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { Offcanvas } from "bootstrap";
import "../../assets/css/CartOffcanvas.css";
import CartItems from "./CartItems";
import CartSummary from "./CartSummary";
import { NavLink } from "react-router";
/* import "../../assets/css/CartPage.css"; */

export default function CartOffcanvas() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    Array.from(document.querySelectorAll(".offcanvas")).forEach(
      (offcanvas) => new Offcanvas(offcanvas)
    );
  }, []);

  function closeOffcanvas() {
    const offcanvasEl = document.getElementById("cartOffcanvas");
    const offcanvasInstance = Offcanvas.getInstance(offcanvasEl);
    if (offcanvasInstance) offcanvasInstance.hide();
  }

  return (
    <div>
      <button
        className="btn"
        id="btn-cart"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#cartOffcanvas"
        aria-controls="cartOffcanvas"
      >
        <div className="cart-icon-container" style={{ position: "relative" }}>
          <img
            src="/assets/img/menu_icons/menu-cart.png"
            alt="Carrello"
            id="navbar-cart"
          />
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </div>
      </button>

      <div
        class="offcanvas offcanvas-start"
        data-bs-scroll="true"
        tabIndex="-1"
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvasLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="cartOffcanvasLabel">
            Il tuo carrello
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            x
          </button>
        </div>
        <div class="offcanvas-body">
          {cart.length === 0 ? (
            <p>Nessun prodtto aggiunto al carrello</p>
          ) : (
            <div>
              <CartItems
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            </div>
          )}
        </div>
        <div class="offcanvas-footer">
          {cart.length > 0 && (
            <CartSummary
              cart={cart}
              viewCartBtn={true}
              closeOffcanvas={closeOffcanvas}
            />
          )}
        </div>
      </div>
    </div>
  );
}
