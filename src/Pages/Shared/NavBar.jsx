import React, { useState } from "react";
import { FaBars, FaTimes, FaFirstAid, FaRegistered, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import useUsers from "../../Hooks/useUsers";
import LoadingPage from "../Loading/LoadingPage";

const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const [users, loading] = useUsers();
  // const adminUsers = users.filter((user) => user.role === "admin");
  // console.log(adminUsers);

  if (loading) {
    return <LoadingPage></LoadingPage>;
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
        Swal.fire({
          title: "Successfully Logged Out",
          text: "Stay Blessed,Allah will help You.",
          icon: "success",
          timer: 1500,
        });
      }
    });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b"
              : "text-gray-800 hover:text-white hover:border-b-2 hover:border-white"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/availableCamps"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b"
              : "text-gray-800 hover:text-white hover:border-b-2 hover:border-white"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Available Camps
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/doctors"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b"
              : "text-gray-800 hover:text-white hover:border-b-2 hover:border-white"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Doctors
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/aboutUs"
          className={({ isActive }) =>
            isActive
              ? "text-white font-semibold border-b"
              : "text-gray-800 hover:text-white hover:border-b-2 hover:border-white"
          }
          onClick={() => setIsMobileMenuOpen(false)}
        >
         About US
        </NavLink>
      </li>
      
      {user && user.email ? (
        <li>
          <NavLink
            to={`${
              users.some((u) => u.email === user.email && u.role === "admin")
                ? "/dashboard/adminHome"
                : "/dashboard/userHome"
            }`}
            className={({ isActive }) =>
              isActive
                ? "text-white font-semibold border-b"
                : "text-gray-800 hover:text-white hover:border-b-2 hover:border-white"
            }
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </NavLink>
        </li>
      ) : (
        <> </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r  from-teal-500 to-green-400 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo and Website Name */}
        <div className="flex items-center gap-3">
          <FaFirstAid className="text-3xl" />
          <span className="text-2xl font-bold tracking-wide">MediCamp</span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex gap-8 items-center">
          <ul className="flex gap-8 text-lg font-medium">{links}</ul>
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          {user ? (
            <>
              <div
                className="tooltip tooltip-left lg:tooltip-bottom text-base-content font-semibold mr-2"
                data-tip={user?.email || "Anonymous User"}
              >
                <img
                  className="inline-block w-10  h-10 rounded-full border cursor-pointer"
                  src={user?.photoURL || "userPhoto"}
                  alt=""
                />
              </div>

              <button
                onClick={handleLogOut}
                className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-700 transition"
              >
              <FaSignOutAlt className="mr-1 inline-block"/>  LogOut
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <button className="bg-white text-teal-500 lg:px-4 lg:py-2 rounded-full font-semibold hover:bg-teal-100 transition">
                 <FaSignInAlt className="mr-1 inline-block"/> Join With US
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          {/* {user && user?.email ? (
            <>
              <div
                className="tooltip tooltip-left  lg:tooltip-bottom text-base-content font-semibold mr-2"
                data-tip={user?.email || "Anonymous User"}
              >
                <img
                  className="inline-block w-8  h-8 rounded-full cursor-pointer"
                  src={user?.photoURL || "userPhoto"}
                  alt="User Avatar"
                />
              </div>
            </>
          ) : (
            <></>
          )} */}
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-gray-200"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="text-3xl text-red-600" />
            ) : (
              <FaBars className="text-3xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div className="bg-gradient-to-r from-teal-500 to-green-400 text-gray-800 fixed inset-y-0 left-0 w-64 shadow-lg z-50 p-4">
          <ul className="space-y-4 text-lg font-medium">{links}</ul>
          <ul className="text-lg">
            {user ? (
              <>
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 text-white px-4 mt-5 py-1 rounded-full font-semibold hover:bg-red-700 transition"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <button className="bg-white mt-3 text-teal-500 px-4  py-2 rounded-3xl font-semibold hover:bg-teal-100 transition">
                    Join With US
                  </button>
                </Link>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
