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
            { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
            { name: 'Patients', icon: Users2, href: '/patients' },
            { name: 'Profile', icon: UserCircle, href: '/profile' },
            { name: 'Users', icon: Users, href: '/users' },
          ].map((item) => (
            <li key={item.name}>
              <Link 
                href={item.href} 
                className="flex items-center px-6 py-3 hover:bg-white hover:text-customDarkBlue transition-colors group"
              >
                <item.icon className="mr-4 group-hover:text-green-500" size={24} />
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