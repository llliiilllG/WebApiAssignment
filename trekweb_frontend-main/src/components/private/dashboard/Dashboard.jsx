import React from "react";
import { FaBicycle, FaShoppingCart, FaUsers, FaDollarSign, FaChartLine, FaTrophy, FaClock, FaStar } from 'react-icons/fa';

const Dashboard = () => {
  // Mock Data (Replace with API Fetch)
  const stats = [
    { id: 1, title: "Total Users", value: "1,240", icon: <FaUsers size={24} />, color: "bg-gradient-to-r from-green-500 to-green-600", change: "+12%", changeType: "positive" },
    { id: 2, title: "Total Bikes", value: "58", icon: <FaBicycle size={24} />, color: "bg-gradient-to-r from-green-600 to-green-700", change: "+5%", changeType: "positive" },
    { id: 3, title: "Total Orders", value: "3,450", icon: <FaShoppingCart size={24} />, color: "bg-gradient-to-r from-green-400 to-green-500", change: "+18%", changeType: "positive" },
    { id: 4, title: "Total Revenue", value: "$12,480", icon: <FaDollarSign size={24} />, color: "bg-gradient-to-r from-green-700 to-green-800", change: "+23%", changeType: "positive" },
  ];

  const recentOrders = [
    { id: 1, customer: "John Doe", bike: "Honda CBR", date: "2024-08-15", status: "Confirmed", amount: "$15,000" },
    { id: 2, customer: "Jane Smith", bike: "Yamaha R1", date: "2024-08-14", status: "Pending", amount: "$20,000" },
    { id: 3, customer: "Mike Johnson", bike: "Kawasaki Ninja", date: "2024-08-13", status: "Canceled", amount: "$18,000" },
    { id: 4, customer: "Emily Davis", bike: "Suzuki GSX-R", date: "2024-08-12", status: "Confirmed", amount: "$22,000" },
  ];

  const topBikes = [
    { name: "Honda CBR", sales: 45, revenue: "$675,000" },
    { name: "Yamaha R1", sales: 38, revenue: "$760,000" },
    { name: "Kawasaki Ninja", sales: 32, revenue: "$576,000" },
    { name: "Suzuki GSX-R", sales: 28, revenue: "$616,000" },
  ];

  const quickActions = [
    { title: "Add New Bike", icon: <FaBicycle size={20} />, color: "bg-green-500", link: "/admin/addpackages" },
    { title: "View Orders", icon: <FaShoppingCart size={20} />, color: "bg-green-600", link: "/admin/pending" },
    { title: "Analytics", icon: <FaChartLine size={20} />, color: "bg-green-700", link: "#" },
    { title: "Reviews", icon: <FaStar size={20} />, color: "bg-green-800", link: "/admin/reviews" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, Admin! 👋</h1>
        <p className="text-gray-600">Here's what's happening with your bike store today.</p>
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
              {topBikes.map((bike, index) => (
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
