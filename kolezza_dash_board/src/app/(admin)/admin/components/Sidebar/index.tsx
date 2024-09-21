import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Users2, UserCircle, Users } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-56 h-full bg-customDarkBlue text-white flex flex-col rounded-lg shadow-lg">
      <div className="p-6 mb-8">
        <div className="flex items-center mb-2 mt-7">
          <Image 
            src="/images/logo.png" 
            width={160} 
            height={40} 
            alt="SawaTok Logo" 
            className="mr-2" 
          />
        </div>
      </div>
      <nav className="flex-grow -mt-9 nh:w-6 "> 
        <ul className="space-y-10 ml-4">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, href: '/', active: true },
            { name: 'Patients', icon: Users2, href: 'admin/patientsdetails' },
            { name: 'Profile', icon: UserCircle, href: 'admin/profile' },
            { name: 'Users', icon: Users, href:'admin/users'}, 
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
    </div>
  );
};

export default Sidebar;

