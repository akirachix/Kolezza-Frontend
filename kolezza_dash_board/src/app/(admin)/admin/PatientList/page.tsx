"use client";


import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import useFetchPatients from "../patients/components/hooks/useFetchPatients";
import { FetchedPatient } from "../patients/components/utils/types";
import Link from 'next/link';
import Layout from "@/app/Layout";


const PatientDashboard = () => {
  const { patients, loading, error } = useFetchPatients();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const patientList: FetchedPatient[] = Array.isArray(patients) ? patients : [];
  const patientsPerPage = 5;

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredPatients: FetchedPatient[] = patientList.filter((patient) =>
    `${patient.first_name} ${patient.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const currentPatients = filteredPatients.slice(
    (currentPage - 1) * patientsPerPage,
    currentPage * patientsPerPage
  );

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading patients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Layout>
    <div className="flex w-full nh:w-20 h-screen">
      <div className="flex-1 p-0 md:p-0 lg:p-0">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="relative w-full mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search patient here..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 nh:text-[8px] text-center nh:w-36 nhm:w-46 nh:h-7 pr-4 py-2 border-lightGreen border-2 rounded-xl w-full md:w-[631px] h-12 focus:border-customGreen text-base md:text-lg"
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black nh:size-3"
              size={24}
            />
          </div>
          <Link href={`/admin/PatientOnboarding`}>
  <button className="text-black px-4 nh:text-[8px] py-2 nh:w-36 nh:h-7 border-lightGreen border-2 rounded-xl flex items-center justify-center w-full md:w-[207px] lg:w-[180px] xl:w-[200px] h-12 hover:border-customGreen focus:outline-none text-base md:text-lg">
    <Plus size={24} className="mr-2 nh:size-4" />
    Add Patient
  </button>
</Link>

        </div>

        <h2 className="text-2xl nh:mb-2 md:text-3xl nh:text-xl font-bold mb-6">
          All Patients
        </h2>

        <div className="overflow-x-auto">
          <table
            className="w-full"
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: "0 8px",
            }}
          >
            <thead>
              <tr className="bg-lightGreen text-white md:text-lg">
                <th className="py-3 nh:py-[0.1rem] md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 text-left rounded-l-lg border-2 nh:text-[10px]">
                  Patient ID
                </th>
                <th className="py-3 nh:py-[0.1rem] md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 text-left border-2 nh:text-[10px]">
                  First Name
                </th>
                <th className="py-3 nh:py-[0.1rem] md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 text-left border-2 nh:text-[10px]">
                  Middle Name
                </th>
                <th className="py-3 nh:py-[0.1rem] md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 text-left border-2 nh:text-[10px]">
                  Last Name
                </th>
                <th className="py-3 nh:py-[0.1rem] md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 rounded-r-lg border-2 nh:text-[10px]">
                  Gender
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.length > 0 ? (
                currentPatients.map((patient: FetchedPatient, index) => (
                  <tr
                    key={patient.id}
                    className={`text-base nh:text-sm nh:h-4 md:text-lg ${
                      index % 2 === 0 ? "bg-gray-200" : "bg-white"
                    }`}
                  >
                    <td className="py-3 md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 rounded-l-lg nh:text-[10px]">
                      {patient.id}
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 nh:text-[10px]">
                      {patient.first_name || "N/A"}
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 nh:text-[10px]">
                      {patient.middle_name || "N/A"}
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 nh:text-[10px]">
                      {patient.last_name || "N/A"}
                    </td>
                    <td className="py-3 md:py-4 px-4 md:px-6 lg:px-4 xl:px-6 rounded-r-lg nh:text-[10px]">
                      {patient.gender || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-base md:text-lg"
                  >
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-6 space-y-4 md:space-y-0 md:space-x-4">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`w-10 h-10 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-full ${
                currentPage === index + 1
                  ? "bg-lightGreen text-white"
                  : "bg-gray-200 text-black"
              } flex items-center justify-center focus:outline-none nh:text-sm text-base nh:h- md:text-lg`}
            >
              {index + 1}
            </button>
          ))}
          <p className="text-base md:text-lg nh:text-sm mt-4 md:mt-0 md:ml-4">
            Total patients: {filteredPatients.length}
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default PatientDashboard;










