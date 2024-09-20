
import { AdminRegistrationData, RegistrationSuccessResponse,RegistrationErrorResponse,FetchAdminFunction } from './types';

const url = '/api/create_admin';

export const fetchAdmin: FetchAdminFunction = async (data: AdminRegistrationData) => {
    console.log('Sending data to API:', data);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    
    console.log('API response status:', response.status);

    const responseData: RegistrationSuccessResponse | RegistrationErrorResponse = await response.json();
    console.log('API response data:', responseData);

    if (!response.ok) {
        throw new Error((responseData as RegistrationErrorResponse).error || 'Registration failed');
    }
    
    return responseData as RegistrationSuccessResponse;
};