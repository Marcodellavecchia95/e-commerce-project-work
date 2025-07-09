import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar-container">
      <div className="container">
        <nav>
          {/* sezione website */}
          <div className="navbar-website-section">
            <Link to="/">
              <img
                src="/assets/img/logos/logo-ror.png"
                alt="Logo"
                id="navbar-logo"
              />
            </Link>
            <div className="navbar-navlink-component">
              <img
                src="/assets/img/menu_icons/menu-plus.png"
                alt="Apri menù"
                className="navlink-component-image-plus"
              />
              <Link to={"/"}>Homepage</Link>
            </div>
            <div className="navbar-navlink-component">
              <img
                src="/assets/img/menu_icons/menu-plus.png"
                alt="Apri menù"
                className="navlink-component-image-plus"
              />
              <Link to={"/products"}>Products</Link>
            </div>
            <div className="navbar-navlink-component">
              <img
                src="/assets/img/menu_icons/menu-plus.png"
                alt="Apri menù"
                className="navlink-component-image-plus"
              />
              <Link>About us</Link>
            </div>
          </div>

          {/* sezione carrello */}
          <div className="navbar-order-section">
            <Link to="/cart">
              <button className="btn" id="btn-cart">
                <div
                  className="cart-icon-container"
                  style={{ position: "relative" }}
                >
                  <img
                    src="/assets/img/menu_icons/menu-cart.png"
                    alt="Carrello"
                    id="navbar-cart"
                  />
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                  )}
                </div>
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
