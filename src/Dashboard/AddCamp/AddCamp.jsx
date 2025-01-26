import React from "react";
import { useForm } from "react-hook-form";
import { FaSave, FaCampground } from "react-icons/fa";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useScrollToTop from "../../Hooks/useScrollToTop";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddCamp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  useScrollToTop();
  const navigate = useNavigate();
  //   name
  //   "Blood Donation Camp"
  //   image
  //   "https://i.ibb.co.com/zHGmMyw/bloodcamp.jpg"
  //   dateTime
  //   "2025-06-20 08:00 AM"
  //   location
  //   "City Hall, Main Street"
  //   professional
  //   "Dr. James Carter"
  //   participants
  //   200
  //   description
  //   "A camp dedicated to collecting blood donations to save lives."
  //   campFees
  //   200

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log(res.data);

    if (res.data.success) {
      const campInfo = {
        name: data.campName,
        image: res.data?.data?.display_url,
        dateTime: data.dateTime,
        location: data.location,
        professional: data.healthcareProfessional,
        participants: parseFloat(data.participantCount) || 0,
        campFees: parseFloat(data.fees),
        description: data.description,
      };
      //   console.log(campInfo);
      const addCampRes = await axiosSecure.post("/camp", campInfo);
      // console.log(addCampRes.data)
      if (addCampRes.data.insertedId) {
        Swal.close();
        reset();
        navigate("/dashboard/manageCamps");
        Swal.fire({
          title: "Camp Added Successfully",
          icon: "success",
          draggable: true,
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
       <Helmet>
        <title>Add Camp || MCMS</title>
        <meta name="description" content="This is the home page of my website." />
      </Helmet>
      <h1 className="text-2xl lg:text-4xl font-bold text-center mb-6 flex items-center justify-center gap-2 text-green-600">
        <FaCampground /> Add A New Camp
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Camp Name */}
        <div>
          <label className="block font-semibold mb-1">Camp Name</label>
          <input
            type="text"
            {...register("campName", { required: "Camp name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter camp name"
          />
          {errors.campName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.campName.message}
            </p>
          )}
        </div>

        {/* Image */}
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            {...register("image", { required: true })}
            type="file"
            className="file-input w-full  input-bordered"
          />
          {/* <input
            type="url"
            {...register("image", { required: "Image URL is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter image URL"
          /> */}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Camp Fees */}
        <div>
          <label className="block font-semibold mb-1">Camp Fees</label>
          <input
            type="number"
            {...register("fees", {
              required: "Camp fees are required",
              min: { value: 0, message: "Fees must be a positive value" },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter camp fees"
          />
          {errors.fees && (
            <p className="text-red-500 text-sm mt-1">{errors.fees.message}</p>
          )}
        </div>

        {/* Date & Time */}
        <div>
          <label className="block font-semibold mb-1">Date & Time</label>
          <input
            type="datetime-local"
            {...register("dateTime", { required: "Date & Time is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          {errors.dateTime && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateTime.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold mb-1">Location</label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Healthcare Professional Name */}
        <div>
          <label className="block font-semibold mb-1">
            Healthcare Professional Name
          </label>
          <input
            type="text"
            {...register("healthcareProfessional", {
              required: "Healthcare professional name is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter healthcare professional's name"
          />
          {errors.healthcareProfessional && (
            <p className="text-red-500 text-sm mt-1">
              {errors.healthcareProfessional.message}
            </p>
          )}
        </div>

        {/* Participant Count */}
        <div>
          <label className="block font-semibold mb-1">Participant Count</label>
          <input
            type="number"
            {...register("participantCount", {
              required: "Participant count is required",
              min: { value: 0, message: "Count cannot be negative" },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter participant count"
          />
          {errors.participantCount && (
            <p className="text-red-500 text-sm mt-1">
              {errors.participantCount.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter camp description"
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700"
          >
            <FaSave /> Save Camp
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCamp;
