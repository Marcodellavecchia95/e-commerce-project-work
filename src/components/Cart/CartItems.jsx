export default function CartItems({ cart, removeFromCart }) {
  return (
    <div className="cart-items">
      {cart.map((item) => {
        return (
          <div className="cart-card">
            <img
              src={item.thumbnail_url}
              alt={item.name}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">Prezzo: €{item.price.toFixed(2)}</p>
              <button
                className="btn btn-danger"
                onClick={() => removeFromCart(item.id)}
              >
                Rimuovi dal carrello
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
