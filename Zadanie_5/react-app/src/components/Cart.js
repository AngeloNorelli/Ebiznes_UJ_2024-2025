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
        <div className="CartList">
          <table className="CartTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.product.ID}>
                  <td>{item.product.name}</td>
                  <td>{item.product.price} PLN</td>
                  <td>x {item.quantity}</td>
                  <td className="Actions">
                    <button onClick={() => decreaseQuantity(item.product.ID)}>-</button>
                    <button onClick={() => removeFromCart(item.product.ID)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;