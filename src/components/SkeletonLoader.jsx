import "./SkeletonLoader.css";

export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-image"></div>
    <div className="skeleton skeleton-title"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-price"></div>
  </div>
);

export const SkeletonGrid = ({ count = 8 }) => (
  <div className="product-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);
