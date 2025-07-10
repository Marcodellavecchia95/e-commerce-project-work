import { useCart } from "../../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

export default function MiniProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  console.log("MiniProductCard ricevuto:", product);

  if (!product || !product.name || !product.price) return null;

  const {
    slug = "",
    name = "Prodotto Sconosciuto",
    category = "Generico",
    price = 0,
    discountPrice = null,
    image = "/assets/img/products/placeholder.png",
  } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleViewDetails = () => {
    if (slug) navigate(`/products/${slug}`);
  };

  const displayPrice = discountPrice ? (
    <>
      <span
        className="clippy-chat-old-price"
        style={{ textDecoration: "line-through", color: "red" }}
      >
        {price.toFixed(2)}€
      </span>{" "}
      <span
        className="clippy-chat-discount-price"
        style={{ color: "green", fontWeight: "bold" }}
      >
        {discountPrice.toFixed(2)}€
      </span>
    </>
  ) : (
    <span>{price.toFixed(2)}€</span>
  );

  return (
    <div className="clippy-chat-mini-product-card">
      <img
        src={image}
        alt={name}
        className="clippy-chat-mini-product-image"
        style={{ width: "80px", height: "80px", objectFit: "cover" }}
      />
      <div className="clippy-chat-product-info">
        <h4>{name}</h4>
        <p>Categoria: {category}</p>
        <p>Prezzo: {displayPrice}</p>
        <div className="clippy-chat-actions">
          <button onClick={handleViewDetails} className="btn btn-hover">
            Mostra
          </button>
          <button
            onClick={handleAddToCart}
            className="btn btn-hover"
            title="Aggiungi al carrello"
          >
            🛒
          </button>
        </div>
      </div>
    </div>
  );
}
