export default function CartItems({
  cart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <div className="cart-items">
      {cart.map((item) => {
        return (
          <div className="cart-card">
            <img
              src={item.thumbnail}
              alt={item.name}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">
                Prezzo: €
                {typeof item.price === "number"
                  ? item.price.toFixed(2)
                  : parseFloat(item.price).toFixed(2)}
              </p>
              <div className="cart-item-quantity">
                <button
                  className="btn"
                  onClick={() => decreaseQuantity(item.id)}
                  type="submit"
                >
                  -
                </button>
                <input value={item.quantity} type="number" min={1} disabled />
                <button
                  className="btn"
                  onClick={() => increaseQuantity(item.id)}
                  type="submit"
                >
                  +
                </button>
              </div>
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
