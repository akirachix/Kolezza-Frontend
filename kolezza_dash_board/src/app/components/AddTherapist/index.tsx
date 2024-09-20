
'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaUser, FaEnvelope, FaHospital, FaLock } from 'react-icons/fa';
import { MdPhone } from "react-icons/md";
import { useTherapistRegistration } from '@/app/hooks/useTherapistRegistration';
import { TherapistRegistrationData } from '@/app/utils/types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Schema for form validation
const therapistSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm password is required"),
  hospital_name: z.string().min(1, "Hospital name is required"),
  phoneNumber: z.string().min(9, "Phone number is required")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const TherapistRegistration = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof therapistSchema>>({
    resolver: zodResolver(therapistSchema),
  });

  const { registerTherapist, loading } = useTherapistRegistration();
  const onSubmit = async (data: TherapistRegistrationData) => {
    try {
      await registerTherapist(data);
      toast.success('Registration successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error('Registration failed. Please try again.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-24 p-8 space-y-6 font-nunito">
        {/* First Name and Last Name */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <label className="block text-lg font-medium mb-1">First Name</label>
            <div className="relative">
              <input
                {...register('firstName')}
                type="text"
                placeholder="Enter first name"
                className="mt-1 block w-full border-3 border-green rounded-md shadow-sm pl-10 pr-2 py-4"
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            </div>
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div className="flex-1 relative">
            <label className="block text-lg font-medium mb-1">Last Name</label>
            <div className="relative">
              <input
                {...register('lastName')}
                type="text"
                placeholder="Last name"
                className="mt-1 block w-full border-3 border-green rounded-md shadow-sm pl-10 pr-2 py-4"
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            </div>
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        {/* Email */}
        <div className="relative">
          <label className="block text-lg font-medium mb-1">Email</label>
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              placeholder="Enter email address"
              className="mt-1 block w-full border-3 border-green rounded-md shadow-sm pl-10 pr-2 py-4"
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        {/* Hospital Name and Phone Number */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <label className="block text-lg font-medium mb-1">Hospital Name</label>
            <div className="relative">
              <input
                {...register('hospital_name')}
                type="text"
                placeholder="Enter hospital name"
                className="mt-1 block w-full border-3 border-green rounded-md shadow-sm pl-10 pr-2 py-4"
              />
              <FaHospital className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            </div>
            {errors.hospital_name && <p className="text-red-500 text-xs mt-1">{errors.hospital_name.message}</p>}
          </div>
          <div className="flex-1 relative">
            <label className="block text-lg font-medium mb-1">Phone Number</label>
            <div className="relative">
              <input
                {...register('phoneNumber')}
                type="tel"
                placeholder="Enter phone number"
                className="mt-1 block w-full border-3 border-green rounded-md shadow-sm pl-10 pr-2 py-4"
              />
              <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>
        </div>

        {/* Username */}
        <div className="relative">
          <label className="block text-lg font-medium mb-1">Username</label>
          <div className="relative">
            <input
              {...register('username')}
              type="text"
              placeholder="Enter username"
              className="mt-1 block w-full border-3 border-green rounded-md shadow-sm pl-10 pr-2 py-4"
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
          </div>
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>

        {/* Password and Confirm Password */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <label className="block text-lg font-medium mb-1">Password</label>
            <div className="relative">
              <input
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                className="mt-1 block w-full border-3 border-green rounded-md shadow-sm pl-10 pr-2 py-4"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="flex-1 relative">
            <label className="block text-lg font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Re-enter your password to confirm"
                className="mt-1 block w-full border-3 border-green rounded-md shadow-sm pl-10 pr-2 py-4"
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className={`w-40 bg-darkblue text-white p-4 mx-auto flex justify-center rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-darkblue'}`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default TherapistRegistration;
