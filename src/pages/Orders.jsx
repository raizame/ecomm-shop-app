import React from "react";
import { useCart } from "../context/CartContext.jsx";

const pickImage = (item) =>
  item && typeof item === "object"
    ? item.image || item.img || item.thumbnail || item.url || null
    : null;

export default function Orders() {
  const { orders = [] } = useCart();

  // sort orders by date (latest first)
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(a?.date || 0);
    const dateB = new Date(b?.date || 0);
    return dateB - dateA; // newer first
  });

  if (!sortedOrders || sortedOrders.length === 0) {
    return (
      <div className="container">
        <h2 className="page-title">Your Orders</h2>
        <p>No orders yet.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 className="page-title">Your Orders</h2>

      <div className="orders-grid">
        {sortedOrders.map((order) => {
          if (!order || typeof order !== "object") return null;

          const items = Array.isArray(order.items) ? order.items : [];

          return (
            <div key={order.id ?? Math.random()} className="order-card">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <strong>Order #{String(order.id ?? "-")}</strong>
                <span>{String(order.date ?? "-")}</span>
              </div>

              <p>
                <strong>Name:</strong> {String(order.name ?? "-")}
              </p>
              <p className="order-address">
                <strong>Address:</strong> {String(order.address ?? "-")}
              </p>
              <p>
                <strong>Payment:</strong> {String(order.payment ?? "-")}
              </p>

              <div style={{ marginTop: 8 }}>
                <strong>Items</strong>
                <ul>
                  {items.length > 0 ? (
                    items.map((item) => {
                      const title = String(item?.title ?? item?.name ?? "Product");
                      const qty = Number(item?.qty) || 1;
                      const price = Number(item?.price) || 0;
                      const img = pickImage(item);

                      return (
                        <li
                          key={item?.id ?? `${title}-${Math.random()}`}
                          className="order-item"
                        >
                          <img
                            src={img || "https://via.placeholder.com/48"}
                            alt={title}
                            className="order-item-img"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/48";
                            }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div
                              style={{
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {title}
                            </div>
                            <div style={{ fontSize: "0.9rem", color: "#444" }}>
                              Qty: {qty} — ${(price * qty).toFixed(2)}
                            </div>
                          </div>
                        </li>
                      );
                    })
                  ) : (
                    <li>No items</li>
                  )}
                </ul>
              </div>

              <div style={{ marginTop: 8, fontWeight: 700 }}>
                Total: ${Number(order.total ?? 0).toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
