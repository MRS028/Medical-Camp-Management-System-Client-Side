import React from "react";
import { Typewriter } from "react-simple-typewriter";
import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6 ">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-500 to-green-400 shadow-lg rounded-lg p-6 mb-8 text-center">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white">
          Welcome,{" "}
          <span>
            <Typewriter
              words={[`${user.displayName}`, "Health Enthusiast!", "Friend!"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>
        <p className="text-white mt-2 text-lg">
          Empowering your journey toward better health and wellness.
        </p>
      </div>

      {/* User Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-green-400">
          <h2 className="text-xl font-bold text-gray-800">Upcoming Camps</h2>
          <p className="text-4xl font-extrabold text-teal-500 mt-2">15</p>
        </div>
        {/* Stat Card 2 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-teal-500">
          <h2 className="text-xl font-bold text-gray-800">
            Completed Sessions
          </h2>
          <p className="text-4xl font-extrabold text-green-500 mt-2">32</p>
        </div>
        {/* Stat Card 3 */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-yellow-400">
          <h2 className="text-xl font-bold text-gray-800">
            Pending Registrations
          </h2>
          <p className="text-4xl font-extrabold text-yellow-500 mt-2">5</p>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Recent Activities
        </h2>
        <ul className="space-y-4">
          {/* Activity Item */}
          <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="text-gray-800 font-medium">
              Registered for "Cardiology Awareness Camp"
            </span>
            <span className="text-yellow-500 font-bold">Pending</span>
          </li>
          <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="text-gray-800 font-medium">
              Attended "General Health Camp"
            </span>
            <span className="text-teal-500 font-bold">Completed</span>
          </li>
          <li className="flex justify-between items-center p-4 bg-gray-50 rounded-md shadow-sm">
            <span className="text-gray-800 font-medium">
              Paid for "Diabetes Management Camp"
            </span>
            <span className="text-green-500 font-bold">Paid</span>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <footer className="mt-auto text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} MediCamp. All rights reserved.
      </footer>
    </div>
  );
};

export default UserHome;
