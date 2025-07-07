import { forwardRef } from "react";
import MiniProductCard from "./MiniProductCard";

const ClippyChat = forwardRef(({ visible, onClose }, ref) => {
  return (
    <div ref={ref} className={`clippy-chat-popup ${!visible ? "hidden" : ""}`}>
      <div className="clippy-header">
        <h2>Clippy</h2>
        <button onClick={onClose} className="clippy-min-btn">
          _
        </button>
      </div>
      <div className="clippy-messages">
        <p>Ciao! Come posso aiutarti oggi?</p>
      </div>
      <div className="clippy-input">
        <input type="text" placeholder="Scrivi un messaggio..." />
        <button>Invia</button>
      </div>
      <MiniProductCard />
    </div>
  );
});

export default ClippyChat;
