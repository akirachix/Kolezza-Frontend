import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/fetchUser';
import { User, FetchUsersResponse } from '../utils/types';

export const useUsers = () => {
    const [state, setState] = useState({
        users: [] as User[],
        loading: true,
        error: null as string | null,
    });

    const { users, loading, error } = state;

    useEffect(() => {
        const getUsers = async () => {
            setState(prev => ({ ...prev, loading: true, error: null }));
            try {
                console.log('Fetching users from API...');
                const response = await fetchUsers(); 
                console.log('API response:', response);
                
                const { users }: FetchUsersResponse = response;
                
                setState({
                    users,
                    loading: false,
                    error: null,
                });
            } catch (err) {
                console.error('Error fetching users:', err);
                setState(prev => ({
                    ...prev,
                    error: err instanceof Error ? err.message : 'An unexpected error occurred.',
                    loading: false,
                }));
            }
        };

        getUsers();
    }, []);

    return { users, loading, error };
};
