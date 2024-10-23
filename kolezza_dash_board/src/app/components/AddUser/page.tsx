'use client';
import React, { useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import TherapistRegistration from '../AddTherapist';
import AdminRegistration from '../AddAdmin';
import Layout from '@/app/Layout';


const UserRegistration = () => {
  const [isTherapist, setIsTherapist] = useState(true);
 
  return (
   <Layout>
    <div>
       <div className="border-customGreen h-40 text-black flex flex-col w-full font-nunito">
       <div className="flex items-center ml-8 top-6">
        <IoIosArrowBack className="text-4xl text-black" />
      </div>
          <div className='flex justify-between'>
            <a
              className={`text-3xl ml-12 mt-10 cursor-pointer ${isTherapist ? 'underline text-light-green' : ''}`}
              onClick={() => setIsTherapist(true)}
            >
              New Therapist Details
            </a>
            <a
              className={`text-3xl mr-40 mt-10 cursor-pointer ${!isTherapist ? 'underline text-light-green' : ''}`}
              onClick={() => setIsTherapist(false)}
            >
              New Admin Details
            </a>
          </div>
          {isTherapist===true? <TherapistRegistration /> : <AdminRegistration/>}
        </div>
    </div>
    </Layout>
  );
};
export default UserRegistration;



















