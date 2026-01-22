import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (!product) {
    return (
      <>
        <Navbar onSearch={setSearchQuery} />
        <div className="details-container">
          <div className="skeleton-details"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      <div className="details-container">
        <div className="details">
          <div className="product-image-section">
            <img src={product.image} alt={product.title} className="detail-image" />
          </div>

          <div className="product-info-section">
            <p className="breadcrumb">
              {product.category} / {product.title.substring(0, 20)}...
            </p>

            <h1 className="detail-title">{product.title}</h1>

            <div className="rating-section">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="review-count">(128 reviews)</span>
            </div>

            <div className="price-section">
              <span className="detail-price">${product.price.toFixed(2)}</span>
              <span className="stock-status">✓ In Stock</span>
            </div>

            <p className="description">{product.description}</p>

            <div className="purchase-section">
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="qty-btn">
                    −
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="qty-input"
                  />
                  <button onClick={() => setQuantity(quantity + 1)} className="qty-btn">
                    +
                  </button>
                </div>
              </div>

              <button
                className={`add-to-cart-btn ${added ? "added" : ""}`}
                onClick={handleAddToCart}
              >
                {added ? "✓ Added to Cart" : "🛒 Add to Cart"}
              </button>
            </div>

            <div className="info-box">
              <h4>Shipping & Returns</h4>
              <ul>
                <li>Free shipping on orders over $50</li>
                <li>30-day money-back guarantee</li>
                <li>Secure checkout</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
