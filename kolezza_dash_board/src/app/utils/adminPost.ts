
import { AdminRegistrationData, RegistrationSuccessResponse,RegistrationErrorResponse,FetchAdminFunction } from './types';

const url = '/api/create_admin';

export const fetchAdmin: FetchAdminFunction = async (data: AdminRegistrationData) => {

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