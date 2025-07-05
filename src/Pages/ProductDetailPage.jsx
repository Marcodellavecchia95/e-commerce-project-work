import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Errore nel caricamento del prodotto", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Caricamento in corso...</p>;
  if (!product) return <p>Prodotto non trovato.</p>;

  const hasPromo =
    parseFloat(product.promotion_price) > 0 &&
    parseFloat(product.promotion_price) < parseFloat(product.price);

  const displayPrice = hasPromo
    ? parseFloat(product.promotion_price)
    : parseFloat(product.price);

  const isNewArrival = (() => {
    const created = new Date(product.created_at);
    const now = new Date();
    const diff = (now - created) / (1000 * 60 * 60 * 24); // giorni
    return diff <= 15;
  })();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      thumbnail: product.thumbnail_url,
      price: displayPrice,
      quantity: 1,
    });
  };

  return (
    <main>
      <div className="container product-detail">
        <button onClick={() => navigate(-1)} className="btn-back">
          ← Torna ai prodotti
        </button>

        <div className="product-box">
          <div className="product-img-box">
            <img src={`${product.thumbnail_url}`} alt={product.name} />
            {isNewArrival && <span className="badge-new">NUOVO 🔥</span>}
          </div>

          <div className="product-info-box">
            <h1>{product.name}</h1>
            <p>
              <strong>Brand:</strong> {product.brand_name}
            </p>
            <p>
              <strong>Categoria:</strong> {product.category_name}
            </p>
            <p>{product.description}</p>

            <div className="price-box">
              {hasPromo && (
                <span className="price-old">
                  € {parseFloat(product.price).toFixed(2)}
                </span>
              )}
              <span className="price-final">€ {displayPrice.toFixed(2)}</span>
            </div>

            <button className="btn-add" onClick={handleAddToCart}>
              Aggiungi al carrello 🛒
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
        .container.product-detail {
          padding: 2rem;
        }
        .btn-back {
          background: none;
          border: none;
          color: #444;
          margin-bottom: 1rem;
          cursor: pointer;
        }
        .product-box {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .product-img-box img {
          width: 300px;
          border-radius: 8px;
        }
        .badge-new {
          display: inline-block;
          margin-top: 1rem;
          background: #ffd700;
          color: #222;
          padding: 0.3rem 0.6rem;
          font-weight: bold;
          border-radius: 5px;
        }
        .product-info-box {
          max-width: 500px;
        }
        .price-box {
          margin: 1rem 0;
        }
        .price-old {
          text-decoration: line-through;
          color: gray;
          margin-right: 1rem;
        }
        .price-final {
          font-size: 1.5rem;
          font-weight: bold;
          color: #222;
        }
        .btn-add {
          margin-top: 1rem;
          background: #007bff;
          color: white;
          padding: 0.7rem 1.2rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        `}
      </style>
    </main>
  );
}
