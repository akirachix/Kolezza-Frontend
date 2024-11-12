"use client";
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
// import { useFetchTherapists } from '../hooks/useFetchTherapists';
import { useFetchTherapists } from '@/app/hooks/useFetchTherapists';
// import { useFetchChildren } from '../hooks/useFetchChildren';
import { useFetchChildren } from '@/app/hooks/useFetchChildren';
// import Layout from '../Layout';
// import Layout from '@/app/Layout';
import TherapistLayout from '../TherapistLayout';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ChartDataLabels);

const Dashboard: React.FC = () => {
  const { length: tLength, weeklyCount: tWeekly, monthlyCount: tMonthly, activeCount: tActive } = useFetchTherapists();
  const { length: cLength, weeklyCount: cWeekly, monthlyCount: cMonthly, activeCount: cActive } = useFetchChildren();

  const [therapistsFilter, setTherapistsFilter] = useState<string>('active');
  const [childrenFilter, setChildrenFilter] = useState<string>('active');
  const [totalUsers, setTotalUsers] = useState<number>(0);

  const dummyTherapistsData = {
    active: [0, 0, 0, 0, 0, 0, 0, 0, 150, 180, 0, 0],
    weekly: [0, 0, 0, 0, 0, 0, 0, 0, 120, 140, 0, 0],
    monthly: [0, 0, 0, 0, 0, 0, 0, 0, 200, 220, 0, 0]
  };

  const dummyChildrenData = {
    active: [0, 0, 0, 0, 0, 0, 0, 0, 280, 320, 0, 0],
    weekly: [0, 0, 0, 0, 0, 0, 0, 0, 230, 260, 0, 0],
    monthly: [0, 0, 0, 0, 0, 0, 0, 0, 350, 380, 0, 0]
  };

  useEffect(() => {
    const dummyTotalTherapists = 250;
    const dummyTotalChildren = 450;
    setTotalUsers((tLength || dummyTotalTherapists) + (cLength || dummyTotalChildren));
  }, [tLength, cLength]);

  const donutData =  {
    labels: ['Therapists', 'Children'],
    datasets: [
      {
        data: [tLength || 250, cLength || 450],
        backgroundColor: ['#4CAF50', '#052049'],
        borderWidth: 0,
      },
    ],
  };

  type CustomTooltipContext = {
    chart: {
      data: {
        labels?: unknown[]; 
      };
    };
    dataIndex: number;
  };

  const donutOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        color: '#000',
        anchor: 'end',
        align: 'end',
        offset: 8,
        font: {
          size: 14,
          weight: 'bold',
          family: "'Inter', sans-serif",
        },
        formatter: (value: number, context: CustomTooltipContext) => {
          const labels = context.chart.data.labels as string[]; 
          const label = labels?.[context.dataIndex] || '';
          return `${label}: ${value}`;
        },  
      },
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          font: {
            size: 16,
            family: "'Inter', sans-serif",
            weight: 'bold',
          },
          color: '#333',
          padding: 28,
          boxWidth: 20,
          usePointStyle: true,
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '70%',
  };
  
  
  const getTherapistsData = () => {
    if (tActive || tWeekly || tMonthly) {
      return therapistsFilter === 'active' ? Array(12).fill(tActive)
           : therapistsFilter === 'weekly' ? Array(12).fill(tWeekly)
           : Array(12).fill(tMonthly);
    } else {
      return therapistsFilter === 'active' ? dummyTherapistsData.active
           : therapistsFilter === 'weekly' ? dummyTherapistsData.weekly
           : dummyTherapistsData.monthly;
    }
  };

  const getChildrenData = () => {
    if (cActive || cWeekly || cMonthly) {
      return childrenFilter === 'active' ? Array(12).fill(cActive)
           : childrenFilter === 'weekly' ? Array(12).fill(cWeekly)
           : Array(12).fill(cMonthly);
    } else {
      return childrenFilter === 'active' ? dummyChildrenData.active
           : childrenFilter === 'weekly' ? dummyChildrenData.weekly
           : dummyChildrenData.monthly;
    }
  };

  const barDataTherapists = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Therapists',
        data: getTherapistsData(),
        backgroundColor: '#4CAF50',
        borderRadius: 4,
        barThickness: 16,
      },
    ],
  };

  const barDataChildren = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Children',
        data: getChildrenData(),
        backgroundColor: '#052049',
        borderRadius: 4,
        barThickness: 16,
      },
    ],
  };

  const barOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        enabled: true,
      },
      datalabels: {
        color: '#FFFFFF',
        anchor: 'center' as const, // Explicitly set to "center" as required
        align: 'center' as const,
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value: number) => {
          return value > 0 ? value : ''; 
        },
        padding: {
          top: 0,
          bottom: 0,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#333',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Users',
          font: {
            size: 16,
            weight: 'bold',
          },
          color: '#333',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <TherapistLayout>
      <div className="flex flex-col items-center min-h-screen bg-white px-12 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-16">All Users</h1>

        <div className="relative w-full max-w-md mb-20">
          <div className="relative h-80">
            <Doughnut data={donutData} options={donutOptions} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-4xl font-bold text-gray-900 mt-1">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          <div className="bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Therapists</h2>
              <select
                className="border border-gray-200 px-4 py-1.5 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={therapistsFilter}
                onChange={(e) => setTherapistsFilter(e.target.value)}
              >
                <option value="active">Active Users</option>
                <option value="weekly">Weekly Users</option>
                <option value="monthly">Monthly Users</option>
              </select>
            </div>
            <div className="h-80">
              <Bar data={barDataTherapists} options={barOptions} />
            </div>
          </div>

          <div className="bg-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Children</h2>
              <select
                className="border border-gray-200 px-4 py-1.5 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={childrenFilter}
                onChange={(e) => setChildrenFilter(e.target.value)}
              >
                <option value="active">Active Users</option>
                <option value="weekly">Weekly Users</option>
                <option value="monthly">Monthly Users</option>
              </select>
            </div>
            <div className="h-80">
              <Bar data={barDataChildren} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
    </TherapistLayout>
  );
};

