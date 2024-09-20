'use client';
import React from 'react';
import useGetChildData from '../../hooks/useGetChildData';
import useGetProgressData from '../../hooks/useGetChildProgressData';
import PatientDetails from '@/app/components/PatientDetails';
import LineChart from '@/app/components/LineGraph';
import Layout from '../../Layout';


const PatientPage = ({ params: { id } }: { params: { id: string } }) => {
  const { childData, loading: childLoading, error: childError } = useGetChildData(id);
  const { progressData, loading: progressLoading, error: progressError } = useGetProgressData(id);

  if (childLoading || progressLoading) {
    return <div>Loading...</div>;
  }

  if (childError) {
    return <div>Error loading patient details: {childError}</div>;
  }

  if (progressError) {
    return <div>Error loading progress data: {progressError}</div>;
  }

  return (
  <Layout>
     <div className="patient-dashboard">
      <div className="patient-details-section mb-10">
        <PatientDetails childId={id} />
      </div>

      <div className='ml-[20rem]'>
        <LineChart childId={id} />
      </div>
    </div>
  </Layout>
  );
};

export default PatientPage;
