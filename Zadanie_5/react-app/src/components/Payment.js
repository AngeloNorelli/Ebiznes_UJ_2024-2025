import React from "react";
import axios from "axios";
import { useCart } from "./CartContext";
import "../styles/Payment.css";

const Payment = () => {
  const { cart, clearCart, getTotalCost } = useCart();
  const [paymentMethod, setPaymentMethod] = React.useState("creditCard");

  const handlePayment = () => {
    const totalCost = getTotalCost();

    const paymentPayload = {
      cart,
      amount: totalCost,
      method: paymentMethod,
    };

    axios.post("http://localhost:8080/payments", paymentPayload)
      .then((response) => {
        console.log("Payment successful:", response.data);
        alert("Payment successful!");
        clearCart();
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
        alert("Payment failed. Please try again.");
      });
  };

  return (
    <div className="Payment">
      <h1>Payment</h1>
      <p>Total Cost: {getTotalCost()} PLN</p>
      <label>
        Payment Method:{' '}
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} >
          <option value="creditCard">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="bankTransfer">Bank Transfer</option>
        </select>
      </label>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Payment;