import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { SkeletonGrid } from "../components/SkeletonLoader";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    api.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    api.get("/products/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to fetch categories:", err));
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar onSearch={setSearchQuery} />
      
      <div className="home-container">
        <h1 className="home-title">Our Products</h1>

        {/* Category Filter */}
        <div className="category-section">
          <button
            className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All Products
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {loading ? (
          <SkeletonGrid count={8} />
        ) : filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No products found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
