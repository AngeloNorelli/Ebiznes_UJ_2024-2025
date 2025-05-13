import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.product.ID === product.ID);

      if (existingProduct) {
        return prevCart.map((item) =>
          item.product.ID === product.ID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productID) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.ID !== productID)
    );
  };

  const decreaseQuantity = (productID) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.ID === productID
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalCost = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const value = React.useMemo(() => ({
    cart, 
    addToCart, 
    removeFromCart, 
    decreaseQuantity, 
    clearCart,
    getTotalCost
  }), [cart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);