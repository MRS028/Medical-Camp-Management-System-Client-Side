import React from "react";
import { FaStar } from "react-icons/fa";
import HomeSectionTitle from "../HomeSectionTitle/HomeSectionTitle";

const FeedbackAndRatings = () => {
  const feedbackData = [
    {
      id: 1,
      name: "John Doe",
      image: "",
      profession: "Teacher",
      location: "New York, USA",
      feedback:
        "The camp was very well-organized, and the staff was friendly and professional. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "",
      profession: "Software Engineer",
      location: "London, UK",
      feedback:
        "Good experience overall. The medical staff was knowledgeable, but the waiting time was a bit long.",
      rating: 4,
    },
    {
      id: 3,
      name: "Ali Khan",
      image: "",
      profession: "Farmer",
      location: "Lahore, Pakistan",
      feedback:
        "Great service! I appreciate the effort to provide healthcare to rural areas.",
      rating: 5,
    },
    {
      id: 4,
      name: "Maria Gomez",
      image: "",
      profession: "Nurse",
      location: "Madrid, Spain",
      feedback:
        "The facilities could be improved, but the care provided was excellent. Thanks!",
      rating: 4,
    },
  ];

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto">
        <HomeSectionTitle
          title={"Feedback and Ratings"}
          subtitle={"What participants say about our camps"}
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {feedbackData.map((item) => (
            <div
              key={item.id}
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
                  <p className="text-sm text-gray-500">
                    {item.profession} - {item.location}
                  </p>
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