export default Dashboard;


// "use client";
// import React, { useState, useMemo, useEffect } from "react";
// import { Search, Filter } from "lucide-react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from "recharts";
// import { useSearch } from "@/app/hooks/useSearchUsers";
// import { usePatients } from "@/app/hooks/useGetPatients";
// import Layout from "@/app/Layout";

// interface Patient {
//   id: number;
//   first_name: string;
//   last_name: string;
//   is_deleted: boolean;
//   is_new: boolean;
//   date_of_registration?: string;
// }
// interface ChartData {
//   day: string;
//   activeUsers: number;
//   inactiveUsers: number;
//   newUsers: number;
// }
// interface FilteredChartData {
//   [x: string]: string | number;
//   day: string;
// }
// const StatCard = ({ title, value, bgColor, textColor = "text-black" }: { title: string; value: number; bgColor: string; textColor?: string }) => (
//   <div className={`rounded-lg p-6 ${textColor} ${bgColor} h-40 flex flex-col justify-center items-center shadow-lg text-center`}>
//     <h3 className="text-lg font-semibold">{title}</h3>
//     <p className="text-4xl font-bold">{value}</p>
//   </div>
// );
// const Dashboard = () => {
//   const { query, searchResults, fetchLoading: searchLoading, error: searchError, handleInputChange, handleKeyPress } = useSearch();
//   const { patients } = usePatients();
//   const totalPatients: number = patients.length;
//   const activePatients: number = patients.filter((patient: Patient) => !patient.is_deleted).length;
//   const inactivePatients: number = patients.filter((patient: Patient) => patient.is_deleted).length;
//   const groupPatientsByDay = (patients: Patient[]): ChartData[] => {
//     const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//     const dayStats: ChartData[] = days.map((day) => ({
//       day,
//       activeUsers: 0,
//       inactiveUsers: 0,
//       newUsers: 0,
//     }));
//     patients.forEach((patient: Patient) => {
//       const registrationDay = new Date(patient.date_of_registration || Date.now()).getDay();
//       const dayIndex = (registrationDay + 6) % 7;
//       if (patient.is_new) {
//         dayStats[dayIndex].newUsers++;
//       }
//       if (patient.is_deleted) {
//         dayStats[dayIndex].inactiveUsers++;
//       } else {
//         dayStats[dayIndex].activeUsers++;
//       }
//     });
//     return dayStats;
//   };
//   const chartData: ChartData[] = useMemo(() => groupPatientsByDay(patients), [patients]);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [data, setData] = useState<ChartData[]>(chartData);
//   const [filteredData, setFilteredData] = useState<FilteredChartData[]>([]);
//   const handleFilter = (filter: string) => {
//     setIsFilterOpen(false);
//     if (filter === "All") {
//       setData(chartData);
//       setFilteredData([])
//     } else if (filter === "activeUsers") {
//       const filteredData = chartData.map((item) => ({
//         day: item.day,
//         activeUsers: item.activeUsers,
//       }));
//       setFilteredData(filteredData);
//     } else if (filter === "inactiveUsers") {
//       const filteredData = chartData.map((item) => ({
//         day: item.day,
//         inactiveUsers: item.inactiveUsers,
//       }));
//       setFilteredData(filteredData);
//     } else if (filter === "newUsers") {
//       const filteredData = chartData.map((item) => ({
//         day: item.day,
//         newUsers: item.newUsers,
//       }));
//       setFilteredData(filteredData);
//     }
//   };
//   useEffect(() => {
//     setData(chartData);
//   },[chartData]);
//   return (
//   <Layout>
//       <div className="flex h-screen w-full">
//       <div className="flex-grow p-6 bg-gray-100 overflow-auto w-full">
//         <div className="flex justify-between items-center mb-6">
          
