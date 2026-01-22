import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <div className="product-image-wrapper">
        <img src={product.thumbnail} alt={product.title} className="product-image" />
      </div>
      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <div className="product-footer">
          <p className="price">${product.price.toFixed(2)}</p>
          <span className="rating">⭐ 4.5</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
