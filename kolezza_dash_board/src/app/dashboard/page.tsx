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
  last_name: string;
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

  const groupPatientsByDay = (patients: Patient[]) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const months: { [key: string]: ChartData } = {};
    const dayStats: ChartData[] = days.map((day) => ({
      timeFrame: day,
      activeUsers: 0,
      inactiveUsers: 0,
    }));

    patients.forEach((patient: Patient) => {
      const registrationDate = new Date(
        patient.date_of_registration || Date.now()
      );
      const dayIndex = (registrationDate.getDay() + 6) % 7; // Adjusting to start from Monday
      const month = registrationDate.toLocaleString("default", {
        month: "long",
      }); // Get full month name

      // Daily stats
      if (patient.is_deleted) {
        dayStats[dayIndex].inactiveUsers++;
      } else {
        dayStats[dayIndex].activeUsers++;
      }

      // Monthly stats
      if (!months[month]) {
        months[month] = {
          timeFrame: month,
          activeUsers: 0,
          inactiveUsers: 0,
        };
      }
      if (patient.is_deleted) {
        months[month].inactiveUsers++;
      } else {
        months[month].activeUsers++;
      }
    });

    // Convert months object to array
    const monthlyStats = Object.values(months);

    return { dailyStats: dayStats, monthlyStats };
  };

  const { dailyStats, monthlyStats } = useMemo(
    () => groupPatientsByDay(patients),
    [patients]
  );

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
      setFilteredData(
        monthlyStats.map(({ timeFrame, activeUsers }) => ({
          timeFrame,
          activeUsers,
          inactiveUsers: 0,
        }))
      );
    } else if (filter === "monthlyUsers") {
      setFilteredData(
        monthlyStats.map(({ timeFrame, activeUsers }) => ({
          timeFrame,
          activeUsers,
          inactiveUsers: 0,
        }))
      );
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
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={filteredData}
                barSize={40}
                barGap={0}
              >
                <XAxis dataKey="timeFrame">
                  <Label value="Time Frame" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis>
                  <Label
                    value="Number of Users"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: "middle" }}
                  />
                </YAxis>
                <Tooltip />
                <Bar dataKey="inactiveUsers" fill="#e0e0e0" stackId="a" />
                <Bar dataKey="activeUsers" fill="#4caf50" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;