//           <div className="relative flex-grow max-w-md">
//             <input
//               type="text"
//               value={query}
//               onChange={handleInputChange}
//               onKeyDown={handleKeyPress}
//               placeholder="Search patients by name"
//               className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
//             {searchLoading && <p>Loading...</p>}
//             {searchError && <p className="text-red-500">{searchError}</p>}
//             <ul className="absolute z-10 bg-white border border-gray-300 w-full">
//               {searchResults.map((result: Patient) => (
//                 <li key={result.id} className="p-2 hover:bg-gray-100">
//                   {`${result.first_name} ${result.last_name}`}
//                 </li>
//               ))}
//               {searchResults.length === 0 && query.length >= 3 && !searchLoading && (
//                 <li className="p-2 text-gray-500">No results found</li>
//               )}
//             </ul>
//           </div>

//         </div>
//         <div className="grid grid-cols-3 gap-6 mb-6">
//           <StatCard title="TOTAL PATIENTS" value={totalPatients} bgColor="bg-blue-300 drop-shadow-lg" />
//           <StatCard title="ACTIVE PATIENTS" value={activePatients} bgColor="bg-green-500 drop-shadow-lg" />
//           <StatCard title="INACTIVE PATIENTS" value={inactivePatients} bgColor="bg-blue-900 drop-shadow-lg" textColor="text-white" />
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow w-full">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Total Number Of Users</h2>
//             <div className="relative">
//               <button
//                 className="flex items-center space-x-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm"
//                 onClick={() => setIsFilterOpen(!isFilterOpen)}
//               >
//                 <Filter size={16} />
//                 <span>Filter by...</span>
//               </button>
//               {isFilterOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10">
//                   <ul className="py-1">
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilter("All")}>All</li>
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilter("activeUsers")}>Active Users</li>
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilter("inactiveUsers")}>Inactive Users</li>
//                     <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilter("newUsers")}>New Users</li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           </div>
//           <ResponsiveContainer width="100%" height={400}>
//             <BarChart data={filteredData.length > 0 ? filteredData : data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
//               <XAxis dataKey="day" padding={{ left: 20, right: 20 }} tick={{ fontSize: 12 }}>
//                 <Label value="Time" position="insideBottom" offset={-5} />
//               </XAxis>
//               <YAxis tick={{ fontSize: 12 }}>
//                 <Label value="Users" angle={-90} position="insideLeft" offset={-5} />
//               </YAxis>
//               <Tooltip />
//               <Bar dataKey="activeUsers" fill="#1E40AF" name="Active Users" barSize={40} />
//               <Bar dataKey="inactiveUsers" fill="#93C5FD" name="Inactive Users" barSize={40} />
//               <Bar dataKey="newUsers" fill="#22C55E" name="New Users" barSize={40} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   </Layout>
//   );
// };
// export default Dashboard;