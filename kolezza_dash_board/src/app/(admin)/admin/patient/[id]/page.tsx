"use client";
import React from "react";
import useGetProgressData from "../../components/hooks/useGetChildProgressData";
import LineChart from "../../components/LineGraph";
import Layout from "@/app/Layout";
import PatientDetails from "@/app/components/PatientDetails";
import useGetChildData from "../../components/hooks/useGetChildData";

const PatientPage = ({ params: { id } }: { params: { id: string } }) => {
  const {
    
    loading: childLoading,
    error: childError,
  } = useGetChildData(id);
  const {
    
    loading: progressLoading,
    error: progressError,
  } = useGetProgressData(id);

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

        <div className="ml-[20rem]">
          <LineChart childId={id} />
        </div>
      </div>
    </Layout>
  );
};

export default PatientPage;
