import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateModal = ({ camp, onUpdate, onClose }) => {
  const axiosPublic = useAxiosPublic();
  console.log(camp);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: camp?.name || "",
      dateTime: camp?.dateTime || "",
      location: camp?.location || "",
      professional: camp?.professional || "",
      participants: camp?.participants || 0,
      fees: camp?.campFees || 0,
      description: camp?.description || "",
    },
  });

  const onSubmit = async (data) => {
    let imageUrl = camp?.image || null;

    if (data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      imageUrl = res.data?.data?.display_url;
    }

    const updatedData = {
      ...data,
      image: imageUrl,
      participants: parseInt(data.participants, 10),
      campFees: parseFloat(data.fees),
    };

    onUpdate(updatedData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center  justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-6 rounded-md shadow-md lg:w-[65%] mx-auto max-h-[95vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Camp</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Camp Name</label>
            <input
              type="text"
              {...register("name", { required: "Camp name is required" })}
              className="w-full border p-2 rounded"
              placeholder="Enter camp name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Image</label>
            <input
              type="file"
              {...register("image")}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date and Time</label>
            <input
              type="datetime-local"
              {...register("dateTime", {
                required: "Date and time are required",
              })}
              className="w-full border p-2 rounded"
            />
            {errors.dateTime && (
              <span className="text-red-500 text-sm">
                {errors.dateTime.message}
              </span>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Location</label>
            <input
              type="text"
              {...register("location", { required: "Location is required" })}
              className="w-full border p-2 rounded"
              placeholder="Enter location"
            />
            {errors.location && (
              <span className="text-red-500 text-sm">
                {errors.location.message}
              </span>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Professional's Name
            </label>
            <input
              type="text"
              {...register("professional", {
                required: "Professional's name is required",
              })}
              className="w-full border p-2 rounded"
              placeholder="Enter professional's name"
            />
            {errors.professional && (
              <span className="text-red-500 text-sm">
                {errors.professional.message}
              </span>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Participent Count
            </label>
            <input
              readOnly
              type="number"
              {...register("participants", {
                required: "Participant count is required",
              })}
              className="w-full border p-2 rounded"
              placeholder="Enter participant count"
            />
            {errors.participants && (
              <span className="text-red-500 text-sm">
                {errors.participants.message}
              </span>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Fees</label>
            <input
              type="number"
              step="0.01"
              {...register("fees", { required: "Fees are required" })}
              className="w-full border p-2 rounded"
              placeholder="Enter fees"
            />
            {errors.fees && (
              <span className="text-red-500 text-sm">
                {errors.fees.message}
              </span>
            )}
          </div>

          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border p-2 rounded"
              placeholder="Enter description"
            ></textarea>
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-red-600 hover:bg-red-800  text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white  bg-gradient-to-r from-teal-500 to-green-400 rounded "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
