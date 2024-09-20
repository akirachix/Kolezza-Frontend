
import { useState } from 'react';
import { fetchAdmin } from '../utils/adminPost';
import { AdminRegistrationData, AdminRegistrationState,UseAdminRegistrationReturn } from '../utils/types';

export const useAdminRegistration = (): UseAdminRegistrationReturn => {
    const [state, setState] = useState<AdminRegistrationState>({
        loading: false,
        errorMessage: '',
        successMessage: '',
    });

    const registerAdmin = async (data: AdminRegistrationData) => {
        setState((prev: any) => ({ ...prev, loading: true, errorMessage: '', successMessage: '' }));

        try {
            console.log('Registering admin with data:', data);
            const result = await fetchAdmin(data);
            console.log('Registration result:', result);
            setState((prev: any) => ({ ...prev, successMessage: 'Registration successful!' }));
        } catch (error) {
            console.error('Registration error:', error);
            if (error instanceof Error) {
                if (error.message.includes('Failed to fetch')) {
                    setState((prev: any) => ({ ...prev, errorMessage: 'Unable to connect to the server. Please check your internet connection and try again.' }));
                } else if (error.message.includes('Server configuration error')) {
                    setState((prev: any) => ({ ...prev, errorMessage: 'There is a problem with the server configuration. Please contact support.' }));
                } else {
                    setState((prev: any) => ({ ...prev, errorMessage: (error as Error).message || 'Registration failed. Please try again.' }));
                }
            } else {
                setState((prev: any) => ({ ...prev, errorMessage: 'An unexpected error occurred. Please try again.' }));
            }
        } finally {
            setState((prev: any) => ({ ...prev, loading: false }));
        }
    };

    return { registerAdmin, ...state };
};