import React from "react";
import axios from "axios";

const Payment = () => {
  const handlePayment = () => {
    axios.post("http://localhost:8080/payments")
      .then((response) => {
        console.log("Payment successful:", response.data);
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
      });
  };

  return (
    <div className="Payment">
      <h1>Payment</h1>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
}

export default Payment;