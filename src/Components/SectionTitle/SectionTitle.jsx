import React from "react";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="mx-auto text-center md:w-6/12 my-4">
      {subHeading && (
        <p className="text-lg text-gray-600 italic tracking-wide mb-2">
          --- {subHeading} ---
        </p>
      )}
      <h2 className="lg:text-4xl text-2xl font-bold text-gray-800 uppercase tracking-wider relative inline-block">
        {heading}
        <span className="absolute inset-x-0 -bottom-1 h-1  bg-gradient-to-r from-teal-500 to-green-400 rounded-md"></span>
      </h2>
    </div>
  );
};

export default SectionTitle;
