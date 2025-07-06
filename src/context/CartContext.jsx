import { createContext, useState, useContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Esempio Prodotto",
      thumbnail: "https://via.placeholder.com/150",
      price: 19.99,
      quantity: 1,
    },
    {
      id: 1,
      name: "Esempio Prodotto",
      thumbnail: "https://via.placeholder.com/150",
      price: 19.99,
      quantity: 1,
    },
    {
      id: 1,
      name: "Esempio Prodotto",
      thumbnail: "https://via.placeholder.com/150",
      price: 19.99,
      quantity: 1,
    },
    {
      id: 1,
      name: "Esempio Prodotto",
      thumbnail: "https://via.placeholder.com/150",
      price: 19.99,
      quantity: 1,
    },
  ]);

  const addToCart = (product) => {
    setCart((prev) => {
      const alreadyInCart = prev.find((item) => item.id === product.id);
      if (alreadyInCart) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prev, product];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
