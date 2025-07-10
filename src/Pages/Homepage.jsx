import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";

import Card from "../components/Card/Card";
import FolderImage from "../components/Card/FolderImage";
import Toast from "../components/ui/Toast";
import { CartContext } from "../context/CartContext";

export default function Homepage() {
  const recentProductsApi = "http://localhost:3000/products/recent";
  const bestSellerProductsApi = "http://localhost:3000/products/best-sellers";

  const { addToCart } = useContext(CartContext);

  const [recentProducts, setRecentProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [visibleRecentCount, setVisibleRecentCount] = useState(4);
  const [visibleBestSellerCount, setVisibleBestSellerCount] = useState(4);
  const [quantities, setQuantities] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value));
    setQuantities((prev) => ({ ...prev, [productId]: qty }));
  };

  const handleAddToCart = (product, quantity = 1) => {
    const price =
      product.promotion_price > 0 ? product.promotion_price : product.price;

    addToCart({
      id: product.id,
      name: product.name,
      thumbnail: product.thumbnail_url,
      price,
      quantity,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const fetchRecentProducts = () => {
    axios.get(recentProductsApi).then((res) => {
      setRecentProducts(res.data);
    });
  };

  const fetchBestSellerProducts = () => {
    axios.get(bestSellerProductsApi).then((res) => {
      setBestSellerProducts(res.data);
    });
  };

  useEffect(() => {
    fetchRecentProducts();
    fetchBestSellerProducts();
  }, []);

  return (
    <main className="container">
      <header>
        <div>
          <h3>REPUBLIC OF RETRO©</h3>
          <h1>DA DOVE I TUOI </h1>
          <h1>COMPONENTI NERD</h1>
          <h1>
            <span>(probabilmente)</span> ARRIVANO
          </h1>

          <Link to="/products" className="flex" id="header-explore">
            <img
              src="/assets/img/folders/folder-search.png"
              alt="Folder Search"
            />
            <p>ESPLORA I PRODOTTI</p>
          </Link>
        </div>
        <div>
          <img
            src="/assets/img/logos/logo-ror.png"
            alt="Logo"
            id="header-logo"
          />
        </div>
      </header>

      {/* CARD FEATURED */}
      <Card
        title="Forte questo mese!"
        bottomMessage="Ricordati di refreshare la pagina ogni tanto..."
      >
        {recentProducts[0] && (
          <div className="flex featured-container">
            <div className="featured-info">
              <h1>{recentProducts[0].name}</h1>
              <p>{recentProducts[0].description}</p>
              <hr />
              <div className="original-price-block">
                <p>Prezzo originale:</p>
                <h4>{recentProducts[0].price}€</h4>
              </div>
              <div className="promotion-price-block">
                <p>Prezzo promozionale:</p>
                <h4>{recentProducts[0].promotion_price}€</h4>
              </div>
              <hr />

              <Link to={`/products/${recentProducts[0].slug}`}>
                <button className="btn btn-hover">
                  <img
                    src="/assets/img/folders/folder-search.png"
                    alt="Folder open"
                  />
                  Scopri di più
                </button>
              </Link>

              <div className="cart-controls">
                <label htmlFor="qty" className="xp-label">
                  Quantità:
                </label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  value={quantities[recentProducts[0].id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(recentProducts[0].id, e.target.value)
                  }
                />
                <button
                  className="btn btn-cart"
                  onClick={() =>
                    handleAddToCart(
                      recentProducts[0],
                      quantities[recentProducts[0].id] || 1
                    )
                  }
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>

            <div className="featured-image">
              <div className="featured-image-content flex">
                <p>-50.00€</p>
                <img
                  src={recentProducts[0].thumbnail_url}
                  alt="Product Headphone"
                  id="featured-product-image"
                />
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* ULTIME AGGIUNTE */}
      <Card
        title="Ultime aggiunte"
        bottomMessage="I monitor OLED hanno il nero assoluto"
      >
        <div className="products-gallery">
          {recentProducts.slice(0, visibleRecentCount).map((product) => (
            <div key={product.id} className="products-gallery-item">
              <FolderImage thumbnail={product.thumbnail_url} />
              <p>{product.name}</p>

              <Link to={`/products/${product.slug}`}>
                <button className="btn btn-hover">
                  <img
                    src="/assets/img/folders/folder-search.png"
                    alt="Folder search"
                  />
                  Guarda il prodotto
                </button>
              </Link>

              <div className="cart-controls">
                <label htmlFor="qty" className="xp-label">
                  Quantità:
                </label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  value={quantities[product.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                />
                <button
                  className="btn btn-cart"
                  onClick={() =>
                    handleAddToCart(product, quantities[product.id] || 1)
                  }
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleRecentCount < recentProducts.length && (
          <button
            className="btn btn-hover btn-load-more"
            onClick={() => setVisibleRecentCount((prev) => prev + 4)}
          >
            Carica altri prodotti ↓
          </button>
        )}
      </Card>

      {/* I PIÙ VENDUTI */}
      <Card
        title="I più venduti"
        bottomMessage="Se vuoi programmare IA, comprati GPU molto potenti... e multiple!"
      >
        <div className="products-gallery">
          {bestSellerProducts
            .slice(0, visibleBestSellerCount)
            .map((product) => (
              <div key={product.id} className="products-gallery-item">
                <FolderImage thumbnail={product.thumbnail_url} />
                <p>{product.name}</p>

                <Link to={`/products/${product.slug}`}>
                  <button className="btn btn-hover">
                    <img
                      src="/assets/img/folders/folder-search.png"
                      alt="Folder search"
                    />
                    Guarda il prodotto
                  </button>
                </Link>

                <div className="cart-controls">
                  <label htmlFor="qty" className="xp-label">
                    Quantità:
                  </label>
                  <input
                    id="qty"
                    type="number"
                    min="1"
                    value={quantities[product.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                  />
                  <button
                    className="btn btn-cart"
                    onClick={() =>
                      handleAddToCart(product, quantities[product.id] || 1)
                    }
                  >
                    Aggiungi al carrello
                  </button>
                </div>
              </div>
            ))}
        </div>

        {visibleBestSellerCount < bestSellerProducts.length && (
          <button
            className="btn btn-hover btn-load-more"
            onClick={() => setVisibleBestSellerCount((prev) => prev + 4)}
          >
            Carica altri prodotti ↓
          </button>
        )}
      </Card>
    </main>
  );
}
