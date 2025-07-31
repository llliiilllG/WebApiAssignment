import React from "react";
import { FaBicycle, FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const PackageCard = ({ packageData }) => {
  const imageUrl = packageData.image
    ? `http://localhost:3000/uploads/${packageData.image}`
    : "http://localhost:3000/uploads/default-package.jpg";

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={packageData.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "http://localhost:3000/uploads/default-package.jpg";
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {packageData.category}
          </span>
        </div>
        
        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          <FaHeart size={16} />
        </button>
        
        {/* Rating */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <FaStar className="text-yellow-500 text-sm" />
          <span className="text-sm font-semibold text-gray-800">4.8</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Title and Category */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
              {packageData.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <FaBicycle className="text-green-500" />
              <span>{packageData.category}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
            {packageData.description}
          </p>

          {/* Specifications */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            {packageData.cc && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">{packageData.cc}cc Engine</span>
              </div>
            )}
            {packageData.modelYear && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">{packageData.modelYear} Model</span>
              </div>
            )}
            {packageData.brand && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-gray-600">{packageData.brand}</span>
              </div>
            )}
            {packageData.stockAvailable && packageData.stockAvailable.length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-gray-600">In Stock</span>
              </div>
            )}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="text-2xl font-bold text-green-600">
                ₹{packageData.price?.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 ml-1">Starting</span>
            </div>
            
            <Link
              to={`/packages/${packageData._id}`}
              className="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
