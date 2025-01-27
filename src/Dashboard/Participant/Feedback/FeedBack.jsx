import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { FaStar } from "react-icons/fa";

const FeedBack = ({ camp, onClose, onSubmit }) => {
  const { user } = useAuth();
//   console.log(camp._id)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitFeedback = (data) => {
    const feedbackInfo = {
        ...data,
        rating : parseFloat(data.rating),
        JoinedcampID: camp?._id,
        mainCampID: camp?.campId,
        campName: camp?.campName,
        image : user?.photoURL,
        location: camp.location
      };
      onSubmit(feedbackInfo);
    onClose();
    Swal.fire({
        title: "Success!",
        text: "Feedback submitted successfully.",
        icon: "success",
        timer: 2000,
        timerProgressBar: true,
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg">
        <h2 className="text-2xl font-bold  text-center mb-4"> <span className="border-b-teal-500 border-b-4 ">Feedback Form</span>

        </h2>
        <form onSubmit={handleSubmit(submitFeedback)}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Participant's Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("name", { required: "Name is required" })}
              defaultValue={camp.participantName}
              readOnly
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
            Participant's  Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              defaultValue={user?.email || ""}
              readOnly
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Feedback */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Feedback
            </label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register("feedback", { required: "Feedback is required" })}
            ></textarea>
            {errors.feedback && (
              <span className="text-red-500 text-sm">
                {errors.feedback.message}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              {...register("rating", { required: "Rating is required" })}
            >
              <option value="">Select a rating</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>{`${rating} Star${
                  rating > 1 ? "s" : ""
                }`}</option>
              ))}
            </select>
            {errors.rating && (
              <span className="text-red-500 text-sm">
                {errors.rating.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r  from-teal-500 to-green-400 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedBack;
