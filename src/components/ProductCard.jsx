import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

export default function ProductCard({ product, onAddToCart, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const cardRef = useRef();

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePos({ x, y });
    
    // 3D tilt effect
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(${isHovered ? 20 : 0}px)
    `;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setIsAdding(true);
    onAddToCart(product);
    
    // Visual feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Development': 'linear-gradient(135deg, #667eea, #764ba2)',
      'Design': 'linear-gradient(135deg, #f093fb, #f5576c)',
      'AI': 'linear-gradient(135deg, #4facfe, #00f2fe)',
      'Tools': 'linear-gradient(135deg, #43e97b, #38f9d7)'
    };
    return colors[category] || 'linear-gradient(135deg, #667eea, #764ba2)';
  };

  const fallbackImage = `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=400&fit=crop&auto=format`;

  return (
    <div 
      ref={cardRef}
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Animated background gradient */}
      <div 
        className="card-gradient"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(102, 126, 234, 0.3) 0%, transparent 70%)`
        }}
      />
      
      <div className="product-image-container">
        <div className={`image-loader ${imageLoaded ? 'loaded' : ''}`}>
          <div className="loading-spinner"></div>
        </div>
        <img 
          src={imageError ? fallbackImage : product.image}
          alt={product.name}
          className={`product-image ${imageLoaded ? 'loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
        <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
          <div className="overlay-content">
            <Link to={`/product/${product.id}`} className="view-details-btn">
              <span>View Details</span>
              <div className="btn-glow"></div>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="product-info">
        <div 
          className="product-category"
          style={{ background: getCategoryColor(product.category) }}
        >
          {product.category || 'Digital Tool'}
        </div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-footer">
          <div className="price-container">
            <span className="price-label">Price</span>
            <span className="product-price">${product.price}</span>
          </div>
          <div className="rating-container">
            <div className="stars">
              {'★'.repeat(Math.floor(Math.random() * 2) + 4)}
            </div>
            <span className="rating-text">{(Math.random() * 0.5 + 4.5).toFixed(1)}</span>
          </div>
        </div>

        {/* Always Visible Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
          disabled={isAdding}
        >
          {isAdding ? (
            <>
              <div className="btn-spinner"></div>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <span>🛒</span>
              <span>Add to Cart</span>
            </>
          )}
          <div className="btn-ripple"></div>
        </button>
      </div>

      {/* Animated border */}
      <div className="card-border"></div>
    </div>
  );
}
