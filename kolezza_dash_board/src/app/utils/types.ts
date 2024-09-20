export interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  middle_name?: string; 
  gender: string;
  date_of_birth: Date; 
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
