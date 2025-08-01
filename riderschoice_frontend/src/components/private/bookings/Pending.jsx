import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaCheck, FaTimes, FaSpinner } from "react-icons/fa";
import axios from "axios";

const Pending = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending bookings
  useEffect(() => {
    fetchPendingBookings();
  }, []);

  const fetchPendingBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/bookings");
      const allBookings = response.data;
      const pending = allBookings.filter(booking => booking.status === "pending");
      setPendingBookings(pending);
    } catch (error) {
      console.error("Error fetching pending bookings:", error);
      setError("Failed to fetch pending bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (bookingId) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/bookings/${bookingId}/status`, {
        status: "confirmed"
      });
      alert("Booking approved successfully!");
      fetchPendingBookings(); // Refresh the list
    } catch (error) {
      console.error("Error approving booking:", error);
      alert("Failed to approve booking");
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/bookings/${bookingId}/status`, {
        status: "cancelled"
      });
      alert("Booking cancelled successfully!");
      fetchPendingBookings(); // Refresh the list
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <FaSpinner className="animate-spin text-4xl text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <button 
          onClick={fetchPendingBookings}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Pending Orders</h2>
        <button 
          onClick={fetchPendingBookings}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          <FaSpinner className="text-sm" />
          Refresh
        </button>
      </div>

      {pendingBookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No pending orders found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Bike</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tickets</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pickup Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Payment Method</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Booking Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingBookings.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div>
                      <div className="font-medium">{booking.fullName}</div>
                      <div className="text-gray-500">{booking.email}</div>
                      <div className="text-gray-500">{booking.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {booking.packageId ? (
                      <div>
                        <div className="font-medium">{booking.packageId.name}</div>
                        <div className="text-gray-500">${booking.packageId.price}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Package not found</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.tickets}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{booking.pickupLocation || "N/A"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="capitalize">{booking.paymentMethod}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex space-x-2">
                      <button
                        className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-100"
                        onClick={() => handleApprove(booking._id)}
                        title="Approve"
                      >
                        <FaCheck size={16} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-100"
                        onClick={() => handleCancel(booking._id)}
                        title="Cancel"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Pending;
