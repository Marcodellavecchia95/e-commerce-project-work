export default function CartItems({ cart, removeFromCart, updateQuantity }) {
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
              <input
                value={item.quantity}
                type="number"
                min={1}
                onChange={(e) =>
                  updateQuantity(item.id, Number(e.target.value))
                }
              />

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
