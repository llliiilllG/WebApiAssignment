import React, { useState, useEffect } from "react";
import { FaBicycle, FaShoppingCart, FaUsers, FaDollarSign, FaChartLine, FaTrophy, FaClock, FaStar, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topBikes, setTopBikes] = useState([]);
  const [error, setError] = useState(null);

  // Fetch real-time data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch data from public endpoints only
      const [packagesRes, reviewsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/v1/package'),
        axios.get('http://localhost:3000/api/v1/reviews')
      ]);

      const packages = packagesRes.data;
      const reviews = reviewsRes.data;

      // Calculate stats (using available data)
      const totalBikes = packages.length;
      const totalReviews = reviews.length;
      
      // Mock data for users and orders since they require authentication
      const totalUsers = Math.floor(Math.random() * 50) + 10; // Mock user count
      const totalOrders = Math.floor(Math.random() * 20) + 5; // Mock order count
      
      // Calculate total revenue from bike prices (mock calculation)
      const totalRevenue = packages.reduce((sum, pkg) => {
        return sum + (pkg.price || 0);
      }, 0) * 0.3; // Assume 30% of bikes are sold

      // Calculate percentage changes
      const userChange = "+12%";
      const bikeChange = totalBikes > 0 ? "+5%" : "0%";
      const orderChange = "+18%";
      const revenueChange = "+23%";

      // Set stats
      setStats([
        { 
          id: 1, 
          title: "Total Users", 
          value: totalUsers.toLocaleString(), 
          icon: <FaUsers size={24} />, 
          color: "bg-gradient-to-r from-green-500 to-green-600", 
          change: userChange, 
          changeType: "positive" 
        },
        { 
          id: 2, 
          title: "Total Bikes", 
          value: totalBikes.toString(), 
          icon: <FaBicycle size={24} />, 
          color: "bg-gradient-to-r from-green-600 to-green-700", 
          change: bikeChange, 
          changeType: "positive" 
        },
        { 
          id: 3, 
          title: "Total Orders", 
          value: totalOrders.toLocaleString(), 
          icon: <FaShoppingCart size={24} />, 
          color: "bg-gradient-to-r from-green-400 to-green-500", 
          change: orderChange, 
          changeType: "positive" 
        },
        { 
          id: 4, 
          title: "Total Revenue", 
          value: `$${totalRevenue.toLocaleString()}`, 
          icon: <FaDollarSign size={24} />, 
          color: "bg-gradient-to-r from-green-700 to-green-800", 
          change: revenueChange, 
          changeType: "positive" 
        },
      ]);

      // Create mock recent orders based on available bikes
      const mockOrders = packages.slice(0, 4).map((pkg, index) => ({
        id: index + 1,
        customer: `Customer ${index + 1}`,
        bike: pkg.title,
        date: new Date(Date.now() - (index * 24 * 60 * 60 * 1000)).toLocaleDateString(),
        status: index % 2 === 0 ? "Confirmed" : "Pending",
        amount: `$${(pkg.price || 0).toLocaleString()}`
      }));

      setRecentOrders(mockOrders);

      // Calculate top bikes based on reviews and popularity
      const bikeStats = packages.map(pkg => {
        const bikeReviews = reviews.filter(review => review.packageId?._id === pkg._id);
        const avgRating = bikeReviews.length > 0 
          ? bikeReviews.reduce((sum, review) => sum + parseFloat(review.rating), 0) / bikeReviews.length 
          : 0;
        
        // Calculate popularity based on reviews and price
        const popularity = bikeReviews.length + (pkg.price ? Math.floor(pkg.price / 10000) : 0);
        
        return {
          name: pkg.title,
          sales: Math.floor(popularity * 0.8) + 10, // Sales based on popularity
          revenue: `$${((Math.floor(popularity * 0.8) + 10) * (pkg.price || 1000)).toLocaleString()}`,
          rating: avgRating.toFixed(1),
          reviews: bikeReviews.length
        };
      });

      // Sort by sales and take top 4
      const topBikesData = bikeStats
        .sort((a, b) => parseInt(a.sales) - parseInt(b.sales))
        .reverse()
        .slice(0, 4);

      setTopBikes(topBikesData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { title: "Add New Bike", icon: <FaBicycle size={20} />, color: "bg-green-500", link: "/admin/addpackages" },
    { title: "View Orders", icon: <FaShoppingCart size={20} />, color: "bg-green-600", link: "/admin/pending" },
    { title: "Analytics", icon: <FaChartLine size={20} />, color: "bg-green-700", link: "#" },
    { title: "Reviews", icon: <FaStar size={20} />, color: "bg-green-800", link: "/admin/reviews" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Admin! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your bike store today.</p>
          <p className="text-sm text-gray-500 mt-1">
            💡 Some data is simulated for demonstration purposes. Real-time data requires admin authentication.
          </p>
        </div>
        <button 
          onClick={fetchDashboardData}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <FaSpinner className={`${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white mb-4`}>
              {action.icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{action.title}</h3>
          </div>
        ))}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className={`${stat.color} p-6 text-white`}>
              <div className="flex items-center justify-between">
                <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                  {stat.icon}
                </div>
                <div className="text-right">
                  <span className={`text-sm px-2 py-1 rounded-full ${stat.changeType === 'positive' ? 'bg-green-400' : 'bg-red-400'}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-green-100 text-sm">{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaClock className="mr-2 text-green-600" />
                Recent Orders
              </h3>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">View All</button>
            </div>
            <div className="overflow-x-auto">
              {recentOrders.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">CUSTOMER</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">BIKE</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">AMOUNT</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-gray-800">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-800">{order.bike}</td>
                        <td className="py-4 px-4 font-semibold text-gray-800">{order.amount}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === "Confirmed" ? "bg-green-100 text-green-800" : 
                            order.status === "Pending" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-red-100 text-red-800"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8">
                  <FaShoppingCart className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No orders yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Performing Bikes */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <FaTrophy className="mr-2 text-green-600" />
                Top Bikes
              </h3>
            </div>
            <div className="space-y-4">
              {topBikes.length > 0 ? (
                topBikes.map((bike, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{bike.name}</p>
                        <p className="text-sm text-gray-500">{bike.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-600">{bike.revenue}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FaBicycle className="text-4xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No bikes available</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
