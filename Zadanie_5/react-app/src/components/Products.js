import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from './CartContext';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="Products">
      <div className="ProductsList">
        <h1>Products</h1>
        <table className="ProductsTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.ID}>
                <td>{product.name}</td>
                <td>{product.price} PLN</td>
                <td>{product.stock}</td>
                <td>
                  <button onClick={() => addToCart(product)}>Add to Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;