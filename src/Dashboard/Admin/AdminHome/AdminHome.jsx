import React from "react";
import { FaUsers, FaClipboardCheck, FaCampground, FaChartBar } from "react-icons/fa";

const AdminHome = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg rounded-lg p-6 mb-8 text-center">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
          Welcome Back, Admin!
        </h1>
        <p className="text-white mt-2 text-lg">
          Manage your platform with ease and efficiency.
        </p>
      </div>

      {/* Admin Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-indigo-500">
          <FaUsers className="text-4xl text-indigo-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-800 mt-2">Total Users</h2>
          <p className="text-3xl font-extrabold text-indigo-500 mt-2">1,245</p>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-purple-500">
          <FaCampground className="text-4xl text-purple-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-800 mt-2">Active Camps</h2>
          <p className="text-3xl font-extrabold text-purple-500 mt-2">35</p>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-green-500">
          <FaClipboardCheck className="text-4xl text-green-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-800 mt-2">Completed Tasks</h2>
          <p className="text-3xl font-extrabold text-green-500 mt-2">567</p>
        </div>
        {/* Stat Card 4 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-yellow-500">
          <FaChartBar className="text-4xl text-yellow-500 mx-auto" />
          <h2 className="text-xl font-bold text-gray-800 mt-2">Performance</h2>
          <p className="text-3xl font-extrabold text-yellow-500 mt-2">82%</p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="text-gray-800 font-medium">
              Approved registration for "Health Camp"
            </span>
            <span className="text-green-500 font-bold">Completed</span>
          </li>
          <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="text-gray-800 font-medium">
              Added new doctor to "Cardiology Camp"
            </span>
            <span className="text-blue-500 font-bold">Added</span>
          </li>
          <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="text-gray-800 font-medium">
              Removed user for policy violation
            </span>
            <span className="text-red-500 font-bold">Removed</span>
          </li>
        </ul>
      </div>

      {/* Management Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <button className="bg-indigo-500 text-white font-bold p-4 rounded-lg shadow-lg hover:bg-indigo-600 transition">
          Manage Users
        </button>
        <button className="bg-purple-500 text-white font-bold p-4 rounded-lg shadow-lg hover:bg-purple-600 transition">
          Manage Camps
        </button>
        <button className="bg-green-500 text-white font-bold p-4 rounded-lg shadow-lg hover:bg-green-600 transition">
          View Reports
        </button>
        <button className="bg-yellow-500 text-white font-bold p-4 rounded-lg shadow-lg hover:bg-yellow-600 transition">
          Analytics Dashboard
        </button>
        <button className="bg-red-500 text-white font-bold p-4 rounded-lg shadow-lg hover:bg-red-600 transition">
          Resolve Issues
        </button>
        <button className="bg-blue-500 text-white font-bold p-4 rounded-lg shadow-lg hover:bg-blue-600 transition">
          Add New Admin
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-auto text-center text-gray-600 text-sm pt-10">
        © {new Date().getFullYear()} MediCamp Admin. All rights reserved.
      </footer>
    </div>
  );
};

export default AdminHome;
