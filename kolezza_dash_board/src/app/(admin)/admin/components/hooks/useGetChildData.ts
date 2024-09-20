import { useState, useEffect } from 'react';
import fetchChildData from '../utils/fetchPatientData';

const useGetChildData = (childId: string) => {
  const [childData, setChildData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getChildData = async () => {
      try {
        const data = await fetchChildData(childId);
        
        setChildData(data);
      } catch (err) {
        setError('Failed to fetch child data');
      } finally {
        setLoading(false);
      }
    };

    getChildData();
  }, []);

  return { childData, loading, error };
};

export default useGetChildData;



