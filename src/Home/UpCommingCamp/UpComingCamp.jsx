import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaLocationArrow, FaHandsHelping, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import useCamps from "../../Hooks/useCamps";
import { Link } from "react-router-dom"; // Import Link for routing

const UpcomingComingCamp = () => {
  const [upcomingCamps, setUpcomingCamps] = useState([]);
  const [camps, loading] = useCamps(); // Fetching camps using the custom hook

  useEffect(() => {
    if (camps && camps.length > 0) {
      const currentDate = new Date();

      // Filter camps whose date is greater than or equal to the current date
      const filteredCamps = camps.filter((camp) => {
        const campDate = new Date(camp.dateTime); 
        return campDate >= currentDate; 
      });

      // Sort the filtered camps by date (ascending)
      const sortedCamps = filteredCamps.sort((a, b) => {
        const dateA = new Date(a.dateTime);
        const dateB = new Date(b.dateTime);
        return dateA - dateB;
      });

      // Select the 6 nearest upcoming camps
      setUpcomingCamps(sortedCamps.slice(0, 6)); 
    }
  }, [camps]);  // Re-run the effect when camps data changes

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-teal-600 mb-8">Upcoming Camps</h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingCamps.length > 0 ? (
            upcomingCamps.map((camp) => (
              <div
                key={camp._id} 
                className="p-6 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105"
              >
                <img src={camp.image} alt={camp.name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                <h4 className="text-xl font-semibold text-teal-600">{camp.name}</h4>

                <div className="mt-2 flex items-center justify-start space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FaCalendarAlt className="mr-1 text-teal-500" />
                    <span>{new Date(camp.dateTime).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FaLocationArrow className="mr-1 text-teal-500" />
                    <span>{camp.location}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaUsers className="mr-1 text-teal-500" />
                    <span>{camp.participants} participants</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMoneyBillWave className="mr-1 text-teal-500" />
                    <span>${camp.campFees}</span>
                  </div>
                </div>

                <div className="card-action mt-4">
                  <Link to={`/campDetails/${camp._id}`} className="py-2 px-4 text-white rounded-lg bg-gradient-to-r from-teal-500 to-green-400 w-full">
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
