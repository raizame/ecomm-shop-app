import React, { createContext, useState, useEffect, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const placeOrder = (name, address, payment) => {
    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
    const newOrder = {
      id: Date.now(),
      items: cart,
      name,
      address,
      payment,
      date: new Date().toLocaleString(),
      total,
    };

    setOrders((prev) => [...prev, newOrder]);
    setCart([]); // empty cart after order
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQty, orders, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
