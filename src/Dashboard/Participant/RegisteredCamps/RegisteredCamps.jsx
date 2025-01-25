import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../../Pages/Loading/LoadingPage";
import {
  FaCheckCircle,
  FaDollarSign,
  FaExclamationCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import useJoinedCamps from "../../../Hooks/useJoinedCamps";
import useScrollToTop from "../../../Hooks/useScrollToTop";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RegisteredCamps = () => {
  const axiosSecure = useAxiosSecure();
  useScrollToTop();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [JoinedCamps, isError, loading, refetch] = useJoinedCamps();
  //   console.log(JoinedCamps)

  const handlePayment = (camp) => {
    navigate("/dashboard/payment", { state: { camp } });
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (isError) {
    return (
      <div className="text-center mt-6 text-red-500">
        Failed to fetch camps. Please try again later.
      </div>
    );
  }
  const handleDelete = async (camp) => {
    // console.log(camp);
    // console.log("CampId:", camp.campId);

    // Confirmation before deletion
    const confirm = await Swal.fire({
      title: "Are you sure to delete this camp?",
      text: "Once you delete it, it cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1bb1b1",
      confirmButtonText: "Yes, Delete it!",
    });

    // If confirmed, delete the camp
    if (confirm.isConfirmed) {
      const participantCount = {
        action: "decrement",
      };

      // Update participant count
      const result = await axiosSecure.patch(
        `/participant-count/${camp.campId}`,
        participantCount
      );
      console.log("Decrement Response:", result.data);
      const deleteResponse = await axiosSecure.delete(
        `/delete-joined-camp/${camp._id}`
      );
      console.log("Delete Response:", deleteResponse.data);

      // Check if the camp was deleted successfully
      if (deleteResponse.data.deletedCount > 0) {
        Swal.fire("Deleted!", "The camp has been deleted.", "success");
        refetch();
      }
    }
  };

  const filteredCamps = JoinedCamps.filter(
    (camp) =>
      camp.campName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      camp.campFees.toString().includes(searchTerm)
  ).reverse();

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <SectionTitle
        heading={"Registered Camps"}
        subHeading={"Pay to Confirm your Journey With Us"}
      ></SectionTitle>

      {/* Search or Filter */}
      <div className="mb-6 pt-6 flex justify-center">
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
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-center">Camp Name</th>
              <th className="px-6 py-3 text-center">Camp Fees</th>
              <th className="px-6 py-3 text-center">Participant Name</th>
              <th className="px-6 py-3 text-center">Payment Status</th>
              <th className="px-6 py-3 text-center">Confirmation Status</th>
              <th className="px-6 py-3 text-center">
                Cancel <br />
                Status
              </th>
              <th className="px-6 py-3 text-center">
                Feedback <br />
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCamps.map((camp, index) => (
              <tr
                key={camp._id}
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
                {/* pay data */}
                <td className="px-6 py-4">
                  {camp.paymentStatus === "Paid" ? (
                    <span className="flex items-center justify-center text-green-500 font-medium">
                      <FaCheckCircle className="mr-2" /> Paid
                    </span>
                  ) : (
                    <button
                      onClick={() => handlePayment(camp)}
                      className="bg-gradient-to-r from-teal-500 to-green-400 text-white px-4 py-2 rounded  flex items-center justify-center"
                      data-tooltip-id="payment-tooltip"
                      data-tooltip-content="Complete your payment"
                    >
                      <FaDollarSign className="mr-2" /> Pay
                    </button>
                  )}
                </td>
                {/* isconfirmed row */}
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
                {/* cancel button */}
                <td className="px-6 py-4  gap-4">
                  <button
                    onClick={() => handleDelete(camp)}
                    className={`${
                      camp.paymentStatus === "Paid"
                        ? "bg-gray-400 text-white cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    } px-4 py-2 rounded flex items-center`}
                    disabled={camp.paymentStatus === "Paid"}
                    data-tooltip-id="cancel-tooltip"
                    data-tooltip-content="Cancel registration"
                  >
                    <FaTimesCircle className="mr-2" /> Cancel
                  </button>
                </td>
                {/* Feedback row */}
                <td className="px-6 py-4  gap-4">
                  {camp.feedback ? (
                    <button
                      className="bg-gradient-to-r from-teal-500 to-green-400 text-white px-4 py-2 rounded  flex items-center"
                      data-tooltip-id="feedback-tooltip"
                      data-tooltip-content="Give your feedback"
                    >
                      <FaCheckCircle className="mr-2" /> Feedback
                    </button>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {JoinedCamps.length === 0 ? (
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

export default RegisteredCamps;
