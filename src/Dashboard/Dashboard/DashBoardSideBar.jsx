import React from "react";
import { Typewriter } from "react-simple-typewriter";

const DashBoardContent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-6">
      {/* Welcome Banner */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8 text-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
          Welcome to{" "} 
          <span className="text-teal-500">
            <Typewriter
              words={["MediCamp", "Your Health Partner", "Best Care Services"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Stay updated with your medical camps, schedules, and support services.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg lg:text-xl font-bold">Registered Camps</h2>
          <p className="text-2xl lg:text-3xl font-bold mt-2">25</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg lg:text-xl font-bold">Doctors Available</h2>
          <p className="text-2xl lg:text-3xl font-bold mt-2">12</p>
        </div>
        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-lg lg:text-xl font-bold">Total Participants</h2>
          <p className="text-2xl lg:text-3xl font-bold mt-2">500</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
        <ul className="space-y-2">
          <li className="flex flex-wrap justify-between items-center text-gray-700">
            <span>Joined "Health Awareness Camp"</span>
            <span className="text-teal-500 font-bold">Completed</span>
          </li>
          <li className="flex flex-wrap justify-between items-center text-gray-700">
            <span>Paid for "Heart Care Camp"</span>
            <span className="text-green-500 font-bold">Paid</span>
          </li>
          <li className="flex flex-wrap justify-between items-center text-gray-700">
            <span>Registered for "Diabetes Camp"</span>
            <span className="text-yellow-500 font-bold">Pending</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardContent;
