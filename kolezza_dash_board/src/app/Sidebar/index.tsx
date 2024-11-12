// import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { LayoutDashboard, Users2, UserCircle, Users } from 'lucide-react';

// const Sidebar = () => {
//   return (
//     <div className="fixed top-0 left-0 w-64 h-full bg-customDarkBlue text-white flex flex-col rounded-lg shadow-lg">
//       <div className="p-6 mb-8">
//         <div className="flex items-center mb-2 mt-7">
//           <Image 
//             src="/images/logo.png" 
//             width={160} 
//             height={40} 
//             alt="SawaTok Logo" 
//             className="mr-2" 
//           />
//         </div>
//       </div>
//       <nav className="flex-grow -mt-9 nh:w-6 "> 
//         <ul className="space-y-10 ml-4">
//           {[
//             { name: 'Dashboard', icon: LayoutDashboard, href: '/', active: true },
//             { name: 'Patients', icon: Users2, href: '/patients' },
//             { name: 'Profile', icon: UserCircle, href: '/profile/ [user_id]' },
//             { name: 'Users', icon: Users, href:'/users'}, 
//           ].map((item) => (
//             <li key={item.name}>
//               <Link 
//                 href={item.href} 
//                 className={`flex items-center px-4 py-3 transition-colors group ${
//                   item.active ? 'bg-white text-customDarkBlue rounded-2xl w-32' : 'hover:bg-white hover:text-customDarkBlue'
//                 }`}
//               >
//                 <item.icon 
//                   className={`mr-2 ${item.active ? 'text-green-500' : 'group-hover:text-green-500'}`}
//                   size={24} 
//                 />
//                 <span className="text-lg">{item.name}</span>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LayoutDashboard, Users2, UserCircle, Users } from 'lucide-react';
import { getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [activeLink, setActiveLink] = useState<string>(''); // Track active link
  const pathname = usePathname(); // Use this for the current pathname

  useEffect(() => {
    const id = getCookie('userId') as string | null;
    setUserId(id || null);
    
    setIsSuperAdmin(pathname.endsWith('admin/users'));

    // Set the initial active link based on the current path
    setActiveLink(pathname);
  }, [pathname]); // Runs on route change

  return (
    <div className="w-64 h-[100%] bg-customDarkBlue text-white flex flex-col">
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
      <nav className="flex-grow">
        <ul className="space-y-10 ml-6">
          {[
            { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
            { name: 'Patients', icon: Users2, href: '/patients' },
            { name: 'Profile', icon: UserCircle, href: `/profile/${userId}` },
          ].map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                onClick={() => setActiveLink(item.href)} // Set active link on click
                className={`flex items-center px-6 py-3 ${
                  activeLink === item.href ? 'bg-white text-customDarkBlue' : 'hover:bg-white hover:text-customDarkBlue'
                } transition-colors group`}
              >
                <item.icon className="mr-4 group-hover:text-green-500" size={24} />
                <span className="text-lg">{item.name}</span>
              </Link>
            </li>
          ))}

          {isSuperAdmin && (
            <li>
              <Link
                href="admin/users"
                onClick={() => setActiveLink('admin/users')} // Set active link on click
                className={`flex items-center px-6 py-3 ${
                  activeLink === 'admin/users' ? 'bg-white text-customDarkBlue' : 'hover:bg-white hover:text-customDarkBlue'
                } transition-colors group`}
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

export default Sidebar;

