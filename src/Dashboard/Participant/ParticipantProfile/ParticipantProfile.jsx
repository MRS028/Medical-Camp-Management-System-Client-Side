import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useUsers from "../../../Hooks/useUsers";
import LoadingPage from "../../../Pages/Loading/LoadingPage";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ParticipantProfile = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const { user, updateUserProfile } = useAuth();
  const [users, loading, refetch] = useUsers();
  const [currentUser, setCurrentUser] = useState(null);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  useEffect(() => {
    if (users.length > 0) {
      const matchedUser = users.find(
        (participant) => participant.email === user.email
      );
      if (matchedUser) {
        setCurrentUser(matchedUser);
      }
    }
  }, [users, user.email]);

  const handleUpdate = async (data) => {
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); 
      },
    });
    let imageUrl = currentUser?.image || null;

    if (data.image && data.image[0]) {
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      imageUrl = res.data?.data?.display_url;
    }
    // console.log(data.name, imageUrl);
    updateUserProfile(data?.name,imageUrl )
      .then(() => {
        console.log("User updatetd");
      })
      .catch((err) => {
        console.log(err);
      });
    const updatedData = {
      name: data.name,
      email: currentUser.email,
      phone: data.phone,
      photoURL: imageUrl || currentUser.photoURL,
    };
    saveProfile(updatedData);
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false, 
      didOpen: () => {
        Swal.showLoading(); 
      },
    });
    Swal.close();

    // console.log(updatedData);
  };

  const saveProfile = async (updatedData) => {
    // console.log(updatedData);

    const res = await axiosSecure.patch(
      `/user/${currentUser._id}`,
      updatedData
    );
    
    if (!res?.data?.modifiedCount) {
      Swal.fire({
        title: "You don't change anything yet!",
        text: "If You want then make updates.",
        icon: "error",
        timer: 20000,
        cancelButtonColor: "#1bb1b1",
        showConfirmButton: true,
      });
    }

    if (res.data.modifiedCount > 0) {
      setCurrentUser(
        users.map((user) =>
          user._id === currentUser._id ? { ...user, ...updatedData } : user
        )
      );
      refetch();
      Swal.close();
      setIsEditing(false);
      Swal.fire({
        title: "Updated!",
        text: "Profile has been updated successfully.",
        icon: "success",
        timer: 1500,
        cancelButtonColor: "#1bb1b1",
        showConfirmButton: true,
      });
    }
  };
  //created time and last log in time

  if (loading) {
    return <LoadingPage />;
  }
  if (currentUser?.role === "admin") {
    return navigate("/");
  }

  return (
    <>
      {currentUser?.role !== "admin" ? (
        <>
          {" "}
          <div className="max-w-2xl mx-auto mt-16 p-6 bg-white shadow-md rounded-md">
            <SectionTitle
              heading={"my profile"}
              subHeading={"Enjoy Your Day"}
            ></SectionTitle>
            {/* <h1 className="text-2xl font-bold text-center mb-6">
          Participant Profile
        </h1> */}
            <div className="flex items-center justify-center mb-6">
              {currentUser && currentUser.photoURL ? (
                <img
                  src={currentUser.photoURL}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-400" />
              )}
            </div>

            {!isEditing ? (
              <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
                <div className="text-left">
                  <p className="text-2xl font-bold text-gray-800 mb-2">
                    {currentUser?.name}
                  </p>

                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-medium">Email: </span>
                    <span className="text-gray-500">{currentUser?.email}</span>
                  </p>

                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-medium">Phone: </span>
                    <span className="text-gray-500">
                      {currentUser?.phone || "No phone number added"}
                    </span>
                  </p>

                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-medium">Created At: </span>
                    <span className="text-gray-500">
                      {user?.metadata?.creationTime || "No data available"}
                    </span>
                  </p>

                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-medium">Last Login: </span>
                    <span className="text-gray-500">
                      {user?.metadata?.lastSignInTime || "No data available"}
                    </span>
                  </p>

                  <p className="text-base text-gray-700 mb-1">
                    <span className="font-medium">Role: </span>
                    <span className="text-gray-500 ">
                      {currentUser?.role || "No data available"}
                    </span>
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    className="bg-gradient-to-r font-semibold from-teal-500 to-green-400 text-white px-6 py-2 rounded-lg shadow-md 0 transition-colors duration-200"
                    onClick={() => setIsEditing(true)}
                  >
                    Update Profile
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit(handleUpdate)}>
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.name}
                    {...register("name")}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    defaultValue={currentUser?.email}
                    {...register("email")}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    defaultValue={currentUser?.phone || ""}
                    {...register("phone")}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    className="file-input w-full  input-bordered focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="bg-red-600 text-white font-semibold  px-4 py-2 rounded-lg hover:bg-red-800"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-gradient-to-r font-semibold from-teal-500 to-green-400 text-white px-4 py-2 rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </>
      ) : (
        <> </>
      )}
    </>
  );
};

export default ParticipantProfile;
