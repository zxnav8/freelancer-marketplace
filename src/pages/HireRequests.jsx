import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./HireRequests.css";

function HireRequests() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const hireRequestsKey = `hireRequests_${currentUser.email}`;
  const ordersKey = `orders_${currentUser.email}`;
  const notificationsKey = `notifications_${currentUser.email}`;

  const [requests, setRequests] = useState(
    JSON.parse(localStorage.getItem(hireRequestsKey)) || []
  );

  const updateStatus = (id, status) => {
    const updated = requests.map((item) =>
      item.id === id ? { ...item, status } : item
    );

    setRequests(updated);

    localStorage.setItem(
      hireRequestsKey,
      JSON.stringify(updated)
    );

    if (status === "Accepted") {
      const request = updated.find(
        (item) => item.id === id
      );

      const orders =
        JSON.parse(localStorage.getItem(ordersKey)) || [];

      const alreadyExists = orders.some(
        (order) => order.requestId === id
      );

      if (!alreadyExists) {
        orders.unshift({
          id: Date.now(),
          requestId: id,
          clientName: request.clientName,
          freelancerName: request.freelancerName,
          projectTitle: request.projectTitle,
          budget: request.budget,
          deadline: request.deadline,
          status: "Active",
        });

        localStorage.setItem(
          ordersKey,
          JSON.stringify(orders)
        );
      }

      const notifications =
        JSON.parse(
          localStorage.getItem(notificationsKey)
        ) || [];

      notifications.unshift({
        id: Date.now() + 1,
        title: "Order Created",
        message: `Order for "${request.projectTitle}" has been created.`,
        time: new Date().toLocaleString(),
      });

      localStorage.setItem(
        notificationsKey,
        JSON.stringify(notifications)
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="hire-requests">
        <h1>Hire Requests</h1>

        {requests.length === 0 ? (
          <div className="empty-box">
            <h2>No Hire Requests</h2>
            <p>No client has sent any request yet.</p>
          </div>
        ) : (
          <div className="request-list">
            {requests.map((request) => (
              <div
                className="request-card"
                key={request.id}
              >
                <h2>{request.projectTitle}</h2>

                <p>
                  <strong>Client :</strong>{" "}
                  {request.clientName}
                </p>

                <p>
                  <strong>Email :</strong>{" "}
                  {request.email}
                </p>

                <p>
                  <strong>Freelancer :</strong>{" "}
                  {request.freelancerName}
                </p>

                <p>
                  <strong>Budget :</strong> ₹
                  {request.budget}
                </p>

                <p>
                  <strong>Deadline :</strong>{" "}
                  {request.deadline}
                </p>

                <p>
                  <strong>Description :</strong>
                </p>

                <p>{request.description}</p>

                <h3
                  style={{
                    color:
                      request.status ===
                      "Accepted"
                        ? "green"
                        : request.status ===
                          "Rejected"
                        ? "red"
                        : "#f59e0b",
                  }}
                >
                  {request.status}
                </h3>

                {request.status ===
                  "Pending" && (
                  <div className="request-actions">
                    <button
                      className="accept-btn"
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Accepted"
                        )
                      }
                    >
                      Accept
                    </button>

                    <button
                      className="reject-btn"
                      onClick={() =>
                        updateStatus(
                          request.id,
                          "Rejected"
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default HireRequests;
