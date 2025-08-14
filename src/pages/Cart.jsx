import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "../styles/Pages.css";

export default function Cart() {
  const { cart, removeFromCart, addToCart } = useContext(CartContext);
  const [removingItems, setRemovingItems] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Parallax mouse effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleRemoveItem = (id) => {
    setRemovingItems(prev => new Set([...prev, id]));
    
    // Add delay for animation
    setTimeout(() => {
      removeFromCart(id);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 500);
  };

  const updateQuantity = (item, change) => {
    if (change > 0) {
      addToCart(item);
    } else if (item.quantity > 1) {
      // Decrease quantity (you might need to add this function to your context)
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      // For now, we'll simulate this by removing and re-adding
      removeFromCart(item.id);
      for (let i = 0; i < item.quantity - 1; i++) {
        addToCart(item);
      }
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateTax = () => {
    return (parseFloat(calculateSubtotal()) * 0.1).toFixed(2);
  };

  const calculateTotal = () => {
    return (parseFloat(calculateSubtotal()) + parseFloat(calculateTax())).toFixed(2);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        {/* Animated Background Elements */}
        <div className="cart-background">
          <div 
            className="floating-shape shape-1"
            style={{
              transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
            }}
          />
          <div 
            className="floating-shape shape-2"
            style={{
              transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`
            }}
          />
        </div>

        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-cart-title">Your cart is empty</h2>
          <p className="empty-cart-subtitle">
            Discover our amazing collection of premium digital tools
          </p>
          <Link to="/products" className="continue-shopping-btn">
            <span>Continue Shopping</span>
            <span className="btn-arrow">→</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Animated Background Elements */}
      <div className="cart-background">
        <div 
          className="floating-shape shape-1"
          style={{
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`
          }}
        />
        <div 
          className="floating-shape shape-2"
          style={{
            transform: `translate(${mousePosition.x * -0.3}px, ${mousePosition.y * -0.3}px)`
          }}
        />
        <div 
          className="floating-shape shape-3"
          style={{
            transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * -0.4}px)`
          }}
        />
      </div>

      <div className="cart-container">
        {/* Header Section */}
        <div className="cart-header">
          <h1 className="cart-title">
            Your <span className="gradient-text">Cart</span>
          </h1>
          <p className="cart-subtitle">
            {cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className={`cart-item ${removingItems.has(item.id) ? 'removing' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="item-image">
                  <img 
                    src={item.image || `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=150&h=150&fit=crop&auto=format`}
                    alt={item.name}
                  />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-description">
                    {item.description ? item.description.substring(0, 80) + '...' : 'Premium digital tool'}
                  </p>
                  <div className="item-category">{item.category || 'Digital Tool'}</div>
                </div>

                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item, -1)}
                    className="quantity-btn"
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item, 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="item-price">
                  <span className="price-per-item">${item.price}</span>
                  {item.quantity > 1 && (
                    <span className="total-price">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="remove-btn"
                  disabled={removingItems.has(item.id)}
                >
                  {removingItems.has(item.id) ? (
                    <div className="removing-spinner"></div>
                  ) : (
                    '🗑️'
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="summary-header">
              <h3>Order Summary</h3>
            </div>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%)</span>
                <span>${calculateTax()}</span>
              </div>
              <div className="summary-row shipping">
                <span>Shipping</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>

            <Link to="/checkout" className="checkout-btn">
              <span>Proceed to Checkout</span>
              <span className="checkout-arrow">→</span>
            </Link>

            <Link to="/products" className="continue-shopping-link">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
