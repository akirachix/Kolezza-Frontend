import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultUserProfile, getProfile, updateProfile } from "../utils/fetchProfile";
import { schema } from "../profile/[userId]/page";
import { UserProfileData } from "../utils/types";

export const useGetUserProfile = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
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
      } catch (err: any) {
        setError(err.message);
        reset(defaultUserProfile);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [reset]);

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
    errors,
  };
};
