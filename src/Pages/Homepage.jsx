import { Link } from "react-router-dom";

import Card from "../components/Card/Card";
import FolderImage from "../components/Card/FolderImage";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Homepage() {
  const recentProductsApi = "http://localhost:3000/products/recent";
  const bestSellerProductsApi = "http://localhost:3000/products/best-sellers";

  //STATES
  const [recentProducts, setRecentProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [visibleRecentCount, setVisibleRecentCount] = useState(4);
  const [visibleBestSellerCount, setVisibleBestSellerCount] = useState(4);

  const fetchRecentProducts = () => {
    axios.get(recentProductsApi).then((res) => {
      setRecentProducts(res.data);
      console.log(res.data);
    });
  };

  const fetchBestSellerProducts = () => {
    axios.get(bestSellerProductsApi).then((res) => {
      setBestSellerProducts(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    fetchRecentProducts();
    fetchBestSellerProducts();
  }, []);

  return (
    <main className="container">
      {/* MAIN */}
      <div>
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
      </div>

      {/* CARD FEATURED/HOT THIS MONTH */}
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
                <h4>{recentProducts[0].price}€ </h4>
              </div>
              <div className="promotion-price-block">
                <p>Prezzo promozionale:</p>
                <h4> {recentProducts[0].promotion_price}€</h4>
              </div>
              <hr />
              <button className=" btn btn-hover">
                <img
                  src="/assets/img/folders/folder-search.png"
                  alt="Folder open"
                />
                <Link to={`/products/${recentProducts[0].id}`}>
                  Scopri di più
                </Link>
              </button>
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

      <div>
        {/* ULTIME AGGIUNTE */}
        <Card
          title="Ultime aggiunte"
          bottomMessage="I monitor OLED hanno il nero assoluto"
        >
          <p>Le ultime aggiunte nerd, perfette per un nuovo computer ;)</p>
          <div className="products-gallery">
            {recentProducts
              .slice(0, visibleRecentCount)
              .map((recentProduct) => (
                <div key={recentProduct.id} className="products-gallery-item">
                  <FolderImage />
                  <p>{recentProduct.name}</p>
                  <button className="btn btn-hover">
                    <img
                      src="/assets/img/folders/folder-search.png"
                      alt="Folder search"
                    />
                    <Link to={`/products/${recentProduct.id}`}>
                      Guarda il prodotto
                    </Link>
                  </button>
                </div>
              ))}
          </div>

          {visibleRecentCount < recentProducts.length && (
            <button
              className="btn btn-hover btn-load-more "
              onClick={() => setVisibleRecentCount((prev) => prev + 4)}
            >
              Carica altri prodotti ↓
            </button>
          )}
        </Card>

        {/* I PIù VENDUTI */}
        <Card
          title="I più venduti"
          bottomMessage="Se vuoi programmare IA, comprati GPU molto potenti... e multiple!"
        >
          <p>
            Tra i fan dell'assemblaggio, questi sono i prodotti più popolari:
          </p>
          <div className="products-gallery">
            {bestSellerProducts
              .slice(0, visibleBestSellerCount)
              .map((bestSellerProduct) => (
                <div
                  key={bestSellerProduct.id}
                  className="products-gallery-item"
                >
                  <FolderImage />
                  <p>{bestSellerProduct.name}</p>
                  <button className="btn btn-hover">
                    <img
                      src="/assets/img/folders/folder-search.png"
                      alt="Folder search"
                    />
                    <Link to={`/products/${bestSellerProduct.id}`}>
                      Guarda il prodotto
                    </Link>
                  </button>
                </div>
              ))}
          </div>

          {visibleBestSellerCount < bestSellerProducts.length && (
            <button
              className="btn btn-hover btn-load-more "
              onClick={() => setVisibleBestSellerCount((prev) => prev + 4)}
            >
              Carica altri prodotti ↓
            </button>
          )}
        </Card>
      </div>
    </main>
  );
}
