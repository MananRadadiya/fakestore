import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
const [_searchQuery, setSearchQuery] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 2000);
  };

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      
      <div className="checkout-container">
        {cart.length === 0 && !orderPlaced ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Continue Shopping
            </button>
          </div>
        ) : orderPlaced ? (
          <div className="order-success">
            <div className="success-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Redirecting...</p>
          </div>
        ) : (
          <div className="checkout-content">
            <div className="cart-items-section">
              <h2>Order Summary</h2>
              <div className="cart-items">
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="item-image" />
                    
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p className="item-price">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="item-quantity">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="qty-btn"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const qty = parseInt(e.target.value) || 1;
                          updateQuantity(item.id, qty);
                        }}
                        className="qty-input"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        +
                      </button>
                    </div>

                    <div className="item-total">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="remove-btn"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary Card */}
            <div className="summary-card">
              <h3>Order Total</h3>
              
              <div className="summary-line">
                <span>Subtotal</span>
                <span>${getTotalPrice()}</span>
              </div>
              
              <div className="summary-line">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              
              <div className="summary-line">
                <span>Tax</span>
                <span>$0.00</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>${getTotalPrice()}</span>
              </div>

              <button className="btn btn-primary btn-block" onClick={handlePlaceOrder}>
                Place Order
              </button>

              <button
                className="btn btn-secondary btn-block"
                onClick={() => navigate("/")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Checkout;
