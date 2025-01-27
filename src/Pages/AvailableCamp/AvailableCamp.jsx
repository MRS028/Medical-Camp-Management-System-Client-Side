import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaSortAlphaDown,
  FaColumns,
  FaUsers,
  FaCalendar,
  FaDollarSign,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useCamps from "../../Hooks/useCamps";
import LoadingPage from "../Loading/LoadingPage";
import { FaMapLocation, FaUserDoctor } from "react-icons/fa6";
import useScrollToTop from "../../Hooks/useScrollToTop";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import { Helmet } from "react-helmet";

const AvailableCamps = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [layout, setLayout] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const campsPerPage = 10;

  const [camps, loading] = useCamps();
  useScrollToTop();

  // Filter Camps Based on Search Query
  const filteredCamps = camps.filter((camp) =>
    `${camp.name} ${camp.description}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  // Sort Camps Based on Option
  const sortedCamps = [...filteredCamps].sort((a, b) => {
    if (sortOption === "alphabetical") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "mostRegistered") {
      return b.participants - a.participants;
    }
    return 0;
  });

  // Pagination Logic
  const indexOfLastCamp = currentPage * campsPerPage;
  const indexOfFirstCamp = indexOfLastCamp - campsPerPage;
  const currentCamps = sortedCamps.slice(indexOfFirstCamp, indexOfLastCamp);
  const totalPages = Math.ceil(sortedCamps.length / campsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Loading State
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="container mx-auto p-4">
       <Helmet>
        <title>Available Camp || MCMS</title>
        <meta name="description" content="This is the home page of my website." />
      </Helmet>
      {/* Section Title */}
      <h1 className="text-3xl font-bold text-center mb-6">
        <SectionTitle heading={"Available Camps"} />
      </h1>

      {/* Search and Sort Bar */}
      <div className="flex flex-wrap justify-between items-center mb-6">
        {/* Search Input */}
        <div className="flex mx-6 md:mx-0 items-center space-x-2">
          <input
            type="text"
            placeholder="Search camps..."
            className="input input-bordered w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="text-gray-500" />
        </div>

        {/* Sort and Layout Options */}
        <div className="lg:flex md:pt-0 pt-5 lg:mx-0 mx-4 space-x-2">
          <button
            className="btn btn-sm"
            onClick={() => setSortOption("alphabetical")}
          >
            <FaSortAlphaDown className="mr-1 text-blue-500" /> Sort by Name
          </button>
          <button
            className="btn btn-sm"
            onClick={() => setSortOption("mostRegistered")}
          >
            <FaUsers className="mr-1 text-purple-500" /> Most Registered
          </button>
          <button
            className="btn hidden lg:block btn-outline btn-sm"
            onClick={() => setLayout(layout === 3 ? 2 : 3)}
          >
            <FaColumns className="mr-2 text-teal-500 inline-block" />
            {layout === 3 ? "Two" : "Three"}-Column Layout
          </button>
        </div>
      </div>

      {/* Camp Cards */}
      <div
        className={`grid gap-6 ${
          layout === 3
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {currentCamps.map((camp) => (
          <div
            key={camp._id}
            className="card bg-base-100 shadow-xl border border-gray-200 p-4"
          >
            <div className={`h-40 ${layout === 2 ? "h-64" : ""}`}>
              <img
                src={camp.image}
                alt={camp.name}
                className="rounded-lg w-full h-full object-cover"
              />
            </div>
            <div className="card-body">
              <h2 className="card-title text-lg font-bold">{camp.name}</h2>
              <p className="text-sm">
                <FaCalendar className="inline-block text-blue-500" />
                <span className="font-semibold"> Date & Time:</span>{" "}
                {new Intl.DateTimeFormat("en-US", {
                  day: "numeric",
                  // month: "long",
                  month: "short",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                }).format(new Date(camp.dateTime))}
              </p>

              <p className="text-sm">
                <FaMapLocation className="inline-block text-red-500" />{" "}
                <span className="font-semibold">Location:</span> {camp.location}
              </p>
              <p className="text-sm">
                <FaUserDoctor className="inline-block text-green-500" />{" "}
                <span className="font-semibold">Doctor:</span>{" "}
                {camp.professional}
              </p>
              <p className="text-sm">
                <FaUsers className="inline-block text-purple-500" />{" "}
                <span className="font-semibold">Participants:</span>{" "}
                {camp.participants}
              </p>
              <p className="text-sm">
                <FaDollarSign className="inline-block text-red-500" />{" "}
                <span className="font-semibold">Camp Fees:</span>{" "}
                {camp.campFees} $
              </p>
              <div className="card-actions justify-end">
                <Link
                  to={`/campDetails/${camp._id}`}
                  className="btn btn-ghost hover:bg-teal-700 btn-md text-white bg-gradient-to-r from-teal-500 to-green-400"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        {/* Pagination Info */}
        <p className="text-sm text-gray-600">
          Showing <br className="md:hidden" />
          <span className="font-semibold">
            {indexOfFirstCamp + 1}-
            {Math.min(indexOfLastCamp, sortedCamps.length)}
          </span>{" "}
          of <span className="font-semibold">{sortedCamps.length}</span>
        </p>

        {/* Pagination Controls */}
        <div className="flex lg:items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`btn btn-sm ${currentPage === 1 ? "btn-disabled" : ""}`}
          >
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`btn btn-sm ${
                currentPage === index + 1
                  ? "btn-active text-teal-600"
                  : "text-gray-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`btn btn-sm ${
              currentPage === totalPages ? "btn-disabled" : ""
            }`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableCamps;
