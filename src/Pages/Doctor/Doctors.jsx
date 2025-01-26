import React, { useEffect, useState } from "react";
import { FaStethoscope, FaEnvelope, FaPhone } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { p } from "framer-motion/client";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosPublic.get("/doctors");
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [axiosPublic]);

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }
  if(!doctors){
    return <p className="text-red-500 text-center">No Doctor Available</p>
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6"><SectionTitle heading={"Meet Our Doctors"}></SectionTitle></h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="card bg-base-100 shadow-xl border border-gray-200 p-4"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="rounded-lg w-full h-40 object-cover mb-4"
            />
            <div className="card-body">
              <h3 className="card-title text-lg font-bold">{doctor.name}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <FaStethoscope className="inline-block text-blue-500 mr-1" />
                <span className="font-semibold">Specialty:</span>{" "}
                {doctor.specialty}
              </p>
              <p className="text-sm">
                <FaEnvelope className="inline-block text-teal-500 mr-1" />
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href={`mailto:${doctor.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {doctor.email}
                </a>
              </p>
              <p className="text-sm">
                <FaPhone className="inline-block text-green-500 mr-1" />
                <span className="font-semibold">Phone:</span>{" "}
                <a
                  href={`tel:${doctor.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {doctor.phone}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;
