import { Link } from "react-router";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="container">
        <nav>
          {/* sezione website */}
          <div className="navbar-website-section">
            <Link to="/">
              <img
                src="src/assets/img/logos/logo-ror.png"
                alt="Logo"
                id="navbar-logo"
              />
            </Link>
            <div className="navbar-navlink-component">
              <img
                src="src/assets/img/menu_icons/menu-plus.png"
                alt="Apri menù"
                className="navlink-component-image-plus"
              />
              <Link to={"/"}>Homepage</Link>
            </div>
            <div className="navbar-navlink-component">
              <img
                src="src/assets/img/menu_icons/menu-plus.png"
                alt="Apri menù"
                className="navlink-component-image-plus"
              />
              <Link to={"/products"}>Products</Link>
            </div>
            <div className="navbar-navlink-component">
              <img
                src="src/assets/img/menu_icons/menu-plus.png"
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
                <img
                  src="src/assets/img/menu_icons/menu-cart.png"
                  alt="Logo"
                  id="navbar-cart"
                />
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}
