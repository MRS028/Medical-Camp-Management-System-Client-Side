import React from "react";
import { FaStar } from "react-icons/fa";
import HomeSectionTitle from "../HomeSectionTitle/HomeSectionTitle";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useFeedback from "../../Hooks/useFeedback";

const FeedbackAndRatings = () => {
  const [feedback, loading] = useFeedback();
  const latestFeedbacks = feedback.slice(0, 6).reverse();

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto">
        <HomeSectionTitle
          title={"Feedback and Ratings"}
          subtitle={"What participants say about our camps"}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestFeedbacks.map((item) => (
            <div
              key={item._id}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full border-2 border-green-500"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{item.feedback}</p>
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`${
                      index < item.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackAndRatings;
