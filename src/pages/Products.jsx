import React, { useContext, useEffect, useRef, useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";
import "../styles/Pages.css";

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const headerRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Staggered animation for cards
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(50px) scale(0.9)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, index * 150);
    });

    // Parallax mouse effect
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [filter, searchTerm]);

  // Filter products
 // Update the filter logic in your Products.jsx file
const filteredProducts = products.filter(product => {
  const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       product.description.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesFilter = filter === 'all' || product.category.toLowerCase() === filter;
  return matchesSearch && matchesFilter;
});

const categories = ['all', 'development', 'design', 'ai', 'tools'];


  return (
    <div className="products-page">
      {/* Animated Background Elements */}
      <div className="products-background">
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

      <div className="products-container">
        {/* Dynamic Header Section */}
        <div className="products-header" ref={headerRef}>
          <div className="header-content">
            <h1 
              className="products-title"
              style={{
                transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
              }}
            >
              <span className="gradient-text">Premium</span> Digital Tools
            </h1>
            <p className="products-subtitle">
              Discover our curated collection of professional-grade software and digital assets
            </p>
            
            {/* Search Bar */}
            <div className="search-container">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">🔍</div>
            </div>

            {/* Category Filters */}
            <div className="filter-container">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`filter-btn ${filter === category ? 'active' : ''}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid-container">
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="product-wrapper"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={addToCart}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Premium Tools</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">10k+</div>
            <div className="stat-label">Happy Users</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
