
import { useState } from 'react';
import { fetchTherapist } from '../utils/newTherapistPost';
import { TherapistRegistrationData, TherapistRegistrationState, UseTherapistRegistrationReturn } from '../utils/types';

export const useTherapistRegistration = (): UseTherapistRegistrationReturn => {
    const [state, setState] = useState<TherapistRegistrationState>({
        loading: false,
        errorMessage: '',
        successMessage: '',
    });

    const registerTherapist = async (data: TherapistRegistrationData) => {
        setState((prev: any) => ({ ...prev, loading: true, errorMessage: '', successMessage: '' }));

        try {
            const result = await fetchTherapist(data);
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

    return { registerTherapist, ...state };
};