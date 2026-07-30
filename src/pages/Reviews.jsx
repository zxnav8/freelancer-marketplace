import { useState } from "react";
import Navbar from "../components/Navbar";
import "./Reviews.css";

function Reviews() {
  const [reviews, setReviews] = useState(
    JSON.parse(localStorage.getItem("reviews")) || []
  );

  const deleteReview = (id) => {
    const updatedReviews = reviews.filter(
      (review) => review.id !== id
    );

    setReviews(updatedReviews);

    localStorage.setItem(
      "reviews",
      JSON.stringify(updatedReviews)
    );
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <>
      <Navbar />

      <div className="reviews">

        <h1>Client Reviews</h1>

        <div className="rating-box">
          <h2>⭐ {averageRating} / 5</h2>
          <p>{reviews.length} Reviews</p>
        </div>

        {reviews.length === 0 ? (

          <div className="empty-box">
            <h2>No Reviews Yet</h2>
            <p>
              Reviews from completed orders will appear here.
            </p>
          </div>

        ) : (

          <div className="review-list">

            {reviews.map((review) => (

              <div
                className="review-card"
                key={review.id}
              >

                <h2>{review.projectTitle}</h2>

                <p>
                  <strong>Client :</strong>{" "}
                  {review.clientName}
                </p>

                <p>
                  <strong>Freelancer :</strong>{" "}
                  {review.freelancerName}
                </p>

                <p>
                  <strong>Rating :</strong>{" "}
                  {"⭐".repeat(review.rating)}
                </p>

                <p>
                  <strong>Review :</strong>
                </p>

                <p>{review.comment}</p>

                <p
                  style={{
                    color: "#666",
                    marginTop: "10px",
                  }}
                >
                  {review.date}
                </p>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteReview(review.id)
                  }
                >
                  Delete Review
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </>
  );
}

export default Reviews;