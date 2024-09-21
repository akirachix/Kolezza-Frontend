
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Users2, UserCircle, Users } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-customDarkBlue text-white flex flex-col">
      <div className="p-6 mb-8">
        <div className="flex items-center mb-2 mt-7 ml-5">
          <Image 
          src="/images/logo.png" 
          width={160} 
          height={40} 
          alt="SawaTok Logo" 
          className="mr-2" />
        </div>
      </div>
      <nav className="flex-grow ">
        <ul className="space-y-10 ml-6">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, href: '/' ,active: true},
            { name: 'Patients', icon: Users2, href: '/patients' },
            { name: 'Profile', icon: UserCircle, href: '/profile' },
            { name: 'Users', icon: Users, href: 'admin/users' },
          ].map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`flex items-center px-4 py-3 transition-colors group ${
                  item.active ? 'bg-white text-customDarkBlue rounded-2xl w-32' : 'hover:bg-white hover:text-customDarkBlue'
                }`}
              >
                <item.icon 
                  className={`mr-2 ${item.active ? 'text-green-500' : 'group-hover:text-green-500'}`}
                  size={24} 
                />
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav> 

      {/* <nav className="flex-grow -mt-9"> 
        <ul className="space-y-10 ml-4">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
            { name: 'Patients', icon: Users2, href: '/patients' },
            { name: 'Profile', icon: UserCircle, href: '/profile' },
            { name: 'Users', icon: Users, href:'admin/users', active: true },
          ].map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className={`flex items-center px-4 py-3 transition-colors group ${
                  item.active ? 'bg-white text-customDarkBlue rounded-2xl w-32' : 'hover:bg-white hover:text-customDarkBlue'
                }`}
              >
                <item.icon 
                  className={`mr-2 ${item.active ? 'text-green-500' : 'group-hover:text-green-500'}`}
                  size={24} 
                />
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}


    </div>
  );
};

export default Sidebar;