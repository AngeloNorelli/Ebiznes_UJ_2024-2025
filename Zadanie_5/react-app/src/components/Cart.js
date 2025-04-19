import React from 'react';
import { useCart } from './CartContext';
import '../styles/Cart.css';

const Cart = () => {
  const { cart, removeFromCart, decreaseQuantity } = useCart();

  return (
    <div className="Cart">
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.product.id}>
              {item.product.name} - {item.product.price} PLN x {item.quantity}
              <button onClick={() => decreaseQuantity(item.product.id)}>-</button>
              <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;