import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import LoadingPage from "../../../Pages/Loading/LoadingPage";
import useScrollToTop from "../../../Hooks/useScrollToTop";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useJoinedCamps from "../../../Hooks/useJoinedCamps";

const Analytics = () => {
  const [JoinedCamps, loading, ] = useJoinedCamps();
  const [chartData, setChartData] = useState([]);
  const isError = false

  useScrollToTop();

  // Check if data is coming
  useEffect(() => {
    console.log("JoinedCamps Data:", JoinedCamps);

    if (Array.isArray(JoinedCamps) && JoinedCamps.length > 0) {
      const formattedData = JoinedCamps.map((camp) => ({
        campName: camp?.campName || "Unknown Camp",
        campFees: camp?.campFees || 0,
        participants: camp?.participants || 1,
      }));
      setChartData(formattedData);
    }
  }, [JoinedCamps]);

  console.log("Chart Data:", chartData);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen">
      <div className="flex justify-center items-center gap-3 mb-8">
        <SectionTitle
          heading={"Analytics"}
          subHeading={"Representation Of Data Graph "}
        />
      </div>

      {/* No Data Message */}
      {!loading && JoinedCamps.length === 0 && (
        <div className="text-center m-6 text-red-600">
          No registered camps found for this user.
        </div>
      )}

      {/* Loading & Error Handling */}
      {loading ? (
        <LoadingPage />
      ) : isError ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-red-500 text-lg font-medium">Error loading data!</p>
        </div>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Participant's Registered Camps
          </h2>

          {/* Ensure Chart Data is Rendered Only If Available */}
          {chartData.length > 0 ? (
            <div className="w-full h-96">
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
          ) : (
            <div className="text-center text-gray-600">
              No data available for chart representation.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Analytics;
