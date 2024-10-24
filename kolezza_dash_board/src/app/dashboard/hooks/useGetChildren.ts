import { useState, useEffect } from 'react';
import { fetchChildren } from '@/app/utils/fetchChildren'; // Assuming you have this utility
import { FetchChildrenResponse, Child } from '@/app/utils/types';

export const useChildren = () => {
  const [activePatients, setActivePatients] = useState<number>(0);
  const [inactivePatients, setInactivePatients] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getChildren = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('Fetching children from API...');
        const response: FetchChildrenResponse = await fetchChildren();
        console.log('API response:', response);

        // Ensure that the `child` field is always treated as an array
        const children: Child[] = response?.child ?? [];  // Default to an empty array if `child` is undefined or null

        const active = children.filter(child => !child.is_deleted).length;
        const inactive = children.filter(child => child.is_deleted).length;

        setActivePatients(active);
        setInactivePatients(inactive);
      } catch (err) {
        console.error('Error fetching children:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    getChildren();
  }, []);

  return { activePatients, inactivePatients, loading, error };
};
