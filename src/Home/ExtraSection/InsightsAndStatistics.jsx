import React from "react";
import { FaUsers, FaHeartbeat, FaClinicMedical } from "react-icons/fa";
import HomeSectionTitle from "../HomeSectionTitle/HomeSectionTitle";

const InsightsAndStatistics = () => {
  const stats = [
    {
      id: 1,
      icon: <FaUsers className="text-green-500" />,
      label: "Total Participants",
      value: "1,200+",
    },
    {
      id: 2,
      icon: <FaHeartbeat className="text-red-500" />,
      label: "Lives Impacted",
      value: "850+",
    },
    {
      id: 3,
      icon: <FaClinicMedical className="text-blue-500" />,
      label: "Camps Organized",
      value: "30+",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white via-teal-50 to-green-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <HomeSectionTitle
          title={"Insights and Statistics"}
          subtitle={"Unlocking impactful data and measurable success from our camps"}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-6 bg-white shadow-xl rounded-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-4  flex justify-center">{stat.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {stat.label}
              </h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InsightsAndStatistics;
