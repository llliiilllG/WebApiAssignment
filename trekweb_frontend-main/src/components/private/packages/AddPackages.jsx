import axios from "axios";
import React, { useState } from "react";

const AddBikes = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stockAvailable: [""], // Array for multiple stock entries
    category: "Adventure",
    image: null,
    // New bike-specific fields
    cc: "",
    modelYear: "",
    mileage: "",
    fuelType: "Petrol",
    transmission: "Manual",
    color: "",
    brand: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeArrayField = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
  
    const formDataToSend = new FormData();
  
    Object.keys(formData).forEach((key) => {
      if (key === "stockAvailable") {
        // Filter out empty stock entries and convert to proper format
        const validStock = formData[key].filter(stock => stock && stock.trim() !== "");
        formDataToSend.append(key, JSON.stringify(validStock));
      } else if (key === "image") {
        // Only append image if it exists
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });
  
    try {
      const response = await axios.post("http://localhost:3000/api/v1/package", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      console.log("Bike created successfully:", response.data);
      setMessage("Bike added successfully!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        price: "",
        stockAvailable: [""],
        category: "Adventure",
        image: null,
        cc: "",
        modelYear: "",
        mileage: "",
        fuelType: "Petrol",
        transmission: "Manual",
        color: "",
        brand: "",
      });
    } catch (error) {
      console.error("Error creating bike:", error);
      const errorMessage = error.response?.data?.error || "Error adding bike. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Add New Bike</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Information */}
        <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Bike Name" required className="p-2 border rounded" />
        <input type="text" name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand (e.g., Honda, Yamaha)" required className="p-2 border rounded" />
        <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required className="p-2 border rounded" />
        <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="Color" required className="p-2 border rounded" />
        
        {/* Engine Specifications */}
        <input type="number" name="cc" value={formData.cc} onChange={handleChange} placeholder="Engine CC (e.g., 150, 250)" className="p-2 border rounded" />
        <input type="number" name="modelYear" value={formData.modelYear} onChange={handleChange} placeholder="Model Year (e.g., 2024)" className="p-2 border rounded" />
        <input type="text" name="mileage" value={formData.mileage} onChange={handleChange} placeholder="Mileage (km/l)" className="p-2 border rounded" />
        
        {/* Dropdowns */}
        <select name="category" value={formData.category} onChange={handleChange} className="p-2 border rounded">
          <option value="Adventure">Adventure</option>
          <option value="Luxury">Luxury</option>
          <option value="Budget">Budget</option>
          <option value="Sports">Sports</option>
          <option value="Cruiser">Cruiser</option>
        </select>
        
        <select name="fuelType" value={formData.fuelType} onChange={handleChange} className="p-2 border rounded">
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Electric">Electric</option>
          <option value="Hybrid">Hybrid</option>
        </select>
        
        <select name="transmission" value={formData.transmission} onChange={handleChange} className="p-2 border rounded">
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="CVT">CVT</option>
        </select>
        
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required className="p-2 border rounded col-span-2"></textarea>
        <input type="file" name="image" onChange={handleFileChange} className="p-2 border rounded col-span-2" />

        {/* Stock Available Fields */}
        <div className="col-span-2">
          <h3 className="text-lg font-semibold mb-2">📦 Stock Available</h3>
          {formData.stockAvailable.map((stock, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={stock}
                onChange={(e) => handleArrayChange("stockAvailable", index, e.target.value)}
                placeholder={`Stock Item ${index + 1}`}
                className="p-2 border rounded flex-grow"
              />
              {formData.stockAvailable.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeArrayField("stockAvailable", index)}
                  className="text-white px-2 py-1 rounded"
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("stockAvailable")}
            className="bg-gray-500 text-white px-2 py-1 rounded"
          >
            ➕ Add Stock Item
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
        >
          Add Bike
        </button>
      </form>
    </div>
  );
};

export default AddBikes;


