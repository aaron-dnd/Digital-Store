import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Pages.css";

export default function Checkout() {
  const { cart } = useContext(CartContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    // Billing Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    // Payment
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const [errors, setErrors] = useState({});

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

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateTax = () => {
    return (parseFloat(calculateSubtotal()) * 0.1).toFixed(2);
  };

  const calculateTotal = () => {
    return (parseFloat(calculateSubtotal()) + parseFloat(calculateTax())).toFixed(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.phone) newErrors.phone = 'Phone is required';
    }
    
    if (step === 2) {
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    }
    
    if (step === 3) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleCheckout = async () => {
    if (!validateStep(3)) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setIsCompleted(true);
    setCurrentStep(4);
  };

  const steps = [
    { number: 1, title: 'Personal Info', icon: '👤' },
    { number: 2, title: 'Shipping', icon: '🚚' },
    { number: 3, title: 'Payment', icon: '💳' },
    { number: 4, title: 'Complete', icon: '✅' }
  ];

  return (
    <div className="checkout-page">
      {/* Animated Background Elements */}
      <div className="checkout-background">
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

      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-header">
          <h1 className="checkout-title">
            <span className="gradient-text">Secure</span> Checkout
          </h1>
          
          {/* Progress Steps */}
          <div className="progress-steps">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`step ${currentStep >= step.number ? 'active' : ''} ${currentStep > step.number ? 'completed' : ''}`}
              >
                <div className="step-icon">
                  {currentStep > step.number ? '✓' : step.icon}
                </div>
                <span className="step-title">{step.title}</span>
                {index < steps.length - 1 && (
                  <div className={`step-connector ${currentStep > step.number ? 'completed' : ''}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-content">
          {/* Form Section */}
          <div className="checkout-form">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="form-step" key="step1">
                <h3 className="step-heading">Personal Information</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={errors.firstName ? 'error' : ''}
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? 'error' : ''}
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep === 2 && (
              <div className="form-step" key="step2">
                <h3 className="step-heading">Shipping Address</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={errors.address ? 'error' : ''}
                      placeholder="Enter your street address"
                    />
                    {errors.address && <span className="error-text">{errors.address}</span>}
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? 'error' : ''}
                      placeholder="Enter your city"
                    />
                    {errors.city && <span className="error-text">{errors.city}</span>}
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={errors.state ? 'error' : ''}
                      placeholder="Enter your state"
                    />
                    {errors.state && <span className="error-text">{errors.state}</span>}
                  </div>
                  <div className="form-group">
                    <label>ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className={errors.zipCode ? 'error' : ''}
                      placeholder="Enter ZIP code"
                    />
                    {errors.zipCode && <span className="error-text">{errors.zipCode}</span>}
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select name="country" value={formData.country} onChange={handleInputChange}>
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment Information */}
            {currentStep === 3 && (
              <div className="form-step" key="step3">
                <h3 className="step-heading">Payment Information</h3>
                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={errors.cardNumber ? 'error' : ''}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                    />
                    {errors.cardNumber && <span className="error-text">{errors.cardNumber}</span>}
                  </div>
                  <div className="form-group">
                    <label>Expiry Date *</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className={errors.expiryDate ? 'error' : ''}
                      placeholder="MM/YY"
                      maxLength="5"
                    />
                    {errors.expiryDate && <span className="error-text">{errors.expiryDate}</span>}
                  </div>
                  <div className="form-group">
                    <label>CVV *</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className={errors.cvv ? 'error' : ''}
                      placeholder="123"
                      maxLength="4"
                    />
                    {errors.cvv && <span className="error-text">{errors.cvv}</span>}
                  </div>
                  <div className="form-group full-width">
                    <label>Cardholder Name *</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={errors.cardName ? 'error' : ''}
                      placeholder="Name as it appears on card"
                    />
                    {errors.cardName && <span className="error-text">{errors.cardName}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Order Complete */}
            {currentStep === 4 && isCompleted && (
              <div className="form-step completion-step" key="step4">
                <div className="success-animation">
                  <div className="success-icon">✅</div>
                  <h3 className="success-title">Order Complete!</h3>
                  <p className="success-message">
                    Thank you for your purchase! You'll receive a confirmation email shortly.
                  </p>
                  <div className="order-number">
                    Order #: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="form-navigation">
                {currentStep > 1 && (
                  <button onClick={handlePrevious} className="nav-btn prev-btn">
                    ← Previous
                  </button>
                )}
                {currentStep < 3 ? (
                  <button onClick={handleNext} className="nav-btn next-btn">
                    Next →
                  </button>
                ) : (
                  <button 
                    onClick={handleCheckout} 
                    className={`nav-btn checkout-btn ${isProcessing ? 'processing' : ''}`}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="processing-spinner"></div>
                        Processing...
                      </>
                    ) : (
                      'Complete Order'
                    )}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cart.length > 0 && currentStep < 4 && (
            <div className="order-summary">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-items">
                {cart.map((item, index) => (
                  <div key={index} className="summary-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-total">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>${calculateSubtotal()}</span>
                </div>
                <div className="total-row">
                  <span>Tax</span>
                  <span>${calculateTax()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping</span>
                  <span className="free-text">FREE</span>
                </div>
                <div className="total-divider"></div>
                <div className="total-row final-total">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>

              <div className="security-badges">
                <div className="badge">🔒 Secure Payment</div>
                <div className="badge">💳 256-bit SSL</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
