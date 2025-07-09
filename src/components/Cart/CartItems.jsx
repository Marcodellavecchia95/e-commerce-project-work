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
        const hasOriginalPrice =
          item.price_original && item.price_original > item.price;

        return (
          <div className="cart-card" key={item.id}>
            <img
              src={item.thumbnail}
              alt={item.name}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>

              {hasOriginalPrice ? (
                <>
                  <p className="card-text">
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "#aaa",
                        fontSize: "0.9rem",
                      }}
                    >
                      Prezzo originale: €
                      {parseFloat(item.price_original).toFixed(2)}
                    </span>
                  </p>
                  <p className="card-text">
                    <strong style={{ color: "#d10024", fontSize: "1.1rem" }}>
                      Prezzo scontato: €{parseFloat(item.price).toFixed(2)}
                    </strong>
                  </p>
                </>
              ) : (
                <p className="card-text">
                  Prezzo: €{parseFloat(item.price).toFixed(2)}
                </p>
              )}

              <p className="card-text" style={{ marginTop: "0.5rem" }}>
                Totale: €{(item.price * item.quantity).toFixed(2)}
              </p>

              <div className="cart-item-quantity">
                <button
                  className="btn"
                  onClick={() => decreaseQuantity(item.id)}
                  type="button"
                >
                  -
                </button>
                <input value={item.quantity} type="number" min={1} disabled />
                <button
                  className="btn"
                  onClick={() => increaseQuantity(item.id)}
                  type="button"
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
