import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ThreeDView from "../components/ThreeDView";
import "../styles/Pages.css";

export default function Home() {
  const heroRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-3d">
          <ThreeDView />
        </div>
        <div className="hero-content" ref={heroRef}>
          <h1 className="hero-title">
            The Future of <span className="gradient-text">Digital Tools</span>
          </h1>
          <p className="hero-subtitle">
            Discover premium software and digital assets crafted for creators and developers
          </p>
          <Link to="/products" className="cta-button">
            Explore Products
            <span className="button-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="section-title fade-in">Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">🚀</div>
              <h3>Premium Quality</h3>
              <p>Hand-picked tools and assets for professionals</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">⚡</div>
              <h3>Instant Access</h3>
              <p>Download immediately after purchase</p>
            </div>
            <div className="feature-card fade-in">
              <div className="feature-icon">💎</div>
              <h3>Exclusive Content</h3>
              <p>Unique tools you won't find anywhere else</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
