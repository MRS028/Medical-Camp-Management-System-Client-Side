import React from "react";

const HomeSectionTitle = ({ title, subtitle }) => {
  return (
    <div className="text-center my-6">
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-600 italic tracking-wide mb-4">
          --- {subtitle} ---
        </p>
      )}
      <h1 className="text-2xl md:text-5xl font-bold text-gray-800 uppercase tracking-wide relative inline-block">
        {title}
        <span className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 h-1 w-full bg-gradient-to-r from-teal-400 to-green-500 rounded-full"></span>
      </h1>
    </div>
  );
};

export default HomeSectionTitle;
