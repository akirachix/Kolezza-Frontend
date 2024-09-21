"use client";

import React, { useState } from "react";
import { FaUser, FaArrowLeft } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useGetUserProfile } from "@/app/hooks/useGetProfile";
import Sidebar from "@/app/components/Sidebar";


type Params = {
  userId: string;
};


interface ProfileData{
  first_name: string ,
  middle_name?: string,
  last_name: string,
  email: string,
  phone: string,
  hospital: string,
  role: string,
}
const UserProfile = function ({ params: { userId } }: { params: Params }) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    loading,
    error,
    register,
    handleSubmit,
    onSubmit,
    errors,
  } = useGetUserProfile(userId);

  const handleFormSubmit = async (data: ProfileData) => {
    try {
      await onSubmit(data);
      setSuccessMessage("Profile updated successfully!");
    } catch (err) {
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar/>

      {/* Profile Content */}
      <div className="flex-1 bg-white p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <FaArrowLeft size={30} className="cursor-pointer" />
          <AiOutlineLogout size={30} className="cursor-pointer" />
        </div>

        <h1 className="text-4xl font-bold mb-8 text-center">User Profile</h1>

        {/* Profile Picture */}
        <div className="flex items-center mb-8 justify-center relative">
          <div className="bg-[#90BD31] rounded-full w-[210px] h-[210px] flex items-center justify-center mr-2 relative">
            <FaUser size={80} color="#fff" />
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-12">
          <div className="grid grid-cols-3 gap-x-6 gap-y-6">
            {/* First Name */}
            <div className="space-y-2">
              <label htmlFor="first_name" className="text-lg font-medium">
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                {...register("first_name")}
                className={`border border-green-400 px-4 py-4 rounded-lg text-lg w-full ${
                  errors.first_name ? "border-red-500" : ""
                }`}
                placeholder="Enter First Name"
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.first_name?.message}</p>
              )}
            </div>

            {/* Middle Name */}
            <div className="space-y-2">
              <label htmlFor="middle_name" className="text-lg font-medium">
                Middle Name
              </label>
              <input
                id="middle_name"
                type="text"
                {...register("middle_name")}
                className="border border-green-400 px-4 py-4 rounded-lg text-lg w-full"
                placeholder="Enter Middle Name"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label htmlFor="last_name" className="text-lg font-medium">
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                {...register("last_name")}
                className={`border border-green-400 px-4 py-4 rounded-lg text-lg w-full ${
                  errors.last_name ? "border-red-500" : ""
                }`}
                placeholder="Enter Last Name"
              />
              {errors.last_name && (
                <p className="text-red-500">{errors.last_name?.message}</p>
              )}
            </div>
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-lg font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className={`border border-green-400 px-4 py-4 rounded-lg text-lg w-full ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-lg font-medium">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone")}
                className={`border border-green-400 px-4 py-4 rounded-lg text-lg w-full ${
                  errors.phone ? "border-red-500" : ""
                }`}
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone?.message}</p>
              )}
            </div>
          </div>

          {/* Hospital and Role */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-6">
            <div className="space-y-2">
              <label htmlFor="hospital" className="text-lg font-medium">
                Hospital
              </label>
              <input
                id="hospital"
                type="text"
                {...register("hospital")}
                className={`border border-green-400 px-4 py-4 rounded-lg text-lg w-full ${
                  errors.hospital ? "border-red-500" : ""
                }`}
                placeholder="Hospital"
              />
              {errors.hospital && (
                <p className="text-red-500">{errors.hospital?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="role" className="text-lg font-medium">
                Role
              </label>
              <input
                id="role"
                type="text"
                {...register("role")}
                className={`border border-green-400 px-4 py-4 rounded-lg text-lg w-full ${
                  errors.role ? "border-red-500" : ""
                }`}
                placeholder="Role"
              />
              {errors.role && (
                <p className="text-red-500">{errors.role?.message}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-[200px] text-lg bg-customDarkBlue text-white py-4 px-6 rounded-lg transition duration-200"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-center mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
