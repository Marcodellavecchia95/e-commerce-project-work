import React, { useCallback, useState, useEffect } from "react";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import "../../assets/css/CheckoutForm.css";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const { cart } = useContext(CartContext);
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("http://localhost:3000/stripe/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }))
      ),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [cart]);

  const options = { fetchClientSecret };

  return (
    <div className="checkout-wrapper">
      <div className="container">
        <div id="checkout">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
