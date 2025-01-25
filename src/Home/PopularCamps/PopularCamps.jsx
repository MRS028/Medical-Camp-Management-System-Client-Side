import React from "react";
import { Link } from "react-router-dom";
import { FaUsers, FaCalendar, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";
import useCamps from "../../Hooks/useCamps";
import HomeSectionTitle from "../HomeSectionTitle/HomeSectionTitle";
import LoadingPage from "../../Pages/Loading/LoadingPage";
import useScrollToTop from "../../Hooks/useScrollToTop";

const PopularCamps = () => {
  useScrollToTop();
  const [camps, loading] = useCamps();
  // Sort by participant count and take the top 6
  const topCamps = [...camps]
    .sort((a, b) => b.participants - a.participants)
    .slice(0, 6);
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <section className="container mx-auto p-6">
      <HomeSectionTitle
        title={"Popular Medical Camps"}
        subtitle={"Celebrating Transformations from Our Camps"}
      />
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {topCamps.map((camp) => (
          <div
            key={camp._id}
            className="group bg-white rounded-lg shadow-xl hover:shadow-2xl transform transition-all duration-300 ease-in-out"
          >
            <div className="relative h-48 rounded-t-lg overflow-hidden">
              <img
                src={camp.image}
                alt={camp.name}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-50 group-hover:opacity-30 transition-all duration-300"></div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2 transition-all duration-300 ease-in-out group-hover:text-teal-500">
                {camp.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1 flex items-center">
                <FaCalendar className="mr-2 text-teal-500" />{" "}
                <span className="font-semibold">Date & Time:</span> {camp.dateTime}
              </p>
              <p className="text-sm text-gray-600 mb-1 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-500" />{" "}
                <span className="font-semibold">Location:</span> {camp.location}
              </p>
              <p className="text-sm text-gray-600 mb-1 flex items-center">
                <FaUserMd className="mr-2 text-green-500" />{" "}
                <span className="font-semibold">Healthcare Professional:</span>{" "}
                {camp.professional}
              </p>
              <p className="text-sm text-gray-600 mb-4 flex items-center">
                <FaUsers className="mr-2 text-purple-500" />{" "}
                <span className="font-semibold">Participants:</span> {camp.participants}
              </p>
              <div className="text-right">
                <Link
                  to={`/campDetails/${camp._id}`}
                  className="inline-block text-teal-500 hover:bg-teal-500 hover:text-white border-2 border-teal-500 py-2 px-4 rounded-lg transition-all duration-300 ease-in-out"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/availableCamps"
          className="text-white bg-gradient-to-r from-teal-500 to-green-400 py-3 px-6 rounded-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
        >
          See All Camps
        </Link>
      </div>
    </section>
  );
};

export default PopularCamps;
