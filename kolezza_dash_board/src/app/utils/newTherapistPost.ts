import { TherapistRegistrationData, RegistrationSuccessResponse, RegistrationErrorResponse, FetchTherapistFunction } from './types';

const url = '/api/create_therapist';

export const fetchTherapist: FetchTherapistFunction = async (data: TherapistRegistrationData) => {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    

    const responseData: RegistrationSuccessResponse | RegistrationErrorResponse = await response.json();

    if (!response.ok) {
        throw new Error((responseData as RegistrationErrorResponse).error || 'Registration failed');
    }
    
    return responseData as RegistrationSuccessResponse;
};