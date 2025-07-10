import React from "react";
import Card from "../Card/Card";

export default function ImagePopup({ imageUrl, onClose }) {
  return (
    <div className="image-popup-overlay" onClick={onClose}>
      <Card title="Immagine del prodotto" onCloseClick={onClose}>
        <div style={{ textAlign: "center" }}>
          <img
            src={imageUrl}
            alt="Popup"
            style={{
              width: "400px",
              height: "auto",
              cursor: "pointer",
            }}
          />
        </div>
      </Card>
    </div>
  );
}
