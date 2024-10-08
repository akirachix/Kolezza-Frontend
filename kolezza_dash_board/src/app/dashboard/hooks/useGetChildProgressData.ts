import { useState, useEffect } from 'react';
import fetchProgressData from '@/app/utils/fetchProgressData';

const useGetProgressData = (childId: string) => {
  const [progressData, setProgressData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProgressData = async () => {
      try {
        const data = await fetchProgressData(childId);
        setProgressData(data);
      } catch (err) {
        setError('Failed to fetch progress data');
      } finally {
        setLoading(false);
      }
    };

    getProgressData();
  },[]);

  return { progressData, loading, error };
};

export default useGetProgressData;


