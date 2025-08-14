import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 style={{ padding: "1rem" }}>Product not found 😢</h2>;
  }

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{product.name}</h2>
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "300px", height: "auto", marginBottom: "1rem" }}
      />
      <p>{product.description}</p>
      <p><strong>${product.price}</strong></p>
      <button
        onClick={() => addToCart(product)}
        style={{
          background: "#007bff",
          color: "#fff",
          padding: "0.5rem 1rem",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
