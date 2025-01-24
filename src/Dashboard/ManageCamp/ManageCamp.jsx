import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UpdateModal from "./UpdateModal";
import useScrollToTop from "../../Hooks/useScrollToTop";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const ManageCamp = () => {
  const [camps, setCamps] = useState([]);
  const [selectedCamp, setSelectedCamp] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  useScrollToTop();

  useEffect(() => {
    const fetchCamps = async () => {
      const res = await axiosSecure.get("/camps");
      setCamps(res.data);
    };
    fetchCamps();
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure to delete this camp?",
      text: "Once you delete it cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1bb1b1",
      confirmButtonText: "Yes, Delete it!",
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
    if(!res.data.modifiedCount){
        Swal.fire({
            title: "You don't change anything yet!",
            text: "If You want then make updates.",
            icon: "error",
            timer: 20000,
            cancelButtonColor: "#1bb1b1",
            showConfirmButton: true, 
          });
       
    }
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
        cancelButtonColor: "#1bb1b1",
        showConfirmButton: true, 
      });
      
      setSelectedCamp(null);
    }
  };
  const filteredCamps = camps.filter(
    (camp) =>
      camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.campFees.toString().includes(searchTerm)
  );


  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
      <SectionTitle heading={"Manage Camps"} subHeading={"Good People knows the Good People"}></SectionTitle>
      
      <div className="mb-6 pt-5 flex justify-center">
        {/* <label className="label font-semibold ">Search</label> */}
        <input
          type="text"
          placeholder="Search by camp name..."
          className="px-4 py-2 w-1/2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold ">
                #
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold ">
                Image
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold ">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold ">
                Location
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold ">
                Fees
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold ">
                Participent
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCamps.map((camp, index) => (
              <tr
                key={camp._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 text-sm font-semibold text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-700"><img src={camp.image} alt="" className="w-12 h-10 rounded-lg"/></td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-700">{camp.name}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                  {camp.location}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                  ${camp.campFees}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-center text-gray-700">
                  {camp.participants}
                </td>
                <td className="px-6 py-4 text-center font-semibold space-y-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 focus:outline-none"
                    onClick={() => setSelectedCamp(camp._id)}
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
