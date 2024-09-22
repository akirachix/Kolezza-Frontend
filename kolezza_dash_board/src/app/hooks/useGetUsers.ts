import { useState, useEffect } from 'react';
import { fetchUsers } from '../utils/fetchUser';
import { User, FetchUsersResponse } from '../utils/types';

export const useUsers = () => {
    const [state, setState] = useState({
        currentUsers: [] as User[],
        totalUsers: 0,
        currentPage: 1,
        loading: true,
        error: null as string | null,
    });

    const { currentUsers, totalUsers, currentPage, loading, error } = state;

    const paginate = (pageNumber: number) => setState(prev => ({ ...prev, currentPage: pageNumber }));

    useEffect(() => {
        const getUsers = async () => {
            setState(prev => ({ ...prev, loading: true, error: null }));
            try {
                console.log('Fetching users from API...');
                const response = await fetchUsers(); 
                console.log('API response:', response);
                
                const { users }: FetchUsersResponse = response;
                
                setState(prev => ({
                    ...prev,
                    currentUsers: users.slice(
                        (prev.currentPage - 1) * 5, 
                        prev.currentPage * 5
                    ),
                    totalUsers: users.length,
                }));
            } catch (err) {
                console.error('Error fetching users:', err);
                setState(prev => ({
                    ...prev,
                    error: err instanceof Error ? err.message : 'An unexpected error occurred.',
                }));
            } finally {
                setState(prev => ({ ...prev, loading: false }));
            }
        };

        getUsers();
    }, []);

    return { currentUsers, totalUsers, currentPage, loading, error, paginate };
};






