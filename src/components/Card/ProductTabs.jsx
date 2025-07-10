import { useState, useEffect } from "react";
import ImagePopup from "../ui/imagePopup";

export default function ProductTabs({
  product,
  displayPrice,
  isNewArrival,
  onAddToCart,
}) {
  const [activeTab, setActiveTab] = useState("dettagli");

  const [imageList, setImageList] = useState([]);
  const [popupImage, setPopupImage] = useState(null);
  const hasPromo =
    parseFloat(product.promotion_price) > 0 &&
    parseFloat(product.promotion_price) < parseFloat(product.price);

  const sanitizeProductName = (name) =>
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const productFolderName = sanitizeProductName(product.name);
        const res = await fetch(
          `http://localhost:3000/product-images/${productFolderName}`
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setImageList(data.map((img) => `http://localhost:3000${img}`));
        } else {
          setImageList([product.thumbnail_url]);
        }
      } catch (err) {
        console.error("Errore nel caricamento immagini prodotto:", err);
        setImageList([product.thumbnail_url]);
      }
    };

    fetchImages();
  }, [product.name]);

  return (
    <>
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
                          Prezzo originale:{" "}
                          {parseFloat(product.price).toFixed(2)}€
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
              <button className="btn" onClick={() => onAddToCart(product)}>
                Aggiungi al carrello +
              </button>
            </>
          )}

          {activeTab === "immagini" && (
            <div className="product-img-grid">
              {imageList.map((imgUrl, index) => (
                <div
                  className="product-img-item"
                  key={index}
                  onClick={() => setPopupImage(imgUrl)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} immagine ${index + 1}`}
                  />
                  {isNewArrival && index === 0 && (
                    <span className="badge-new">NUOVO!</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RENDER POPUP SOLO SE popupImage ESISTE */}
      {popupImage && (
        <div style={{ position: "absolute", zIndex: 1000 }}>
          <ImagePopup
            imageUrl={popupImage}
            onClose={() => setPopupImage(null)}
          />
        </div>
      )}
    </>
  );
}
