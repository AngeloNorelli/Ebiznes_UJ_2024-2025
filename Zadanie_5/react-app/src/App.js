import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './components/Products';
import Payment from './components/Payment';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Chatbot from './components/Chatbot';
import { CartProvider } from './components/CartContext';
import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  const endpoint = process.env.REACT_APP_API_URL || "http://localhost:8080";

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
                  <p>Log in</p>
                  <Login onLogin={handleLogin} />
                  <p>Don't have an account?</p>
                  <button onClick={() => setShowRegister(true)}>
                    Register
                  </button>
                  <p>Log in using other methods</p>
                  <div className="login-methods">
                    <button
                      className="google-login-btn"
                      onClick={() => window.location.href = `${endpoint}/auth/google/login`}
                      title='Log in with Google'
                    >
                      <FcGoogle size={24}/>
                    </button>
                    <button
                      className="github-login-btn"
                      onClick={() => window.location.href = `${endpoint}/auth/github/login`}
                      title='Log in with Github'
                    >
                      <FaGithub size={24}/>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>Register</p>
                  <Register onRegister={() => { setShowLogin(true); }} />
                  <p>Already have an account?</p>
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
      <Chatbot />
    </CartProvider>
  );
}

export default App;
