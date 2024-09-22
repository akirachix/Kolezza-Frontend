import { useState, useEffect } from 'react';
import { FetchChildrenResponse } from '@/app/utils/types';

const url = '/api/children';

export function useChildren() {
    const [state, setState] = useState({
        activePatients: 0,
        inactivePatients: 0,
        loading: true,
        error: null as string | null,
    });

    const { activePatients, inactivePatients, loading, error } = state;

    const fetchChildren = async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch children');
            }

            const responseData: FetchChildrenResponse = await response.json();
            const children = responseData.child || []; 

            const active = children.filter(child => !child.is_deleted).length;
            const inactive = children.filter(child => child.is_deleted).length;

            setState({
                activePatients: active,
                inactivePatients: inactive,
                loading: false,
                error: null,
            });
        } catch (err) {
            setState(prev => ({
                ...prev,
                loading: false,
                error: (err as Error).message,
            }));
        }
    };

    useEffect(() => {
        fetchChildren();
    }, []);

    return { activePatients, inactivePatients, loading, error };
}