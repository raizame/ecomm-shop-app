import React from "react";
import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { updateQty, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-img" />
      <div className="cart-info">
        <h4>{item.title}</h4>
        <p>${item.price.toFixed(2)}</p>
        <input
          type="number"
          min="1"
          value={item.qty}
          onChange={(e) => updateQty(item.id, parseInt(e.target.value))}
        />
        <button onClick={() => removeFromCart(item.id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
