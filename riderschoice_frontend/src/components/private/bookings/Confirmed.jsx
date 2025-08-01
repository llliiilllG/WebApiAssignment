import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye, FaTimes, FaSpinner } from "react-icons/fa";
import axios from "axios";

const Confirmed = () => {
  const [confirmedBookings, setConfirmedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch confirmed bookings
  useEffect(() => {
    fetchConfirmedBookings();
  }, []);

  const fetchConfirmedBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/bookings");
      const allBookings = response.data;
      const confirmed = allBookings.filter(booking => booking.status === "confirmed");
      setConfirmedBookings(confirmed);
    } catch (error) {
      console.error("Error fetching confirmed bookings:", error);
      setError("Failed to fetch confirmed bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleCancel = async (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this confirmed booking?")) {
      try {
        await axios.put(`http://localhost:3000/api/v1/bookings/${bookingId}/status`, {
          status: "cancelled"
        });
        alert("Booking cancelled successfully!");
        fetchConfirmedBookings(); // Refresh the list
      } catch (error) {
        console.error("Error cancelling booking:", error);
        alert("Failed to cancel booking");
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBooking(null);
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
          onClick={fetchConfirmedBookings}
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
        <h2 className="text-2xl font-semibold">Confirmed Orders</h2>
        <button 
          onClick={fetchConfirmedBookings}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2"
        >
          <FaSpinner className="text-sm" />
          Refresh
        </button>
      </div>

      {confirmedBookings.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No confirmed orders found</p>
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
              {confirmedBookings.map((booking) => (
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
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-100"
                        onClick={() => handleViewDetails(booking)}
                        title="View Details"
                      >
                        <FaEye size={16} />
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

      {/* Booking Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Booking Details</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Customer Name</label>
                  <p className="text-sm text-gray-900">{selectedBooking.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="text-sm text-gray-900">{selectedBooking.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="text-sm text-gray-900">{selectedBooking.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tickets</label>
                  <p className="text-sm text-gray-900">{selectedBooking.tickets}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
                  <p className="text-sm text-gray-900">{selectedBooking.pickupLocation || "N/A"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <p className="text-sm text-gray-900 capitalize">{selectedBooking.paymentMethod}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                    {selectedBooking.status}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Booking Date</label>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedBooking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              {selectedBooking.packageId && (
                <div className="border-t pt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Bike Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bike Name</label>
                      <p className="text-sm text-gray-900">{selectedBooking.packageId.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <p className="text-sm text-gray-900">${selectedBooking.packageId.price}</p>
                    </div>
                    {selectedBooking.packageId.description && (
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <p className="text-sm text-gray-900">{selectedBooking.packageId.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Confirmed;
