import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { FaChartBar } from "react-icons/fa";
import useJoinedCamps from "../../../Hooks/useJoinedCamps";
import LoadingPage from "../../../Pages/Loading/LoadingPage";
import useScrollToTop from "../../../Hooks/useScrollToTop";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Analytics = () => {
  const [JoinedCamps, loading, isError] = useJoinedCamps();
  useScrollToTop();

  // Prepare data for the chart by mapping JoinedCamps
  const chartData = JoinedCamps.map((camp) => ({
    campName: camp.campName || "Unknown Camp",
    campFees: camp.campFees || 0,
    participants: camp.participants || 1,
  }));

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <div className="flex justify-center items-center gap-3 mb-8">
        <SectionTitle heading={"Analytics"} subHeading={"Representation Of Data Graph "}></SectionTitle>
        {/* <FaChartBar className="text-blue-600 text-4xl" />
        <h1 className="text-3xl font-bold text-gray-800">Analytics</h1> */}
      </div>
      <div>
        {JoinedCamps.length === 0 ? (
          <div className="text-center m-6 text-red-600">
            No registered camps found for this user.
          </div>
        ) : (
          <></>
        )}
      </div>

      {loading ? (
        <LoadingPage />
      ) : isError ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-red-500 text-lg font-medium">
            Error loading data!
          </p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Participant's Registered Camps
          </h2>

          <div className="w-full h-96">
            {/* Responsive Recharts Container */}
            <ResponsiveContainer>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <XAxis dataKey="campName" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="campFees" fill="#10B981" name="Camp Fees ($)" />
                <Bar
                  dataKey="participants"
                  fill="#4F46E5"
                  name="Participants"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
