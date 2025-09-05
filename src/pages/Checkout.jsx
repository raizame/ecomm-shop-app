import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cart = [], placeOrder } = useCart();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const total = (cart || []).reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !address) return alert("Please fill all fields");

    // call placeOrder(name, address, payment) as implemented in context
    placeOrder(name, address, "Cash on Delivery");
    navigate("/orders");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {(!cart || cart.length === 0) ? (
        <p>Your cart is empty. Add some products first.</p>
      ) : (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <p className="checkout-total">Total: ${total.toFixed(2)}</p>
          <button type="submit" className="btn">Place Order (COD)</button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
