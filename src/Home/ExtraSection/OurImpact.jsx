import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const OurImpact = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const stats = [
    { label: "Camps Organized", value: 120 },
    { label: "Participants Served", value: 5000 },
    { label: "Areas Covered", value: 15 },
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2
          className="text-3xl font-bold mb-6"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Our Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-md"
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <h3 className="text-4xl font-extrabold text-blue-500">
                {stat.value}+
              </h3>
              <p className="mt-2 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurImpact;
