import { useState } from 'react';
import { fetchAdmin } from '@/app/utils/adminPost';
import { AdminRegistrationData, AdminRegistrationState,UseAdminRegistrationReturn } from '@/app/utils/types';

export const useAdminRegistration = (): UseAdminRegistrationReturn => {
    const [state, setState] = useState<AdminRegistrationState>({
        loading: false,
        errorMessage: '',
        successMessage: '',
    });

    const registerAdmin = async (data: AdminRegistrationData) => {
        setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '' }));

        try {
            await fetchAdmin(data); 
            setState((prev) => ({ ...prev, successMessage: 'Registration successful!' }));
        } catch (error) {
            if (error instanceof Error) {
                let errorMessage = 'Registration failed. Please try again.';
                
                if (error.message.includes('Failed to fetch')) {
                    errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
                } else if (error.message.includes('Server configuration error')) {
                    errorMessage = 'There is a problem with the server configuration. Please contact support.';
                } else {
                    errorMessage = error.message || errorMessage;
                }

                setState((prev) => ({ ...prev, errorMessage }));
            } else {
                setState((prev) => ({ ...prev, errorMessage: 'An unexpected error occurred. Please try again.' }));
            }
        } finally {
            setState((prev) => ({ ...prev, loading: false }));
        }
    };

    return { registerAdmin, ...state };
};
