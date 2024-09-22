import { useState, useEffect } from 'react';
import fetchChildData from '../utils/fetchPatientData';

interface Patient {
  id: number;
  first_name: string;
  last_name: string;
  is_deleted: boolean;
  is_new: boolean;
  date_of_registration?: string;
  date_of_birth: string;
  childModule_id: string;
}

const useGetChildData = (childId: string) => {
  const [childData, setChildData] = useState<Patient>({
    id: 0,
    first_name: '',
    last_name: '',
    is_deleted: false,
    is_new: false,
    date_of_birth: '',
    childModule_id: ''
  });
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
  }, [childId]); 

  return { childData, loading, error };
};

export default useGetChildData;