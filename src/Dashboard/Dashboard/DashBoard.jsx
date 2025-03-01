import React, { useState } from "react";
import {
  FaUserCircle,
  FaCampground,
  FaClipboardList,
  FaChartBar,
  FaWallet,
  FaHome,
  FaPhone,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaUsers,
  FaDochub,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { Helmet } from "react-helmet";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);
  const { logOut, user } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure to Log Out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut()
          .then(() => {})
          .catch((err) => console.log(err));
        navigate("/");
        Swal.fire({
          title: "Successfully Logged Out",
          text: "Stay Blessed,Allah will help You.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Helmet>
        <title>Dashboard || MCMS</title>
        <meta
          name="description"
          content="This is the home page of my website."
        />
      </Helmet>
      {/* Sidebar */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } w-64 h-screen bg-gradient-to-br  from-teal-500 to-green-400  text-white fixed top-0 left-0 shadow-lg md:block z-50`}
      >
        <div className="p-4 ">
          <h1 className="text-2xl font-bold text-center mb-2">MCMS</h1>
          <p className="text-sm text-center font-light">
            Medical Camp Management System
          </p>
          {/* <p className="divider divider-neutral"></p> */}
        </div>
        <div className="mx-4 border-b-2 border-b-black"></div>

        <ul className="menu p-4  font-semibold text-sm">
          {isAdmin ? (
            <>
              <li>
                <NavLink
                  to="/dashboard/adminHome"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaHome className="text-base" />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/organizerProfile"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaUserCircle className="text-base" />
                  Organizer Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/addCamp"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaCampground className="text-base" />
                  Add A Camp
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageCamps"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaClipboardList className="text-base" />
                  Manage Camps
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/manageRegisteredCamps"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaClipboardList className="text-base" />
                  Manage Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/allUsers"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaUsers className="text-base" />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/dashboard/userHome"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaHome className="text-base" />
                  Participant Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/analytics"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaChartBar className="text-base" />
                  Analytics
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaUserCircle className="text-base" />
                  Participant Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/registeredCamps"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaClipboardList className="text-base" />
                  Registered Camps
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/paymentHistory"
                  className={({ isActive }) =>
                    `flex items-center gap-1 p-3 rounded-lg transition ${
                      isActive
                        ? "bg-blue-800 text-yellow-300"
                        : "hover:bg-blue-800 hover:text-yellow-200"
                    }`
                  }
                >
                  <FaWallet className="text-base" />
                  Payment History
                </NavLink>
              </li>
            </>
          )}

          {/* Shared Links */}
          <div className=" my-2 border-b-2 border-b-black"></div>
          {/* <p className="divider divider-neutral"></p> */}
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-800 text-yellow-300"
                    : "hover:bg-blue-800 hover:text-yellow-200"
                }`
              }
            >
              <FaHome className="text-base" />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/availableCamps"
              className={({ isActive }) =>
                `flex items-center gap-1 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-800 text-yellow-300"
                    : "hover:bg-blue-800 hover:text-yellow-200"
                }`
              }
            >
              <FaCampground className="text-base" />
              Available Camps
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doctors"
              className={({ isActive }) =>
                `flex items-center gap-1 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-800 text-yellow-300"
                    : "hover:bg-blue-800 hover:text-yellow-200"
                }`
              }
            >
              <FaDochub className="text-base" />
              Doctors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `flex items-center gap-1 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-blue-800 text-yellow-300"
                    : "hover:bg-blue-800 hover:text-yellow-200"
                }`
              }
            >
              <FaEnvelope className="text-base" />
              About Us
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogOut}
              className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition"
            >
              <FaSignOutAlt className="mr-1 inline-block" /> LogOut
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="text-white bg-green-600 p-3 fixed top-4 right-4 rounded-full shadow-md md:hidden z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Main content area */}
      <div className="flex-1 ml-0 md:ml-64  p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
