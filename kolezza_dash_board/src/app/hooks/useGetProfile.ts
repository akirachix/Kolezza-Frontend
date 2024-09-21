import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultUserProfile, getProfile, updateProfile } from "../utils/fetchProfile";
import z from "zod"
import { UserProfileData } from "../utils/types";

export const useGetUserProfile = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const schema = z.object({
    first_name: z.string().min(1, "First name is required"),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(10, "Invalid phone number"),
    hospital: z.string().min(1, "Hospital name is required"),
    role: z.string().min(1, "Role is required"),
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserProfileData>({
    resolver: zodResolver(schema),
    defaultValues: defaultUserProfile,
  });

  

  useEffect(() => {

    
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const profileData: UserProfileData = await getProfile(userId);
        reset(profileData);
      } catch (err) {
        setError((err as Error).message);
        reset(defaultUserProfile);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  });

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: UserProfileData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null); 
  
    try {
      await updateProfile(userId, data);
      setSuccessMessage("Profile updated successfully!"); 
      reset(data); 
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };
  
  return {
    loading,
    error,
    register,
    handleSubmit,
    onSubmit,
    successMessage,
    errors,
  };
};
