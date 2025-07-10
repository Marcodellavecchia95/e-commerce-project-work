import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import axios from "axios";
import "../../assets/css/ReturnPage.css";

const ReturnPage = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`http://localhost:3000/stripe/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        console.log(data);
      });
    axios
      .get(
        `http://localhost:3000/stripe/session-status?session_id=${sessionId}`
      )
      .then((res) => {
        const { status, user, paymentMethod, products } = res.data;

        if (status === "complete") {
          axios
            .post("http://localhost:3000/orders", {
              user,
              paymentMethod,
              products,
            })

            .catch((err) => console.error("Errore POST ordine:", err));
        }
      })
      .catch((err) => console.error("Errore GET ordine:", err));
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          Un email di conferma dell'ordine è stata inviata a {customerEmail}.
          Per qualunque chiarimento riguardo all'ordine contattaci a{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};

export default ReturnPage;
