import { useCart } from "../../context/CartContext.jsx";

export default function MiniProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const {
    slug,
    name,
    category = "Generico",
    price,
    discountPrice,
    image,
  } = product;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const displayPrice = discountPrice ? (
    <>
      <span className="old-price">{price.toFixed(2)}€</span>{" "}
      <span className="discount-price">{discountPrice.toFixed(2)}€</span>
    </>
  ) : (
    <span>{price.toFixed(2)}€</span>
  );

  return (
    <div className="mini-product-card">
      <img src={image || "/assets/img/products/placeholder.png"} alt={name} />
      <div className="product-info">
        <h4>{name}</h4>
        <p>Categoria: {category}</p>
        <p>Prezzo: {displayPrice}</p>
        <div className="actions">
          <button onClick={onViewDetails} className="btn btn-hover">
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
