import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './components/Products';
import Payment from './components/Payment';
import Cart from './components/Cart';
import Login from './components/Login';
import { CartProvider } from './components/CartContext';
import { useState } from 'react';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <nav>
            <div className="nav-links">
              <Link to="/">Products</Link> |
              <Link to="/cart">Cart</Link> |
              <Link to="/payment">Payment</Link>
            </div>
            <button onClick={() => setShowLogin((prev) => !prev)}>
              {showLogin ? 'Close' : 'Log in'}
            </button>
          </nav>
          {showLogin && (
            <div className="login-modal">
              Log in
              <Login onLogin={() => setShowLogin(false)} />
            </div>
          )}
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
