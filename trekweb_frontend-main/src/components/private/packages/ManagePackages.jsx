import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const ManageBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [editingBike, setEditingBike] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Fetch bikes from API
  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/package/");
      setBikes(res.data);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
    setLoading(false);
  };

  // Delete bike
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bike?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/package/${id}`);
      setBikes(bikes.filter((bike) => bike._id !== id));
      setMessage("Bike deleted successfully!");
    } catch (error) {
      setMessage("Error deleting bike. Please try again.");
    }
  };

  // Edit bike
  const handleEdit = (bike) => {
    setEditingBike(bike);
    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(editingBike).forEach(key => {
        if (key === 'stockAvailable') {
          formData.append(key, JSON.stringify(editingBike[key]));
        } else if (key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt') {
          formData.append(key, editingBike[key]);
        }
      });

      await axios.put(`http://localhost:3000/api/v1/package/${editingBike._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      setBikes(bikes.map(bike => bike._id === editingBike._id ? editingBike : bike));
      setMessage("Bike updated successfully!");
      setShowEditModal(false);
      setEditingBike(null);
    } catch (error) {
      setMessage("Error updating bike. Please try again.");
    }
  };

  const handleInputChange = (field, value) => {
    setEditingBike({ ...editingBike, [field]: value });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Bikes</h2>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      
      {loading ? (
        <p>Loading bikes...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-green-100">
              <th className="border p-2">Image</th>
              <th className="border p-2">Bike Name</th>
              <th className="border p-2">Brand</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Engine CC</th>
              <th className="border p-2">Model Year</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bikes.length > 0 ? (
              bikes.map((bike) => (
                <tr key={bike._id} className="border hover:bg-gray-50">
                  <td className="border p-2">
                    <img 
                      src={`http://localhost:3000/uploads/${bike.image}`} 
                      alt={bike.title} 
                      className="w-20 h-20 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "http://localhost:3000/uploads/default-package.jpg";
                      }}
                    />
                  </td>
                  <td className="border p-2 font-semibold">{bike.title}</td>
                  <td className="border p-2">{bike.brand || "N/A"}</td>
                  <td className="border p-2 text-green-600 font-bold">₹{bike.price?.toLocaleString()}</td>
                  <td className="border p-2">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                      {bike.category}
                    </span>
                  </td>
                  <td className="border p-2">{bike.cc ? `${bike.cc}cc` : "N/A"}</td>
                  <td className="border p-2">{bike.modelYear || "N/A"}</td>
                  <td className="border p-2">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(bike)} 
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300 flex items-center"
                      >
                        <FaEdit className="mr-1" />
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(bike._id)} 
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300 flex items-center"
                      >
                        <FaTrash className="mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center p-4 text-gray-500">No bikes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {showEditModal && editingBike && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Edit Bike</h3>
            <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={editingBike.title || ""}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Bike Name"
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                value={editingBike.brand || ""}
                onChange={(e) => handleInputChange('brand', e.target.value)}
                placeholder="Brand"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={editingBike.price || ""}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Price"
                className="p-2 border rounded"
                required
              />
              <input
                type="text"
                value={editingBike.color || ""}
                onChange={(e) => handleInputChange('color', e.target.value)}
                placeholder="Color"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={editingBike.cc || ""}
                onChange={(e) => handleInputChange('cc', e.target.value)}
                placeholder="Engine CC"
                className="p-2 border rounded"
              />
              <input
                type="number"
                value={editingBike.modelYear || ""}
                onChange={(e) => handleInputChange('modelYear', e.target.value)}
                placeholder="Model Year"
                className="p-2 border rounded"
              />
              <input
                type="text"
                value={editingBike.mileage || ""}
                onChange={(e) => handleInputChange('mileage', e.target.value)}
                placeholder="Mileage (km/l)"
                className="p-2 border rounded"
              />
              <select
                value={editingBike.category || "Adventure"}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="p-2 border rounded"
              >
                <option value="Adventure">Adventure</option>
                <option value="Luxury">Luxury</option>
                <option value="Budget">Budget</option>
                <option value="Sports">Sports</option>
                <option value="Cruiser">Cruiser</option>
              </select>
              <select
                value={editingBike.fuelType || "Petrol"}
                onChange={(e) => handleInputChange('fuelType', e.target.value)}
                className="p-2 border rounded"
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <select
                value={editingBike.transmission || "Manual"}
                onChange={(e) => handleInputChange('transmission', e.target.value)}
                className="p-2 border rounded"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
                <option value="CVT">CVT</option>
              </select>
              <textarea
                value={editingBike.description || ""}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Description"
                className="p-2 border rounded col-span-2"
                rows="3"
                required
              />
              
              <div className="col-span-2 flex space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
                >
                  Update Bike
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingBike(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBikes;
