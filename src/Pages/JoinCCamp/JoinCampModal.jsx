import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

const JoinCampModal = ({ camp, onClose, onRegister }) => {
  const { user } = useAuth();
  const loggedInUser = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const registrationData = {
      ...data,
      campName: camp.name,
      campFees: camp.campFees,
      location: camp.location,
      professional: camp.professional,
      participantName: loggedInUser.displayName,
      participantEmail: loggedInUser.email,
    };
    onRegister(registrationData);
    console.log("Registration Data:", registrationData);
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="bg-white p-6 rounded-lg shadow-lg w-[90%]  sm:max-w-2xl mx-auto overflow-y-auto max-h-[95vh]">
    <h2 className="text-xl font-bold mb-4 text-center">Join Camp</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Read-only fields */}
      <div className="form-group">
        <label className="block text-sm font-semibold">Camp Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={camp.name}
          readOnly
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-semibold">Camp Fees</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={camp.campFees}
          readOnly
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-semibold">Location</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={camp.location}
          readOnly
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-semibold">
          Healthcare Professional
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={camp.professional}
          readOnly
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-semibold">Your Name</label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={loggedInUser.displayName}
          readOnly
        />
      </div>
      <div className="form-group">
        <label className="block text-sm font-semibold">Your Email</label>
        <input
          type="email"
          className="input input-bordered w-full"
          value={loggedInUser.email}
          readOnly
        />
      </div>

      {/* Dynamic fields */}
      <div className="form-group">
        <label className="block text-sm font-semibold">Age</label>
        <input
          type="number"
          className="input input-bordered w-full"
          {...register("age", { required: "Age is required" })}
        />
        {errors.age && (
          <span className="text-red-500 text-sm">{errors.age.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="block text-sm font-semibold">Phone Number</label>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{5,15}$/,
              message: "Invalid phone number",
            },
          })}
        />
        {errors.phone && (
          <span className="text-red-500 text-sm">
            {errors.phone.message}
          </span>
        )}
      </div>
      <div className="form-group">
        <label className="block text-sm font-semibold">Gender</label>
        <select
          className="select select-bordered w-full"
          {...register("gender", { required: "Gender is required" })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && (
          <span className="text-red-500 text-sm">{errors.gender.message}</span>
        )}
      </div>
      <div className="form-group">
        <label className="block text-sm font-semibold">
          Emergency Contact
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          {...register("emergencyContact", {
            required: "Emergency contact is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Invalid emergency contact",
            },
          })}
        />
        {errors.emergencyContact && (
          <span className="text-red-500 text-sm">
            {errors.emergencyContact.message}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="form-actions flex justify-end space-x-2">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={onClose}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default JoinCampModal;
