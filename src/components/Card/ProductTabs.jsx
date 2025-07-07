import { useState } from "react";

export default function ProductTabs({
  product,
  displayPrice,
  isNewArrival,
  onAddToCart,
}) {
  const [activeTab, setActiveTab] = useState("dettagli");

  const hasPromo =
    parseFloat(product.promotion_price) > 0 &&
    parseFloat(product.promotion_price) < parseFloat(product.price);

  return (
    <div className="xp-tabs">
      <div className="xp-tab-buttons">
        <button
          className={activeTab === "dettagli" ? "active" : ""}
          onClick={() => setActiveTab("dettagli")}
        >
          Dettagli
        </button>
        <button
          className={activeTab === "immagini" ? "active" : ""}
          onClick={() => setActiveTab("immagini")}
        >
          Immagini
        </button>
      </div>

      <div className="xp-tab-content">
        {activeTab === "dettagli" && (
          <>
            <img src={product.thumbnail_url} alt={product.name} />
            <div className="product-info-box">
              <div className="general-info-box">
                <p>Informazioni prodotto:</p>
                <div className="general-info">
                  <p>{product.name}</p>
                  <p>Brand: {product.brand_name}</p>
                  <p>Categoria: {product.category_name}</p>
                  <p>{product.description}</p>
                </div>
              </div>
              <div className="price-info-box">
                <div className="price-box">
                  <p>Informazioni prezzo:</p>
                  <div className="price-info">
                    {hasPromo && (
                      <p className="price-original">
                        Prezzo originale: {parseFloat(product.price).toFixed(2)}
                        €
                      </p>
                    )}
                    <p className="price-promotion">
                      Prezzo in Promozione:{" "}
                      <span>{displayPrice.toFixed(2)}€</span>
                    </p>
                  </div>
                </div>
              </div>
              <button className="btn" onClick={onAddToCart}>
                Aggiungi al carrello +
              </button>
            </div>
          </>
        )}

        {activeTab === "immagini" && (
          <div className="product-box">
            <div className="product-img-box">
              <img src={product.thumbnail_url} alt={product.name} />
              {isNewArrival && <span className="badge-new">NUOVO!</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
