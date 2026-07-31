import Navbar from "../components/Navbar";
import "./Notifications.css";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    navigate("/login");
    return null;
  }

  const storageKey = `notifications_${currentUser.email}`;

  const notifications =
    JSON.parse(localStorage.getItem(storageKey)) || [];

  return (
    <>
      <Navbar />

      <div className="notifications">
        <h1>Notifications</h1>

        {notifications.length === 0 ? (
          <div className="notification-box">
            <h2>No Notifications</h2>

            <p>
              You don't have any notifications yet.
            </p>
          </div>
        ) : (
          <div className="notification-list">
            {notifications.map((notification) => (
              <div
                className="notification-card"
                key={notification.id}
              >
                <h3>{notification.title}</h3>

                <p>{notification.message}</p>

                <span>{notification.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Notifications;