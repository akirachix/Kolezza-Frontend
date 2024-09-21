import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Users2, UserCircle, Users } from 'lucide-react';
import {getCookie } from 'cookies-next';

const Sidebar = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const role = getCookie('role'); 
    const id = getCookie('userId'); 

    setUserRole(role || null);
    setUserId(id || null);
  }, []);
  return (
    <div className="w-64 h-screen bg-customDarkBlue text-white flex flex-col">
      <div className="p-6 mb-8">
        <div className="flex items-center mb-2 mt-7 ml-5">
          <Image 
            src="/images/logo.png" 
            width={160} 
            height={40} 
            alt="SawaTok Logo" 
            className="mr-2" 
          />
        </div>
      </div>
      <nav className="flex-grow ">
        <ul className="space-y-10 ml-6">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
            { name: 'Patients', icon: Users2, href: '/patients' },
            { name: 'Profile', icon: UserCircle, href: `/profile/${userId}` },
          ].map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className="flex items-center px-6 py-3 active:bg-white hover:bg-white hover:text-customDarkBlue transition-colors group"
              >
                <item.icon className="mr-4 group-hover:text-green-500" size={24} />
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          ))}


          {userRole === 'superadmin' && (
            <li>
              <Link 
                href="/users" 
                className="flex items-center px-6 py-3 active:bg-white hover:bg-white hover:text-customDarkBlue transition-colors group"
              >
                <Users className="mr-4 group-hover:text-green-500" size={24} />
                <span className="text-lg">Users</span>
              </Link>
            </li>
          )}
        </ul>
      </nav>

    </div>
  );
};


