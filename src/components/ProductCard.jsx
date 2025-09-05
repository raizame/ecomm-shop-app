import React from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.title}
        className="product-img"
        onError={(e) => (e.target.src = "https://via.placeholder.com/200")}
      />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <button className="btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
