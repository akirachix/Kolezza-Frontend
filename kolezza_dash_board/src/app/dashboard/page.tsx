"use client"
import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { useSearch } from "@/app/hooks/useSearchUsers";
import { usePatients } from "@/app/hooks/useGetPatients";
import Layout from "@/app/Layout";

interface Patient {
  id: number;
  first_name: string;
  last_name: boolean;
  is_deleted: boolean;
  is_new: boolean;
  date_of_registration?: string;
}

interface ChartData {
  timeFrame: string;
  activeUsers: number;
  inactiveUsers: number;
}

const StatCard = ({
  title,
  value,
  bgColor,
  textColor = "text-black",
}: {
  title: string;
  value: number;
  bgColor: string;
  textColor?: string;
}) => (
  <div
    className={`rounded-lg p-6 ${textColor} ${bgColor} h-40 flex flex-col justify-center items-center shadow-lg text-center`}
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-4xl font-bold">{value}</p>
  </div>
);

const Dashboard = () => {
  const {
    query,
    searchResults,
    fetchLoading: searchLoading,
    error: searchError,
    handleInputChange,
    handleKeyPress,
  } = useSearch();
  const { patients } = usePatients();

  const totalPatients: number = patients.length;
  const activePatients: number = patients.filter(
    (patient: Patient) => !patient.is_deleted
  ).length;
  const inactivePatients: number = patients.filter(
    (patient: Patient) => patient.is_deleted
  ).length;

  const groupPatientsByTimeFrame = (patients: Patient[], timeFrame: "day" | "week" | "month") => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const months = Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString("default", { month: "long" })
    );

    let timeFrameStats: ChartData[] = [];

    if (timeFrame === "day") {
      timeFrameStats = days.map((day) => ({
        timeFrame: day,
        activeUsers: 0,
        inactiveUsers: 0,
      }));
    } else if (timeFrame === "month") {
      timeFrameStats = months.map((month) => ({
        timeFrame: month,
        activeUsers: 0,
        inactiveUsers: 0,
      }));
    }

    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    patients.forEach((patient: Patient) => {
      const registrationDate = new Date(patient.date_of_registration || Date.now());
      const dayIndex = (registrationDate.getDay() + 6) % 7; // Adjust to get Monday as the first day
      const monthIndex = registrationDate.getMonth();
      
      if (timeFrame === "day") {
        if (patient.is_deleted) {
          timeFrameStats[dayIndex].inactiveUsers++;
        } else {
          timeFrameStats[dayIndex].activeUsers++;
        }
      } else if (timeFrame === "week" && registrationDate >= sevenDaysAgo) {
        if (patient.is_deleted) {
          timeFrameStats.push({
            timeFrame: "Last 7 Days",
            activeUsers: 0,
            inactiveUsers: timeFrameStats[0]?.inactiveUsers + 1 || 1,
          });
        } else {
          timeFrameStats.push({
            timeFrame: "Last 7 Days",
            activeUsers: timeFrameStats[0]?.activeUsers + 1 || 1,
            inactiveUsers: 0,
          });
        }
      } else if (timeFrame === "month") {
        if (patient.is_deleted) {
          timeFrameStats[monthIndex].inactiveUsers++;
        } else {
          timeFrameStats[monthIndex].activeUsers++;
        }
      }
    });

    return timeFrameStats;
  };

  const dailyStats = useMemo(() => groupPatientsByTimeFrame(patients, "day"), [patients]);
  const weeklyStats = useMemo(() => groupPatientsByTimeFrame(patients, "week"), [patients]);
  const monthlyStats = useMemo(() => groupPatientsByTimeFrame(patients, "month"), [patients]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<ChartData[]>(dailyStats);

  const handleFilter = (filter: string) => {
    setIsFilterOpen(false);
    if (filter === "All") {
      setFilteredData(dailyStats);
    } else if (filter === "activeUsers") {
      setFilteredData(
        dailyStats.map(({ timeFrame, activeUsers }) => ({
          timeFrame,
          activeUsers,
          inactiveUsers: 0,
        }))
      );
    } else if (filter === "inactiveUsers") {
      setFilteredData(
        dailyStats.map(({ timeFrame, inactiveUsers }) => ({
          timeFrame,
          inactiveUsers,
          activeUsers: 0,
        }))
      );
    } else if (filter === "weeklyUsers") {
      setFilteredData(weeklyStats);
    } else if (filter === "monthlyUsers") {
      setFilteredData(monthlyStats);
    }
  };

  useEffect(() => {
    setFilteredData(dailyStats);
  }, [dailyStats]);

  return (
    <Layout>
      <div className="flex h-screen w-full">
        <div className="flex-grow p-6 bg-gray-100 overflow-auto w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Search patients by name"
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              {searchLoading && <p>Loading...</p>}
              {searchError && <p className="text-red-500">{searchError}</p>}
              <ul className="absolute z-10 bg-white border border-gray-300 w-full">
                {searchResults.map((result: Patient) => (
                  <li key={result.id} className="p-2 hover:bg-gray-100">
                    {`${result.first_name} ${result.last_name}`}
                  </li>
                ))}
                {searchResults.length === 0 &&
                  query.length >= 3 &&
                  !searchLoading && (
                    <li className="p-2 text-gray-500">No results found</li>
                  )}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-6">
            <StatCard
              title="TOTAL PATIENTS"
              value={totalPatients}
              bgColor="bg-blue-900 drop-shadow-lg"
              textColor="text-white"
            />
            <StatCard
              title="ACTIVE PATIENTS"
              value={activePatients}
              bgColor="bg-green-500 drop-shadow-lg"
            />
            <StatCard
              title="INACTIVE PATIENTS"
              value={inactivePatients}
              bgColor="bg-blue-900 drop-shadow-lg"
              textColor="text-white"
            />
          </div>
          <div className="bg-white p-6 rounded-lg shadow w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Total Number Of Users</h2>
              <div className="relative">
                <button
                  className="flex items-center space-x-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter size={16} />
                  <span>Filter by...</span>
                </button>
                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
                    <ul className="py-1">
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleFilter("All")}
                      >
                        All
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleFilter("activeUsers")}
                      >
                        Active Users
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleFilter("inactiveUsers")}
                      >
                        Inactive Users
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleFilter("weeklyUsers")}
                      >
                        Weekly Users
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleFilter("monthlyUsers")}
                      >
                        Monthly Users
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData}>
                  <XAxis dataKey="timeFrame">
                    <Label value="Time Frame" position="insideBottom" offset={-5} />
                  </XAxis>
                  <YAxis>
                    <Label
                      value="Number of Users"
                      angle={-75}
                      position="insideLeft"
                      offset={-1}
                    />
                  </YAxis>
                  <Tooltip />
                  <Bar dataKey="activeUsers" fill="#4CAF50" />
                  <Bar dataKey="inactiveUsers" fill="#FF5252" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
