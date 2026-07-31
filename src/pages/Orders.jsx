import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Orders.css";

function Orders() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const ordersKey = `orders_${currentUser.email}`;
  const paymentsKey = `payments_${currentUser.email}`;
  const reviewsKey = `reviews_${currentUser.email}`;
  const notificationsKey = `notifications_${currentUser.email}`;

  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem(ordersKey)) || []
  );

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const payments =
    JSON.parse(localStorage.getItem(paymentsKey)) || [];

  const updateStatus = (id, status) => {
    const updatedOrders = orders.map((order) =>
      order.id === id
        ? {
            ...order,
            status,
          }
        : order
    );

    setOrders(updatedOrders);

    localStorage.setItem(
      ordersKey,
      JSON.stringify(updatedOrders)
    );
  };

  const isPaid = (orderId) => {
    return payments.some(
      (payment) =>
        payment.orderId === orderId &&
        payment.status === "Paid"
    );
  };

  const saveReview = () => {
    if (!selectedOrder) return;

    const reviews =
      JSON.parse(localStorage.getItem(reviewsKey)) || [];

    reviews.unshift({
      id: Date.now(),
      orderId: selectedOrder.id,
      projectTitle: selectedOrder.projectTitle,
      clientName: selectedOrder.clientName,
      freelancerName: selectedOrder.freelancerName,
      rating,
      comment,
      date: new Date().toLocaleString(),
    });

    localStorage.setItem(
      reviewsKey,
      JSON.stringify(reviews)
    );

    const notifications =
      JSON.parse(
        localStorage.getItem(notificationsKey)
      ) || [];

    notifications.unshift({
      id: Date.now() + 1,
      title: "New Review",
      message: `${selectedOrder.clientName} reviewed "${selectedOrder.projectTitle}"`,
      time: new Date().toLocaleString(),
    });

    localStorage.setItem(
      notificationsKey,
      JSON.stringify(notifications)
    );

    updateStatus(selectedOrder.id, "Completed");

    setSelectedOrder(null);
    setRating(5);
    setComment("");
  };
    return (
    <>
      <Navbar />

      <div className="orders">
        <h2>My Orders</h2>

        {orders.length === 0 ? (
          <div className="empty-box">
            <h3>No Orders Found</h3>

            <p>
              Accepted hire requests will appear here.
            </p>
          </div>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div
                key={order.id}
                className="order-card"
              >
                <h3>{order.projectTitle}</h3>

                <p>
                  <strong>Client:</strong>{" "}
                  {order.clientName}
                </p>

                <p>
                  <strong>Freelancer:</strong>{" "}
                  {order.freelancerName}
                </p>

                <p>
                  <strong>Budget:</strong> ₹
                  {order.budget}
                </p>

                <p>
                  <strong>Deadline:</strong>{" "}
                  {order.deadline}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  {order.status}
                </p>

                <p>
                  <strong>Payment:</strong>{" "}
                  {isPaid(order.id)
                    ? "✅ Paid"
                    : "❌ Pending"}
                </p>

                {!isPaid(order.id) ? (
                  <button
                    className="pay-btn"
                    onClick={() =>
                      navigate("/payment", {
                        state: { order },
                      })
                    }
                  >
                    Pay Now
                  </button>
                ) : order.status !==
                  "Completed" ? (
                  <button
                    className="complete-btn"
                    onClick={() =>
                      setSelectedOrder(order)
                    }
                  >
                    Complete & Review
                  </button>
                ) : (
                  <button
                    className="complete-btn"
                    disabled
                  >
                    Completed
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {selectedOrder && (
          <div className="review-modal">
            <div className="review-box">
              <h2>Write Review</h2>

              <label>Rating</label>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value))
                }
              >
                <option value={5}>
                  ⭐⭐⭐⭐⭐
                </option>
                <option value={4}>
                  ⭐⭐⭐⭐
                </option>
                <option value={3}>
                  ⭐⭐⭐
                </option>
                <option value={2}>
                  ⭐⭐
                </option>
                <option value={1}>
                  ⭐
                </option>
              </select>

              <label>Comment</label>

              <textarea
                rows="5"
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
              />

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <button
                  className="complete-btn"
                  onClick={saveReview}
                >
                  Submit Review
                </button>

                <button
                  className="delete-btn"
                  onClick={() => {
                    setSelectedOrder(null);
                    setRating(5);
                    setComment("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Orders;