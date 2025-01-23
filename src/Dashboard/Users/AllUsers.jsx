import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaRegTired, FaTrash, FaUserShield } from "react-icons/fa";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import useUsers from "../../Hooks/useUsers";
import LoadingPage from "../../Pages/Loading/LoadingPage";

const AllUsers = () => {
  const [users,loading] = useUsers();

  const handleUpdate = (id) => {
    console.log("Update user with ID:", id);
    // Update logic here
  };

  const handleDelete = (id) => {
    console.log(id)
    // setUsers(users.filter((user) => user.id !== id));
  };

  const handleToggleAdmin = (id) => {
    console.log(id)
  };
  if(loading){
    return <LoadingPage></LoadingPage>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <SectionTitle
        heading={"All Users"}
        subHeading={"Unity is Strength"}
      ></SectionTitle>
      <h1 className="text-3xl font-semibold mb-6 text-gray-700">
        Users {`(${users.length})`}{" "}
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <img
                    src={
                      user.photoURL === "null" ||
                      user.photoURL === undefined ||
                      !user.photoURL
                        ? "https://i.ibb.co/XLq7gMH/Sample-User-Icon.png"
                        : user.photoURL
                    }
                    className="w-10 h-10 rounded-lg"
                    alt=""
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-700">
                  <span
                    className={`px-2 font-semibold py-1 rounded-full text-xs ${
                      user.role === "admin" || user.role === "user"
                        ? "text-white  bg-gradient-to-r from-teal-500 to-green-400"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role === "admin" || user.role === "user"
                      ? user.role
                      : "Null"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 focus:outline-none"
                    onClick={() => handleUpdate(user._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 focus:outline-none"
                    onClick={() => handleDelete(user._id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-sm text-white focus:outline-none ${
                      user.isAdmin
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleToggleAdmin(user._id)}
                  >
                    <FaUserShield />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
