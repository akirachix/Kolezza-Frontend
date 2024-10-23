import { useState, useEffect } from 'react';
import { fetchChildren } from '@/app/utils/fetchChildren'; // Assuming this utility exists
import { FetchChildrenResponse } from '@/app/utils/types';

export function useChildren() {
    const [state, setState] = useState({
        activePatients: 0,
        inactivePatients: 0,
        loading: true,
        error: null as string | null,
    });

    const { activePatients, inactivePatients, loading, error } = state;

    const getChildren = async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response: FetchChildrenResponse = await fetchChildren(); 
            const children = response.child || []; 
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
        getChildren();
    }, []); 

    return { activePatients, inactivePatients, loading, error };
}
