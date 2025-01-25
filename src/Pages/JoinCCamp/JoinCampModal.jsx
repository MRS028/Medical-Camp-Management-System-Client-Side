import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";

const JoinCampModal = ({ camp, onClose, onRegister }) => {
  const { user } = useAuth();
  const loggedInUser = user;
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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
      feedback: false,
      paymentStatus: "Unpaid",
      date: "",
    };

    const participantCount = {
      action: "increment",
    };

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
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(
          `/participant-count/${camp._id}`,
          participantCount
        );

        Swal.fire({
          title: "Loading...",
          text: "Please wait while we process your request.",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        Swal.close();

        axiosPublic
          .post("/join-camps", registrationData)
          .then(() => {
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] sm:max-w-5xl mx-auto overflow-y-auto max-h-[95vh]">
        <SectionTitle heading={"Join Camp"} subHeading={"Let's Go For Your Fitness"}></SectionTitle>
        {/* <h2 className="text-3xl font-extrabold mb-6 text-center text-teal-600">Join Camp</h2> */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">Camp Name</label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100 text-gray-800"
                value={camp.name}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Camp Fees</label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100 text-gray-800"
                value={camp.campFees}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Location</label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100 text-gray-800"
                value={camp.location}
                readOnly
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Healthcare Professional</label>
              <input
                type="text"
                className="input input-bordered w-full bg-gray-100 text-gray-800"
                value={camp.professional}
                readOnly
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">Your Name</label>
            <input
              type="text"
              className="input input-bordered w-full bg-gray-100 text-gray-800"
              value={loggedInUser.displayName}
              readOnly
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600">Your Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-100 text-gray-800"
              value={loggedInUser.email}
              readOnly
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600">Age</label>
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("age", { required: "Age is required" })}
              />
              {errors.age && (
                <span className="text-red-500 text-sm">{errors.age.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Phone Number</label>
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
                <span className="text-red-500 text-sm">{errors.phone.message}</span>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-600">Gender</label>
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
            <div>
              <label className="block text-sm font-semibold text-gray-600">Emergency Contact</label>
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
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="btn btn-ghost bg-red-600 text-white hover:bg-red-800 px-6 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg"
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
