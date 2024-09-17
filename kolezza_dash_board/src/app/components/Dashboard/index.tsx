"use client"
import React, { useState } from 'react';
import { Search, User, Bell, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const initialData = [
    { day: 'Mon', activeUsers: 38, inactiveUsers: 20, newUsers: 10 },
    { day: 'Tue', activeUsers: 30, inactiveUsers: 50, newUsers: 15 },
    { day: 'Wed', activeUsers: 45, inactiveUsers: 30, newUsers: 60 },
    { day: 'Thu', activeUsers: 40, inactiveUsers: 60, newUsers: 78 },
    { day: 'Fri', activeUsers: 50, inactiveUsers: 40, newUsers: 72 },
    { day: 'Sat', activeUsers: 72, inactiveUsers: 30, newUsers: 20 },
    { day: 'Sun', activeUsers: 60, inactiveUsers: 25, newUsers: 15 },
];

const StatCard = ({ title, value, bgColor }) => (
    <div className={`rounded-lg p-6 text-white ${bgColor} h-40 flex flex-col justify-between shadow-lg`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-4xl font-bold">{value}</p>
    </div>
);

const Dashboard = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [data, setData] = useState(initialData);

    const handleFilter = (filter) => {
        setActiveFilter(filter);
        setIsFilterOpen(false);
        if (filter === 'All') {
            setData(initialData);
        } else {
            const filteredData = initialData.map(item => ({
                day: item.day,
                [filter.toLowerCase()]: item[filter.toLowerCase()]
            }));
            setData(filteredData);
        }
    };

    return (
        <div className="flex h-screen w-full">
            <div className="flex-grow p-6 bg-gray-100 overflow-auto w-full">
                <div className="flex justify-between items-center mb-6">
                    <div className="relative flex-grow max-w-md">
                        <input
                            type="text"
                            placeholder="Search patients by name"
                            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600">
                            <User size={24} />
                        </button>
                        <button className="text-gray-600 relative">
                            <Bell size={24} />
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-500"></span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                    <StatCard title="TOTAL PATIENTS" value="402" bgColor="bg-blue-300" />
                    <StatCard title="ACTIVE PATIENTS" value="300" bgColor="bg-green-500" />
                    <StatCard title="INACTIVE PATIENTS" value="100" bgColor="bg-blue-900" />
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
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilter('All')}>All</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilter('activeUsers')}>Active Users</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilter('inactiveUsers')}>Inactive Users</li>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleFilter('newUsers')}>New Users</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 100 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="day" interval={0} padding={{ left: 30, right: 30 }}>
                                <Label value="Day of Week" offset={-20} position="insideBottom" />
                            </XAxis>
                            <YAxis>
                                <Label value="Number of Users" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                            </YAxis>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={50} />
                            {activeFilter === 'All' || activeFilter === 'activeUsers' ? <Bar dataKey="activeUsers" fill="#1e40af" name="Active Users" /> : null}
                            {activeFilter === 'All' || activeFilter === 'inactiveUsers' ? <Bar dataKey="inactiveUsers" fill="#93c5fd" name="Inactive Users" /> : null}
                            {activeFilter === 'All' || activeFilter === 'newUsers' ? <Bar dataKey="newUsers" fill="#22c55e" name="New Users" /> : null}
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
