export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string; 
  gender: string;
  date_of_birth: Date; 
}


export interface UsersFetchSuccessResponse {
    users: User[];
    total: number;
}

export interface PatientRegistrationState {
  loading: boolean;
  errorMessage: string;
  successMessage: string;
}

export interface ApiPatient {
  id: number;
  first_name: string;
  middle_name?: string; 
  last_name: string;
  gender: string;
}


export interface UsePatientRegistrationReturn {
  registerPatient: (data: PatientRegistrationData) => Promise<void>;
  errorMessage: string;
  successMessage: string;
}

export interface PatientRegistrationData {
  first_name: string; 
  last_name: string;
  middle_name?: string; 
  gender: string;
  date_of_birth: Date;
  level_of_stuttering_id: number;
  childmodule_id?: number;
}

export interface FetchedPatient {
  id: number;                  
  first_name: string;         
  middle_name?: string;       
  last_name: string;          
  gender: string;             
}

export interface RegistrationSuccessResponse {
  message: string;
  patients: Patient[];        
}


export interface FetchPatientsSuccessResponse {
  patients: FetchedPatient[]; 
}


export interface RegistrationErrorResponse {
  error: string; 
  details?: {
      field?: string;
      message?: string;
  };
}


export type FetchPatientsFunction = () => Promise<FetchPatientsSuccessResponse | RegistrationErrorResponse>;


export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role: string;
}

export interface UsersFetchSuccessResponse {
    users: User[];
    total: number;
}
export interface UsersFetchErrorResponse {
    error: string;
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
export interface FetchChildrenResponse {
    child: Child[];
}
export interface FetchUsersResponse {
    users: User[];
}