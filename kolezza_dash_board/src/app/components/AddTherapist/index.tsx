
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
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  const inputClassName = "mt-1 block w-full border-2 border-lightGreen rounded-md shadow-sm pl-10 pr-2 py-4";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-14 p-8 space-y-6 font-nunito">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <label className="block text-lg font-medium mb-1">First Name</label>
            <div className="relative">
              <input
                {...register('firstName')}
                type="text"
                placeholder="Enter first name"
                className={inputClassName}
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customDarkBlue" />
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
                className={inputClassName}
              />
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customDarkBlue" />
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
              className={inputClassName}
            />
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customDarkBlue" />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <label className="block text-lg font-medium mb-1">Hospital Name</label>
            <div className="relative">
              <input
                {...register('hospital_name')}
                type="text"
                placeholder="Enter hospital name"
                className={inputClassName}
              />
              <FaHospital className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customDarkBlue" />
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
                className={inputClassName}
              />
              <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customDarkBlue" />
            </div>
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
          </div>
        </div>


        <div className="relative">
          <label className="block text-lg font-medium mb-1">Username</label>
          <div className="relative">
            <input
              {...register('username')}
              type="text"
              placeholder="Enter username"
              className={inputClassName}
            />
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customDarkBlue" />
          </div>
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </div>


        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <label className="block text-lg font-medium mb-1">Password</label>
            <div className="relative">
              <input
                {...register('password')}
                type="password"
                placeholder="Enter your password"
                className={inputClassName}
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customDarkBlue" />
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
                className={inputClassName}
              />
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customDarkBlue" />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className={`w-40 bg-customDarkBlue text-white p-4 mx-auto flex justify-center rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-customBlue hover:text-customDarkBlue'}`}
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
