import React from "react";
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaDollarSign,
} from "react-icons/fa";
import useJoinedCamps from "../../../Hooks/useJoinedCamps";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useScrollToTop from "../../../Hooks/useScrollToTop";

const PaymentHistory = () => {
  const [joinedcamps, loading, refetch] = useJoinedCamps();
  useScrollToTop();

  return (
    <div className="p-6 bg-gradient-to-r min-h-screen">
      <div className="flex justify-center items-center gap-3 mb-8">
        {/* <FaDollarSign className=" text-4xl" /> */}

        <SectionTitle
          heading={"Payment History"}
          subHeading={"Great people Never Die"}
        ></SectionTitle>
        {/* <h1 className="text-3xl font-bold ">Payment History</h1> */}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Camp Payment Details
        </h2>

        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-gray-100 border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Camp Name</th>
                <th className="px-6 py-3 text-left">Fees ($)</th>
                <th className="px-6 py-3 text-left">Payment Status</th>
                <th className="px-6 py-3 text-left">Confirmation Status</th>
              </tr>
            </thead>
            <tbody>
              {joinedcamps.map((payment, index) => (
                <tr
                  key={payment._id}
                  className="text-gray-700 border-t hover:bg-gray-100 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-semibold">{index + 1}</td>
                  <td className="px-6 py-4">{payment.campName}</td>
                  <td className="px-6 py-4">${payment.campFees}</td>
                  <td className="px-6 py-4">
                    {payment.paymentStatus === "Paid" ? (
                      <span className="flex items-center text-green-500 font-medium">
                        <FaCheckCircle className="mr-2" /> Paid
                      </span>
                    ) : (
                      <span className="flex items-center text-yellow-500 font-medium">
                        <FaExclamationCircle className="mr-2" /> Unpaid
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {payment.confirmationStatus === "Confirmed" ? (
                      <span className="flex items-center text-green-500 font-medium">
                        <FaCheckCircle className="mr-2" /> Confirmed
                      </span>
                    ) : (
                      <span className="flex items-center text-yellow-500 font-medium">
                        <FaExclamationCircle className="mr-2" /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {joinedcamps.length === 0 ? (
            <div className="text-center m-6 text-red-600">
              No registered camps found for this user.
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
