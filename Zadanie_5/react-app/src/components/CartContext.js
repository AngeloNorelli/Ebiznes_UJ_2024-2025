import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
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
      prevCart.filter((item) => item.product.id !== productID)
    );
  };

  const decreaseQuantity = (productID) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productID
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

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      decreaseQuantity, 
      clearCart,
      getTotalCost
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);