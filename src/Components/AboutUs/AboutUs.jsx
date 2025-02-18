import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          About Us
        </h1>
        <p className="text-gray-600 text-lg text-center">
          Welcome to <span className="font-semibold text-teal-500">Our Camp Management System</span>, 
          where we streamline the process of organizing and managing camps efficiently.
        </p>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Our Mission</h2>
          <p className="text-gray-600 mt-2">
            We aim to provide an easy-to-use and effective solution for camp registration,
            management, and participant tracking. Our platform ensures a smooth and hassle-free experience.
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-700">Why Choose Us?</h2>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
            <li>Seamless camp registration and management</li>
            <li>Real-time participant tracking</li>
            <li>Secure payment and confirmation system</li>
            <li>User-friendly interface for both admins and users</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">Get in Touch</h2>
          <p className="text-gray-600 mt-2">
            Have questions? Reach out to us at{" "}
            <span className="text-teal-500 font-semibold">contact@campmanager.com</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
