import { p } from "framer-motion/client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FaCheckCircle,
  FaDollarSign,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import LoadingPage from "../../../Pages/Loading/LoadingPage";

const ManageRegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: camps = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["camps"],
    queryFn: async () => {
      const res = await axiosSecure.get("/registeredCamps");
      //   console.log("API Response:", res.data);
      return res.data;
    },
  });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  // Filter camps based on the search term
  const filteredCamps = camps.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.campFees.toString().includes(searchTerm)
  );

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Registered Camps
      </h1>

      {/* Search or Filter */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by camp name..."
          className="px-4 py-2 w-1/2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="table-auto w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-6 py-3 text-center">#</th>
              <th className="px-6 py-3 text-center">Camp Name</th>
              <th className="px-6 py-3 text-center">Camp Fees</th>
              <th className="px-6 py-3 text-center">Confirmation Status</th>
              <th className="px-6 py-3 text-center">Participant Name</th>
              <th className="px-6 py-3 text-center">Payment Status</th>
              <th className="px-6 py-3 text-center">
                Cancel <br /> Status
              </th>
              {/* <th className="px-6 py-3 text-center">Feedback <br /> Status</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredCamps.map((camp, index) => (
              <tr
                key={camp.id}
                className="text-center border-t hover:bg-gray-100 transition-all duration-200"
              >
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-gray-700 font-medium">
                  {camp.campName}
                </td>
                <td className="px-6 py-4 text-gray-700">${camp.campFees}</td>
                <td className="px-6 py-4 text-gray-700">
                  {camp.participantName}
                </td>
                <td className="px-6 py-4">
                  {camp.paymentStatus === "Paid" ? (
                    <span className="flex items-center justify-center text-green-500 font-medium">
                      <FaCheckCircle className="mr-2" /> Paid
                    </span>
                  ) : (
                    <span className="flex items-center justify-center text-gray-600 font-medium">
                      Unpaid
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {camp.confirmationStatus === "Confirmed" ? (
                    <span className="flex items-center justify-center text-green-500 font-medium">
                      <FaCheckCircle className="mr-2" /> Confirmed
                    </span>
                  ) : (
                    <span className="flex items-center justify-center text-yellow-500 font-medium">
                      <FaExclamationCircle className="mr-2" /> Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4  gap-4">
                  <button
                    className={`${
                      camp.paymentStatus === "Paid"
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    } px-4 py-2 rounded flex items-center`}
                    disabled={
                      camp.paymentStatus === "Paid" ||
                      camp.confirmationStatus === "Confirmed"
                    }
                    data-tooltip-id="cancel-tooltip"
                    data-tooltip-content="Cancel registration"
                  >
                    <FaTimesCircle className="mr-2" /> Cancel
                  </button>
                </td>
                {/* <td className="px-6 py-4  gap-4">
                  {camp.feedback ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center"
                      data-tooltip-id="feedback-tooltip"
                      data-tooltip-content="Give your feedback"
                    >
                      <FaCheckCircle className="mr-2" /> Feedback
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
        {camps.length === 0 ? (
          <div className="text-center m-6 text-red-600">
            No registered camps found for this user.
          </div>
        ) : (
          <></>
        )}
      </div>

      <Tooltip id="payment-tooltip" />
      <Tooltip id="cancel-tooltip" />
      <Tooltip id="feedback-tooltip" />
    </div>
  );
};

export default ManageRegisteredCamps;
