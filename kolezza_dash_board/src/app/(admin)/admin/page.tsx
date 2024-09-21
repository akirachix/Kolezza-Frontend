"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus } from 'lucide-react'; 
import Link from 'next/link';

import { useUsers } from '@/app/(admin)/admin/components/hooks/useGetUsers';
import { useChildren } from '@/app/(admin)/admin/components/hooks/useGetChildren';

type StatBoxProps = {
  title: string;
  value: string;
  color: string;
  isNH: boolean; 
};

const StatBox: React.FC<StatBoxProps> = ({ title, value, color, isNH }) => {
  return (
    <div
      className={`${color} rounded-lg flex flex-col justify-center items-center shadow-lg p-4 
      ${isNH ? 'min-w-[180px] min-h-[100px]' : 'min-w-[220px] min-h-[120px]'} 
      ${isNH ? 'max-w-[150px] max-h-[100px]' : 'max-w-[180px] max-h-[140px]'} 
      nh:-m-2 nh:ml-8`}
    >
      <h3 className={`text-white ${isNH ? 'text-base' : 'text-lg'} font-bold mb-2`}>
        {title}
      </h3>
      <p className={`text-white ${isNH ? 'text-lg' : 'text-2xl'} font-extrabold`}>
        {value}
      </p>
    </div>
  );
};

export default function DashboardTable() {
  const { currentUsers, totalUsers, currentPage, paginate, loading: loadingUsers, error: errorUsers } = useUsers();
  const { activePatients, inactivePatients, loading: loadingPatients, error: errorPatients } = useChildren();
  const usersPerPage = 5;
  const [query, setQuery] = useState('');

  const [isNH, setIsNH] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsNH(window.innerWidth <= 1280);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loadingUsers || loadingPatients) {
    return <p>Loading...</p>;
  }

  if (errorUsers) {
    return <p>Error fetching users: {errorUsers}</p>;
  }
  if (errorPatients) {
    return <p>Error fetching patients: {errorPatients}</p>;
  }

  const filteredUsers = currentUsers.filter(user =>
    (user.first_name && user.first_name.toLowerCase().includes(query.toLowerCase())) ||
    (user.last_name && user.last_name.toLowerCase().includes(query.toLowerCase())) ||
    (user.username && user.username.toLowerCase().includes(query.toLowerCase()))
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-col p-6 mt-8 bg-gray-50 min-h-screen ml-8">
      <div className="flex ml-7 justify-between mb-6 mt-[-20px]">
        <div className="relative w-full sm:w-1/2 bg-white rounded-lg p-2">
          <Search className="absolute left-3 top-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search patients here..."
            className="border border-[#90BD31] p-2 pl-10 rounded-lg w-full"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <a href="/admin/add-user" className="href">
          <button
            className="flex items-center justify-between border border-[#90BD31] rounded-lg bg-white text-black px-4 py-2"
            style={{ width: '207px', height: '50px' }}
          >
            <Plus className="text-[#90BD31]" />
            <span>Add User</span>
          </button>
        </a>
      </div>

      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6 ml-6
        ${isNH ? 'nh:grid-cols-3 nh:gap-2 nh:w-full nh:ml-[20px]' : 'lg:justify-center lg:gap-52 lg:w-[900px] lg:ml-[90px]'}
      `}>
        <StatBox
          title="TOTAL USERS"
          value={totalUsers.toString()}
          color="bg-[#A5DAF7]"
          isNH={isNH}
        />
        <StatBox
          title="ACTIVE PATIENTS"
          value={activePatients.toString()}
          color="bg-[#90BD31]"
          isNH={isNH}
        />
        <StatBox
          title="INACTIVE"
          value={inactivePatients.toString()}
          color="bg-[#052049]"
          isNH={isNH}
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 pr-8">
        <table className="min-w-full table-auto">
          <thead className="bg-[#90BD31] text-white">
            <tr>
              <th className="px-2 py-3 text-center border border-black">Therapist ID</th>
              <th className="px-2 py-3 text-center border border-black">Username</th>
              <th className="px-2 py-3 text-center border border-black">Email</th>
              <th className="px-2 py-3 text-center border border-black">First Name</th>
              <th className="px-2 py-3 text-center border border-black">Roles</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-[#D9D9D9]' : 'bg-white'}>
                    <td className="px-4 py-4 text-center">{user.id}</td>
                    <td className="px-4 py-4 text-center">{user.username}</td>
                    <td className="px-4 py-4 text-center">{user.email || '-'}</td>
                    <td className="px-4 py-4 text-center">{user.first_name}</td>
                    <td className="px-4 py-4 text-center">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-red-500">
                  No such user found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <nav className="flex justify-center mt-6 bg-white">
          <ul className="inline-flex">
            {pageNumbers.map((number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => paginate(number)}
                  className={`w-8 h-8 rounded-full flex justify-center items-center ${
                    currentPage === number ? 'bg-[#90BD31] text-white' : 'bg-[#D9D9D9]'
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
          <div className="text-center mt-1">
            <p>Total Users: {totalUsers}</p>
          </div>
        </nav>
      </div>
    </div>
  );
}

