import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const JoinCampModal = ({ camp, onClose, onRegister }) => {
  const { user } = useAuth();
  const loggedInUser = user;
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // console.log(camp._id)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const registrationData = {
      ...data,
      campId: camp._id,
      campName: camp.name,
      transactionId: "",
      campFees: camp.campFees,
      location: camp.location,
      professional: camp.professional,
      participantName: loggedInUser.displayName,
      participantEmail: loggedInUser.email,
      confirmationStatus: "Pending",
      feedback: true,
      paymentStatus: "Unpaid",
    };

    // Show confirmation modal using SweetAlert2
    Swal.fire({
      title: "Confirm Registration",
      html: `
        <div class="text-left">
          <p><strong>Camp Name:</strong> ${registrationData.campName}</p>
          <p><strong>Camp Fees:</strong> ${registrationData.campFees}</p>
          <p><strong>Location:</strong> ${registrationData.location}</p>
          <p><strong>Healthcare Professional:</strong> ${registrationData.professional}</p>
          <p><strong>Your Name:</strong> ${registrationData.participantName}</p>
          <p><strong>Your Email:</strong> ${registrationData.participantEmail}</p>
          <p><strong>Age:</strong> ${registrationData.age}</p>
          <p><strong>Phone:</strong> ${registrationData.phone}</p>
          <p><strong>Gender:</strong> ${registrationData.gender}</p>
          <p><strong>Emergency Contact:</strong> ${registrationData.emergencyContact}</p>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Back",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, send the data to the server
        axiosPublic
          .post("/join-camps", registrationData)
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              icon: "success",
              title: "Registration Successful!",
              text: "You will be redirected to the payment page.",
              showConfirmButton: true,
              timer: 1500,
            });
            onRegister(registrationData);
            navigate("/dashboard/registeredCamps");
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Registration Failed",
              text: "Something went wrong. Please try again later.",
            });
          });
      } else {
        console.log("User chose to edit the form.");
      }
    });
  };

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%]  sm:max-w-2xl mx-auto overflow-y-auto max-h-[95vh]">
        <h2 className="text-2xl font-bold mb-4 text-center">Join Camp</h2>
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
              <span className="text-red-500 text-sm">
                {errors.gender.message}
              </span>
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
              className="btn btn-ghost bg-red-600 text-white hover:bg-red-800"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn text-white  bg-gradient-to-r from-teal-500 to-green-400"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinCampModal;
