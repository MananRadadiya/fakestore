import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import "./styles/variables.css";

const App = () => (
  <ThemeProvider>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </ThemeProvider>
);

export default App;
