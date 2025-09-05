import React from "react";
import { useCart } from "../context/CartContext.jsx";
import CartItem from "../components/CartItem.jsx";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart = [] } = useCart();

  const total = (cart || []).reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0);

  return (
    <div className="container">
      <h1 className="page-title">Your Cart</h1>

      {(!cart || cart.length === 0) ? (
        <p>Your cart is empty. <Link to="/">Go shopping</Link></p>
      ) : (
        <>
          <div style={{ display: "grid", gap: 12 }}>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <h3>Total: ${total.toFixed(2)}</h3>
            <Link to="/checkout"><button className="btn">Proceed to Checkout</button></Link>
          </div>
        </>
      )}
    </div>
  );
}
