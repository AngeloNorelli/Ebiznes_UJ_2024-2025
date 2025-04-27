import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="Products">
      <div className="ProductsList">
        <h1>Products</h1>
        <div className="ColumnsNames">
          <div>Name</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Actions</div>
        </div>
        <ul>
          {products.map((product) => (
            <li key={product.ID}>
              <div>{product.name}</div> <div>{product.price} PLN</div> <div>{product.stock}</div>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Products;