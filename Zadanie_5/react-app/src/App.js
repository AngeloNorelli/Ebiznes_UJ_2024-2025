import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './components/Products';
import Payment from './components/Payment';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import { CartProvider } from './components/CartContext';
import { useState } from 'react';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setShowLogin(false);
    setIsLoggedIn(true);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

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
            {!isLoggedIn ? (
              <button onClick={() => {setShowLogin((prev) => !prev); setShowRegister(false);}}>
                {showLogin ? 'Close' : 'Log in'}
              </button>
            ) : (
              <button onClick={handleLogout}>
                Log out
              </button>
            )}
          </nav>
          {showLogin && (
            <div className="login-modal">
              {!showRegister ? (
                <>
                  Log in
                  <Login onLogin={handleLogin} />
                  Don't have an account?
                  <button onClick={() => setShowRegister(true)}>
                    Register
                  </button>
                  </>
              ) : (
                <>
                  Register
                  <Register onRegister={() => { setShowLogin(true); }} />
                  Already have an account?
                  <button onClick={() => setShowRegister(false)}>
                    Log in
                  </button>
                </>
              )}
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
