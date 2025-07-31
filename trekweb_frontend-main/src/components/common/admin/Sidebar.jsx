import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Home,
  LogOut,
  Menu,
  Package,
  Star,
  Users
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Confirmed from "../../private/bookings/Confirmed";
import Pending from "../../private/bookings/Pending";
import AddPackages from "../../private/packages/AddPackages";
import ManageBikes from "../../private/packages/ManagePackages";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const navigate = useNavigate(); // Hook for navigation

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("role"); // Remove token from storage
    window.location.href = "/login"; // Correct way to redirect
};


  return (
    <div className={`h-screen ${isCollapsed ? "w-20" : "w-64"} bg-gradient-to-b from-green-600 to-green-800 text-white flex flex-col p-4 transition-all duration-300`}>
      
      {/* Sidebar Toggle Button */}
      <button onClick={toggleSidebar} className="mb-4 self-end hover:bg-green-700 p-2 rounded-lg transition-colors">
        {isCollapsed ? <Menu size={24} /> : <ChevronLeft size={24} />}
      </button>

      <h2 className={`text-xl font-bold mb-6 ${isCollapsed ? "hidden" : "block"}`}>Admin Panel</h2>

      <nav className="flex-1 space-y-2">
        <Link to="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition-colors">
          <Home size={20} />
          {!isCollapsed && <span>Dashboard</span>}
        </Link>

        <div>
          <button onClick={() => toggleMenu("packages")} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-green-700 transition-colors">
            <div className="flex items-center gap-3">
              <Package size={20} />
              {!isCollapsed && <span>Bikes</span>}
            </div>
            {!isCollapsed && (openMenus.packages ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.packages && (
            <div className="ml-6 space-y-1 mt-1">
              <Link onClick={AddPackages} to="/admin/addpackages" className="block p-2 rounded hover:bg-green-700 transition-colors">Add New Bike</Link>
              <Link onClick={ManageBikes} to="/admin/managepackages" className="block p-2 rounded hover:bg-green-700 transition-colors">Manage Bikes</Link>
            </div>
          )}
        </div>

        <div>
          <button onClick={() => toggleMenu("bookings")} className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-green-700 transition-colors">
            <div className="flex items-center gap-3">
              <Calendar size={20} />
              {!isCollapsed && <span>Orders</span>}
            </div>
            {!isCollapsed && (openMenus.bookings ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
          </button>
          {!isCollapsed && openMenus.bookings && (
            <div className="ml-6 space-y-1 mt-1">
              <Link onClick={Pending} to="/admin/pending" className="block p-2 rounded hover:bg-green-700 transition-colors">Pending</Link>
              <Link onClick={Confirmed} to="/admin/confirmed" className="block p-2 rounded hover:bg-green-700 transition-colors">Confirmed</Link>
            </div>
          )}
        </div>

        <Link to="/admin/payments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition-colors">
          <CreditCard size={20} />
          {!isCollapsed && <span>Payments</span>}
        </Link>

        <Link to="/admin/users" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition-colors">
          <Users size={20} />
          {!isCollapsed && <span>Users</span>}
        </Link>

        <Link to="/admin/reviews" className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-700 transition-colors">
          <Star size={20} />
          {!isCollapsed && <span>Reviews</span>}
        </Link>
      </nav>

      {/* Logout Button */}
      <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition-colors bg-red-500">
        <LogOut size={20} />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
