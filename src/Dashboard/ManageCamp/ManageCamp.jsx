import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UpdateModal from "./UpdateModal";

const ManageCamp = () => {
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCamps = async () => {
      const res = await axiosSecure.get("/camps");
      setCamps(res.data);
    };
    fetchCamps();
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/camps/${id}`);
      if (res.data.deletedCount > 0) {
        setCamps(camps.filter((camp) => camp._id !== id));
        Swal.fire("Deleted!", "The camp has been deleted.", "success");
      }
    }
  };

  const handleUpdate = async (id, updatedData) => {
    const res = await axiosSecure.patch(`/camp/${id}`, updatedData);
    if (res.data.modifiedCount > 0) {
      setCamps(
        camps.map((camp) =>
          camp._id === id ? { ...camp, ...updatedData } : camp
        )
      );
      Swal.fire({
        title: "Updated!",
        text: "The camp has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: true, 
      });
      
      setSelectedCamp(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Manage Camps
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                Fees
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {camps.map((camp, index) => (
              <tr
                key={camp._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{camp.name}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {camp.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  ${camp.campFees}
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 focus:outline-none"
                    onClick={() => setSelectedCamp(camp)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 focus:outline-none"
                    onClick={() => handleDelete(camp._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedCamp && (
        <UpdateModal
          camp={selectedCamp}
          onUpdate={(updatedData) =>
            handleUpdate(selectedCamp._id, updatedData)
          }
          onClose={() => setSelectedCamp(null)}
        />
      )}
    </div>
  );
};

export default ManageCamp;
