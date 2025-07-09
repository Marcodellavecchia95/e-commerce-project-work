import { forwardRef, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessageToDialogflow } from "../../services/dialogflowService.js";
import MiniProductCard from "./MiniProductCard.jsx";

const ClippyChat = forwardRef(({ visible, onClose }, ref) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "clippy", text: "Ciao! Come posso aiutarti oggi?" },
  ]);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessageToDialogflow(input);
      const botText = response.fulfillmentText;

      const botResponse = response.product
        ? {
            sender: "clippy",
            showProductCard: true,
            product: response.product,
          }
        : { sender: "clippy", text: botText };

      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "clippy", text: "Errore nel contattare il bot." },
      ]);
    }

    setInput("");
  };

  return (
    <div ref={ref} className={`clippy-chat-popup ${!visible ? "hidden" : ""}`}>
      <div className="clippy-header">
        <p>Clippy</p>
        <div className="clippy-header-buttons">
          <button onClick={() => setMessages([])} className="clippy-clear-btn">
            Clear
          </button>
          <button onClick={onClose} className="clippy-min-btn">
            X
          </button>
        </div>
      </div>

      <div className="clippy-messages">
        {messages.map((msg, i) =>
          msg.showProductCard ? (
            <MiniProductCard
              key={i}
              product={msg.product}
              onViewDetails={() => navigate(`/product/${msg.product.slug}`)}
            />
          ) : (
            <div
              key={i}
              className={`clippy-msg ${
                msg.sender === "clippy" ? "clippy-bubble" : "user-bubble"
              }`}
            >
              {msg.text}
            </div>
          )
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="clippy-input">
        <input
          type="text"
          placeholder="Scrivi un messaggio..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Invia</button>
      </div>
    </div>
  );
});

export default ClippyChat;
