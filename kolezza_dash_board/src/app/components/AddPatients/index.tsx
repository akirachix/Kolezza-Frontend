"use client";
import React, { useState } from 'react';
import { ChevronLeft, User, Calendar } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


type PatientData = {
  patientFirstName: string;
  patientMiddleName: string;
  patientLastName: string;
  patientDateOfBirth: Date;
  gender: 'male' | 'female'; 
  levelOfStutteringId: string; 
  childmodule_id: string; 
};

const schema = yup.object({
  patientFirstName: yup.string().required('First name is required'),
  patientMiddleName: yup.string().required('Patient middle name is required'),
  patientLastName: yup.string().required('Last name is required'),
  patientDateOfBirth: yup.date().required('Date of birth is required'),
  gender: yup.string().oneOf(['male', 'female']).required('Gender is required'),
  levelOfStutteringId: yup.string().required('Level of stuttering is required'),
  childmodule_id: yup.string().required('Child module ID is required'),
}).required();

const AddPatients = () => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<PatientData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const [feedback, setFeedback] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const onSubmit = (data: PatientData) => {
    const transformedData = {
      first_name: data.patientFirstName,
      middle_name: data.patientMiddleName,
      last_name: data.patientLastName,
      date_of_birth: startDate ? startDate.toISOString().split('T')[0] : '',
      gender: data.gender,
      level_of_stuttering_id: data.levelOfStutteringId,
      childmodule_id: data.childmodule_id,
    };

    setFeedback('Patient details have been submitted : ' + JSON.stringify(transformedData));
  };

  const inputStyle = "w-full w-[400px] h-[80px] nh:w-[205px] nh:h-[60px] border-customGreen border-4 rounded-lg p-2 pl-10 nh:pl-9 placeholder-gray-400";
  const iconStyle = "absolute left-3 top-1/2 transform -translate-y-1/2 text-black";

  return (
    <div className="bg-white">
      <div className="px-10">
        <div className="flex items-center mb-6">
          <ChevronLeft className="w-20 h-10 mr-10" />
          <h2 className="text-4xl nh:text-2xl  nh:ml-32 ml-96 font-semibold">Add a new Patient</h2>
        </div>
        {feedback && <p className="text-green-500">{feedback}</p>}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 nh:mt-2">
          <div className="flex mb-4 space-x-4 nh:gap-6 nh:mb-0.5 nh:mr-9">
            <div className="flex-1">
              <label className="block font-medium mb-2 text-[20px]">Patient First Name</label>
              <div className="relative mb-4 nh:text-[15px] text-[20px]">
                <User className={iconStyle} />
                <input
                  type="text"
                  placeholder="Enter First Name"
                  className={inputStyle}
                  {...register('patientFirstName')}
                />
                {errors.patientFirstName && <p className="text-red-500">{errors.patientFirstName.message}</p>}
              </div>
            </div>

            <div className="flex-1">
              <label className="block font-medium mb-2 text-[20px]">Patient Middle Name</label>
              <div className="relative mb-4 nh:text-[15px] text-[20px]">
                <User className={iconStyle} />
                <input
                  type="text"
                  placeholder="Enter Middle Name"
                  className={inputStyle}
                  {...register('patientMiddleName')}
                />
                {errors.patientMiddleName && <p className="text-red-500">{errors.patientMiddleName.message}</p>}
              </div>
            </div>

            <div className="flex-1">
              <label className="block font-medium mb-2 text-[20px]">Patient Last Name</label>
              <div className="relative nh:text-[15px] mb-4 text-[20px]">
                <User className={iconStyle} />
                <input
                  type="text"
                  placeholder="Enter Last Name"
                  className={inputStyle}
                  {...register('patientLastName')}
                />
                {errors.patientLastName && <p className="text-red-500">{errors.patientLastName.message}</p>}
              </div>
            </div>
          </div>

          <label className="block font-medium mb-2 text-[20px]">Date of Birth</label>
          <div className="relative nh:text-[15px] mb-4 text-[20px]">
            <input
              type="text"
              placeholder="Select your date of birth"
              value={startDate ? startDate.toLocaleDateString() : ''}
              readOnly
              className={`${inputStyle} pl-10 nh:w-[701px] `}
            />
            <Calendar 
              className={`${iconStyle} cursor-pointer`} 
              onClick={() => setCalendarOpen(true)}
            />
            {calendarOpen && (
              <DatePicker
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setValue('patientDateOfBirth', date ? date : new Date());
                  setCalendarOpen(false);
                }}
                placeholderText="Select your date of birth"
                className="absolute z-10"
                onClickOutside={() => setCalendarOpen(false)}
                inline
              />
            )}
            {errors.patientDateOfBirth && <p className="text-red-500">{errors.patientDateOfBirth.message}</p>}
          </div>

          <div>
            <label className="block font-medium mb-2 text-[20px]">Gender</label>
            <div className="flex gap-[990px] nh:w-[708px] nh:gap-[450px] nh:h-[60px] items-center border-4 p-4 rounded-lg border-customGreen">
              <label className="flex  items-center cursor-pointer mr-8">
                <input
                  type="radio"
                  value="female"
                  className="hidden"
                  {...register('gender')}
                />
                <span className={` nh:w-8 nh:h-8 w-10 h-10 mr-2 border border-gray-400 rounded-full relative flex items-center justify-center`}>
                  <span className={`w-6 h-6 rounded-full bg-black ${watch('gender') === 'female' ? '' : 'hidden'}`} />
                </span>
                <span className='text-gray-400 nh:text-[15px] text-xl'>Female</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="male"
                  className="hidden"
                  {...register('gender')}
                />
                <span className={` nh:w-8 nh:h-8 w-10 h-10 mr-2 border border-gray-400 rounded-full relative flex items-center justify-center`}>
                  <span className={`w-6 h-6 rounded-full bg-black ${watch('gender') === 'male' ? '' : 'hidden'}`} />
                </span>
                <span className='text-gray-400 nh:text-[15px] text-xl'>Male</span>
              </label>
            </div>
            {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
          </div>

          <div className="flex mt-10 nh:mt-5 items-center  mb-4 space-x-4">
            <div className="flex-1">
              <label className="block text-xl font-medium mb-2">Level of Stuttering</label>
              <select
                className={`w-full max-w-[800px] nh:w-[325px] nh:h-[60px] h-[80px] border-[4px] border-customGreen rounded-lg p-3 text-lg ${errors.levelOfStutteringId ? 'border-red-500' : ''}`}
                {...register('levelOfStutteringId')}
              >
                <option value="">Select Level of Stuttering</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              {errors.levelOfStutteringId && <p className="text-red-500 text-sm">{errors.levelOfStutteringId.message}</p>}
            </div>

            <div className="flex-1 -nh:ml-10">
              <label className="block text-xl font-medium mb-2">Child Module ID</label>
              <select
                className={`w-full max-w-[800px] nh:w-[325px] nh:h-[60px] h-[80px] border-[4px] border-customGreen rounded-lg p-3 text-lg ${errors.childmodule_id ? 'border-red-500' : ''}`}
                {...register('childmodule_id')}
              >
                <option value="">Select Child Module ID</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              {errors.childmodule_id && <p className="text-red-500 text-sm">{errors.childmodule_id.message}</p>}
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-customDarkBlue mr-[600px] nh:mr-[270px] nh:text-2xl text-4xl nh:px-16 text-white py-4 px-10 nh:py-2 rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatients;
