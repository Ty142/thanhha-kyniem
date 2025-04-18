import React, { useEffect } from "react";
import "../css/Popup.css";

const Popup = ({ onClose, message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="popup popup-error">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          ×
        </button>
        <span className="popup-icon">😢</span>
        <h3>{message}</h3>
        <p>Thử nhớ lại coi nà!</p>
      </div>
    </div>
  );
};

export default Popup;
