import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const containerStyle = {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 9999,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    pointerEvents: "none",
  };

  const popupStyle = {
    backgroundColor: "#1d1d1d",
    color: "#fff",
    fontSize: "1.1rem",
    fontWeight: "bold",
    padding: "1rem 2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    pointerEvents: "all",
    animation: "fadeIn 0.3s ease-out",
  };

  return (
    <div style={containerStyle}>
      <div style={popupStyle}>{message}</div>
    </div>
  );
}
