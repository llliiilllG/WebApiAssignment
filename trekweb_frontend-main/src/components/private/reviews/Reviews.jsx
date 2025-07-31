import React, { useState, useEffect } from "react";
import { FaCheck, FaTrash, FaStar, FaRegStar, FaBicycle, FaSpinner } from "react-icons/fa";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  // Fetch reviews from backend
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      setDeleting(reviewId);
      await axios.delete(`http://localhost:3000/api/v1/reviews/${reviewId}`);
      setReviews(reviews.filter(review => review._id !== reviewId));
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Error deleting review. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500 text-sm" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-500 text-sm" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 text-sm" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
        <div className="flex items-center space-x-2">
          <FaBicycle className="text-green-600" />
          <span className="text-sm text-gray-600">{reviews.length} reviews</span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <FaBicycle className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No reviews yet.</p>
          <p className="text-gray-400 text-sm">Reviews will appear here once customers submit them.</p>
        </div>
      ) : (
        /* Reviews Table */
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-xl border border-gray-100">
            <thead>
              <tr className="bg-gradient-to-r from-green-50 to-green-100">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Bike</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Rating</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Review</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <FaBicycle className="text-green-600 text-sm" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{review.name || "Anonymous"}</p>
                        <p className="text-xs text-gray-500">Customer</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {review.packageId?.title || "Unknown Bike"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {review.packageId?.brand || ""}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(parseFloat(review.rating))}
                      </div>
                      <span className="text-sm text-gray-600">({review.rating})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm text-gray-900 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(review.date).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-lg hover:bg-red-50"
                      onClick={() => handleDelete(review._id)}
                      disabled={deleting === review._id}
                      title="Delete Review"
                    >
                      {deleting === review._id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Summary Stats */}
      {reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <FaBicycle className="text-green-600 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                <p className="text-sm text-gray-600">Total Reviews</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {(reviews.reduce((acc, review) => acc + parseFloat(review.rating), 0) / reviews.length).toFixed(1)}
                </p>
                <p className="text-sm text-gray-600">Average Rating</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(review => parseFloat(review.rating) >= 4).length}
                </p>
                <p className="text-sm text-gray-600">4+ Star Reviews</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <FaStar className="text-yellow-500 mr-3" />
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {reviews.filter(review => parseFloat(review.rating) === 5).length}
                </p>
                <p className="text-sm text-gray-600">5 Star Reviews</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
