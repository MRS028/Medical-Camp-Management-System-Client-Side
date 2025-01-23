import React, { useState } from "react";
import { FaEdit, FaTrash, FaUserShield } from "react-icons/fa";

const AllUsers = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", isAdmin: false },
    { id: 2, name: "Jane Smith", email: "jane@example.com", isAdmin: true },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", isAdmin: false },
    { id: 4, name: "Bob Brown", email: "bob@example.com", isAdmin: false },
    { id: 5, name: "Charlie Green", email: "charlie@example.com", isAdmin: true },
    { id: 6, name: "Charlie Green", email: "charlie@example.com", isAdmin: true },
    { id: 7, name: "Charlie Green", email: "charlie@example.com", isAdmin: true },
    { id: 8, name: "Charlie Green", email: "charlie@example.com", isAdmin: true },
  ]);

  const handleUpdate = (id) => {
    console.log("Update user with ID:", id);
    // Update logic here
  };

  const handleDelete = (id) => {
    // setUsers(users.filter((user) => user.id !== id));
  };

  const handleToggleAdmin = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, isAdmin: !user.isAdmin } : user
      )
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-6 text-gray-700">All Users {`(${users.length})`} </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                #
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
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 text-center text-sm text-gray-700">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      user.isAdmin
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-600 focus:outline-none"
                    onClick={() => handleUpdate(user.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 focus:outline-none"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full text-sm text-white focus:outline-none ${
                      user.isAdmin
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                    onClick={() => handleToggleAdmin(user.id)}
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
