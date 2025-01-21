import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import LoadingPage from "../Loading/LoadingPage";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserMd,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import JoinCampModal from "../JoinCCamp/JoinCampModal";

const CampDetails = () => {
  const CampId = useParams();
  const [camp, setCamp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const id = CampId.id;

  useEffect(() => {
    axiosPublic
      .get(`/camps/${id}`)
      .then((result) => {
        setCamp(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch camp details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!camp) {
    return (
      <div className="text-center text-lg font-bold mt-10">Camp not found!</div>
    );
  }

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
        {camp.name}
      </h1>

      <div className="card bg-base-100 shadow-xl border border-gray-200 p-4">
        <div className="flex md:w-[75%] mx-auto h-64 sm:h-80 flex-wrap justify-center">
          <img
            src={camp.image}
            alt={camp.name}
            className="rounded-lg w-full h-full mb-4"
          />
        </div>
        <div className="p-4 sm:p-6 space-y-4">
          <p className="text-sm sm:text-lg font-semibold flex items-center">
            <FaDollarSign className="mr-2 text-green-500" />
            Fees: {" "}
            <span className="font-normal ml-1">${camp.campFees || "Free"}</span>
          </p>
          <p className="text-sm sm:text-lg font-semibold flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500" />
            Date & Time: {" "}
            <span className="font-normal ml-1">{camp.dateTime}</span>
          </p>
          <p className="text-sm sm:text-lg font-semibold flex items-center">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            Location: <span className="font-normal ml-1">{camp.location}</span>
          </p>
          <p className="text-sm sm:text-lg font-semibold flex items-center">
            <FaUserMd className="mr-2 text-purple-500" />
            Healthcare Professional: {" "}
            <span className="font-normal ml-1">{camp.professional}</span>
          </p>
          <p className="text-sm sm:text-lg font-semibold flex items-center">
            <FaUsers className="mr-2 text-yellow-500" />
            Participants: {" "}
            <span className="font-normal ml-1">{camp.participants}</span>
          </p>
          <p className="text-sm sm:text-lg font-semibold">
            <FcAbout className="inline-block mr-2" />
            Description: <span className="font-normal">{camp.description}</span>
          </p>
          <div className="text-center">
            <button
              className="btn btn-ghost text-white bg-gradient-to-r from-teal-500 to-green-400 btn-md sm:btn-lg"
              onClick={handleOpenModal} // Open the modal
            >
              Join Camp
            </button>
          </div>
        </div>
      </div>

      {/* Join Camp Modal */}
      {isModalOpen && (
        <JoinCampModal
          camp={camp}
          onClose={handleCloseModal} // Close modal handler
          onRegister={(registrationData) => {
            
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default CampDetails;
