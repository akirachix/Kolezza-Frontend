import { useState, useEffect } from 'react';
import fetchProgressData from '../utils/fetchProgressData';

const useGetProgressData = (childId: string) => {
  const [progressData, setProgressData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProgressData = async () => {
      setLoading(true)
      try {
        const data = await fetchProgressData(childId);
        setProgressData(data);
        setLoading(false)
      } catch (err) {
        setLoading(false)
        setError('Failed to fetch progress data');
      } finally {
        setLoading(false);
      }
    };

    getProgressData();
  }, []); 
  return { progressData, loading, error };
};

export default useGetProgressData;
