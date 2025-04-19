import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './components/Products';
import Payment from './components/Payment';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <nav>
            <Link to="/">Products</Link> |
            <Link to="/cart">Cart</Link> |
            <Link to="/payment">Payment</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
