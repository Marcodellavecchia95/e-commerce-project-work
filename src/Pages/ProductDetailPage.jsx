import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import Card from "../components/Card/Card";
import ProductTabs from "../components/Card/ProductTabs";
import Toast from "../components/ui/Toast";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

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
    setShowToast(true);
  };

  return (
    <div className="container">
      {showToast && (
        <Toast
          message="Prodotto aggiunto al carrello!"
          onClose={() => setShowToast(false)}
        />
      )}
      <Card
        title={product.name}
        bottomMessage="I case non servono solo a proteggere i componenti, ma anche a dare loro più spirito cool..."
        onCloseClick={() => navigate(-1)}
      >
        <ProductTabs
          product={product}
          displayPrice={displayPrice}
          isNewArrival={isNewArrival}
          onAddToCart={handleAddToCart}
        />
      </Card>
    </div>
  );
}
