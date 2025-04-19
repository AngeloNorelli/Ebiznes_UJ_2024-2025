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
          <div className="ColumnsNames">
            <div>Name</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
          </div>
          <ul>
            {cart.map((item) => (
              <li key={item.product.id}>
                <div>{item.product.name}</div> 
                <div>{item.product.price} PLN</div> 
                <div>x {item.quantity}</div>
                <div className="Actions">
                  <button onClick={() => decreaseQuantity(item.product.id)}>-</button>
                  <button onClick={() => removeFromCart(item.product.id)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;