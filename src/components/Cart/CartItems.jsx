export default function CartItems({
  cart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
}) {
  return (
    <div className="container">
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
              <div className="shopping-cart-body">
                <h5>{item.name}</h5>

                {hasOriginalPrice ? (
                  <>
                    <p>
                      <span
                        style={{
                          textDecoration: "line-through",
                          color: "gray",
                          fontSize: "20px",
                        }}
                      >
                        Prezzo originale: €
                        {parseFloat(item.price_original).toFixed(2)}
                      </span>
                    </p>
                    <p>
                      <strong style={{ color: "red", fontSize: "23px" }}>
                        Prezzo scontato: €{parseFloat(item.price).toFixed(2)}
                      </strong>
                    </p>
                  </>
                ) : (
                  <p>Prezzo: €{parseFloat(item.price).toFixed(2)}</p>
                )}

                <p style={{ marginTop: "0.5rem", fontSize: "28px" }}>
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
                  <label htmlFor="cart-qty" className="xp-label cart-qty-label">
                    Quantità:
                  </label>
                  <input
                    id="cart-qty"
                    value={item.quantity}
                    type="number"
                    min={1}
                    readOnly
                  />
                  <button
                    className="btn btn-hover"
                    onClick={() => increaseQuantity(item.id)}
                    type="button"
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-hover"
                  onClick={() => removeFromCart(item.id)}
                >
                  Rimuovi dal carrello
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
