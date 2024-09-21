import { useState } from "react";
import { fetchPatient } from "../utils/postPatients";
import {
  PatientRegistrationData,
  PatientRegistrationState,
  UsePatientRegistrationReturn,
} from "../utils/types";

export const usePatientRegistration = (): UsePatientRegistrationReturn => {
  const [state, setState] = useState<PatientRegistrationState>({
    loading: false,
    errorMessage: "",
    successMessage: "",
  });

  const registerPatient = async (data: PatientRegistrationData) => {
    setState((prev: PatientRegistrationState) => ({
      ...prev,
      loading: true,
      errorMessage: "",
      successMessage: "",
    }));

    try {
      const result = await fetchPatient(data);
      console.log("Registration result:", result);

      setState((prev: PatientRegistrationState) => ({
        ...prev,
        successMessage: "Patient registered successfully",
      }));
    } catch (error) {
      console.error("Registration error:", error);

      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          setState((prev: PatientRegistrationState) => ({
            ...prev,
            errorMessage: "Failed to fetch patient data",
          }));
        } else if (error.message.includes("Server error")) {
          setState((prev: PatientRegistrationState) => ({
            ...prev,
            errorMessage: "Server error",
          }));
        } else {
          setState((prev: PatientRegistrationState) => ({
            ...prev,
            errorMessage: "Registration failed",
          }));
        }
      } else {
        setState((prev: PatientRegistrationState) => ({
          ...prev,
          errorMessage: "Registration failed",
        }));
      }
    } finally {
      setState((prev: PatientRegistrationState) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  return { registerPatient, ...state };
};
