"use client";
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useChildren } from '@/app/hooks/useGetChildren';
import { useUsers } from '@/app/hooks/useGetUsers'; 
import Link from 'next/link';

type StatBoxProps = {
  title: string;
  value: number;
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

const DashboardTable = () => {
  const { users, loading: loadingUsers, error: errorUsers } = useUsers(); // Fetch all users
  const { loading: loadingPatients, error: errorPatients } = useChildren();
  const [query, setQuery] = useState('');
  const usersPerPage = 5; 
  const [currentPage, setCurrentPage] = useState(1);
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

  useEffect(() => {
    setCurrentPage(1); 
  }, [query]);

  if (loadingUsers || loadingPatients) return <p>Loading...</p>;
  if (errorUsers) return <p>Error fetching users: {errorUsers}</p>;
  if (errorPatients) return <p>Error fetching patients: {errorPatients}</p>;


  const filteredUsers = users.filter(user =>
    [user.first_name, user.last_name, user.username].some(field =>
      field && field.toLowerCase().includes(query.toLowerCase())
    )
  );


  const totalUsers = filteredUsers.length;


  const startIndex = (currentPage - 1) * usersPerPage;
  const currentPageUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const toTitleCase = (str: string) => {
    return str
      .toLowerCase() 
      .split(' ') 
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) 
      .join(' '); 
  };

  return (
    <div className="flex flex-col p-6 mt-8 bg-gray-50 min-h-screen ml-8">
      <div className="flex ml-7 justify-between mb-6 mt-[-20px]">
<div className="flex items-center w-full sm:w-1/2 bg-white rounded-lg p-9 gap-x-20"> 
  <div className="relative flex-grow"> 
    <Search className="absolute left-3 top-2 text-gray-500" />
    <input
      type="text"
      placeholder="Search users here..."
      className="border border-[#90BD31] p-2 pl-10 rounded-lg w-full"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  </div>

  <div> 
    <Link href="/components/AddUser">
    <button
      className="border border-[#90BD31] text-[#90BD31] rounded-lg px-4 py-2 bg-transparent"
    >
      Add User
    </button>
    </Link>
  </div>
</div>
     </div>

      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6 ml-6
        ${isNH ? 'nh:grid-cols-3 nh:gap-2 nh:w-full nh:ml-[20px]' : 'lg:justify-center lg:gap-52 lg:w-[900px] lg:ml-[90px]'}
      `}>
        <StatBox title="TOTAL USERS" value={totalUsers} color="bg-[#A5DAF7]" isNH={isNH} />
        <StatBox title="ACTIVE USERS" value={currentPageUsers.filter(user => user.email).length} color="bg-[#90BD31]" isNH={isNH} />
        <StatBox title="INACTIVE USERS" value={currentPageUsers.filter(user => !user.email || !user.email.trim()).length} color="bg-[#052049]" isNH={isNH} />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 pr-8">
        <table className="min-w-full table-auto">
          <thead className="bg-[#90BD31] text-white">
            <tr>
              <th className="px-2 py-3 text-center border border-black">Therapist ID</th>
              <th className="px-2 py-3 text-center border border-black">Username</th>
              <th className="px-2 py-3 text-center border border-black">Email</th>
              <th className="px-2 py-3 text-center border border-black">Status</th>
              <th className="px-2 py-3 text-center border border-black">Roles</th>
            </tr>
          </thead>
          <tbody>
            {currentPageUsers.length > 0 ? (
              currentPageUsers.map((user) => (
                <tr key={user.id} className={Number(user.id) % 2 === 0 ? 'bg-[#D9D9D9]' : 'bg-white'}>
                  <td className="px-4 py-4 text-center">{user.id}</td>
                  <td className="px-4 py-4 text-center">{toTitleCase(user.username)}</td> 
                  <td className="px-4 py-4 text-center">{user.email || '-'}</td>
                  <td className="px-4 py-4 text-center">{user.email ? 'Active' : 'Inactive'}</td> 
                  <td className="px-4 py-4 text-center">{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-red-500">No such user found.</td>
              </tr>
            )}
          </tbody>
        </table>

        <nav className="flex justify-center mt-6 bg-white">
          <ul className="inline-flex">
            {pageNumbers.map((number) => (
              <li key={number} className="mx-1">
                <button
                  onClick={() => setCurrentPage(number)} 
                  className={`w-8 h-8 rounded-full flex justify-center items-center ${currentPage === number ? 'bg-[#90BD31] text-white' : 'bg-[#D9D9D9]'}`}
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
};

export default DashboardTable;
