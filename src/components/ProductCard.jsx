import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <>
      <div className="product-card">
        <img
          src={product.image}
          alt={product.title}
          className="product-img"
          onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
        />
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className="btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      {showAlert &&
        createPortal(
          <div className="alert">✅ Added to Cart</div>,
          document.body
        )}
    </>
  );
};

export default ProductCard;
