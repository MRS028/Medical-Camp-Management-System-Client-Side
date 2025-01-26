import React, { useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaLocationArrow,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import useCamps from "../../Hooks/useCamps";
import { Link } from "react-router-dom";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const UpcomingComingCamp = () => {
  const [upcomingCamps, setUpcomingCamps] = useState([]);
  const [camps, loading] = useCamps();

  useEffect(() => {
    if (camps && camps.length > 0) {
      const currentDate = new Date();
      const filteredCamps = camps
        .filter((camp) => new Date(camp.dateTime) >= currentDate)
        .sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
      setUpcomingCamps(filteredCamps.slice(0, 6));
    }
  }, [camps]);

  if (loading) {
    return (
      <section className="py-16 flex justify-center items-center bg-gradient-to-r from-gray-100 to-gray-50">
        <p className="text-lg text-gray-700 animate-pulse">Loading...</p>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-gray-100 via-white to-gray-100">
     
     <SectionTitle heading={"Upcoming Camps"} />
      <div className="container mx-auto text-center px-6 md:px-0">
        

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {upcomingCamps.length > 0 ? (
            upcomingCamps.map((camp) => (
              <div
                key={camp._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative  h-48 rounded-t-lg overflow-hidden">
                  <img
                    src={camp.image}
                    alt={camp.name}
                    className="w-full h-full lg:object-cover "
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800 group-hover:text-teal-600 transition-colors">
                    {camp.name}
                  </h4>
                  <div className="mt-4 text-sm space-y-2">
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="flex items-center">
                        <FaCalendarAlt className="text-teal-500 mr-2" />
                        {new Date(camp.dateTime).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <FaUsers className="text-teal-500 mr-2" />
                        {camp.participants} participants
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span className="flex items-center">
                        <FaLocationArrow className="text-teal-500 mr-2" />
                        {camp.location}
                      </span>
                      <span className="flex items-center">
                        <FaMoneyBillWave className="text-teal-500 mr-2" />
                        ${camp.campFees}
                      </span>
                    </div>
                  </div>
                  <Link
                    to={`/campDetails/${camp._id}`}
                    className="block mt-6 py-2 px-4 text-white bg-gradient-to-r from-teal-500 to-green-400  text-center rounded-lg hover:bg-teal-600 transition-all"
                  >
                    Register Now
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No upcoming camps found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingComingCamp;