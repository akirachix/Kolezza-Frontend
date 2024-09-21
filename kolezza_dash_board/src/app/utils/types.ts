interface UserProfileData {
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    phone: string;
    hospital: string;
    role: string;
  }

  interface LoginCredentials {
    username: string;
    password: string;
  }
export interface Child {
    id: number;
    first_name: string;
    last_name: string;
    middle_name: string;
    gender: string;
    date_of_birth: string;
    is_deleted: boolean;
    updated_at: string | null;
    level_of_stuttering_id: number;
    childmodule_id: number;
  }
  
  export interface ChildrenResponse {
    child: Child[];
  }
  

// Therapist registration form data
export interface TherapistRegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    hospital_name: string;
    phoneNumber: string;
  }
  
  // API response for successful registration
  export interface RegistrationSuccessResponse {
    message: string;
    therapist: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      username: string;
      hospital_name: string;
      phoneNumber: string;
    };
  }
  
  // API response for failed registration
  export interface RegistrationErrorResponse {
    error: string;
  }
  
  // Hook state
  export interface TherapistRegistrationState {
    loading: boolean;
    errorMessage: string;
    successMessage: string;
  }
  
  // Hook return type
  export interface UseTherapistRegistrationReturn {
    registerTherapist: (data: TherapistRegistrationData) => Promise<void>;
    loading: boolean;
    errorMessage: string;
    successMessage: string;
  }
  
  // Fetch therapist function type
  export type FetchTherapistFunction = (data: TherapistRegistrationData) => Promise<RegistrationSuccessResponse>;










// Admin Data Types

export interface AdminRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

// API response for successful registration
export interface RegistrationSuccessResponse {
  message: string;
  admin: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
  };
}

// API response for failed registration
export interface RegistrationErrorResponse {
  error: string;
}

// Hook state
export interface AdminRegistrationState {
  loading: boolean;
  errorMessage: string;
  successMessage: string;
}

// Hook return type
export interface UseAdminRegistrationReturn {
  registerAdmin: (data: AdminRegistrationData) => Promise<void>;
  loading: boolean;
  errorMessage: string;
  successMessage: string;
}

// Fetch therapist function type
export type FetchAdminFunction = (data: AdminRegistrationData) => Promise<RegistrationSuccessResponse>;