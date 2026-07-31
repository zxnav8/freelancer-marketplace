import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const order = location.state?.order;

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  if (!order) {
    return (
      <>
        <Navbar />
        <div className="payment-container">
          <div className="payment-card">
            <h2>No Order Found</h2>

            <button
              className="pay-btn"
              onClick={() => navigate("/orders")}
            >
              Back to Orders
            </button>
          </div>
        </div>
      </>
    );
  }

  const paymentsKey = `payments_${currentUser.email}`;
  const notificationsKey = `notifications_${currentUser.email}`;

  const handlePayment = () => {
    setLoading(true);

    setTimeout(() => {
      const payments =
        JSON.parse(localStorage.getItem(paymentsKey)) || [];

      payments.unshift({
        id: Date.now(),
        orderId: order.id,
        projectTitle: order.projectTitle,
        freelancerName: order.freelancerName,
        clientName: order.clientName,
        amount: order.budget,
        method: paymentMethod,
        status: "Paid",
        date: new Date().toLocaleString(),
      });

      localStorage.setItem(
        paymentsKey,
        JSON.stringify(payments)
      );

      const notifications =
        JSON.parse(
          localStorage.getItem(notificationsKey)
        ) || [];

      notifications.unshift({
        id: Date.now() + 1,
        title: "Payment Successful",
        message: `Payment for "${order.projectTitle}" completed successfully.`,
        time: new Date().toLocaleString(),
      });

      localStorage.setItem(
        notificationsKey,
        JSON.stringify(notifications)
      );

      setLoading(false);

      alert("Payment Successful!");

      navigate("/orders");
    }, 1500);
  };

  return (
    <>
      <Navbar />

      <div className="payment-container">
        <div className="payment-card">
          <h2>Complete Payment</h2>

          <p>
            <strong>Project:</strong>{" "}
            {order.projectTitle}
          </p>

          <p>
            <strong>Freelancer:</strong>{" "}
            {order.freelancerName}
          </p>

          <p>
            <strong>Amount:</strong> ₹{order.budget}
          </p>

          <label>Payment Method</label>

          <select
            value={paymentMethod}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
          >
            <option>UPI</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>Net Banking</option>
          </select>

          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : "Pay Now"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Payment;