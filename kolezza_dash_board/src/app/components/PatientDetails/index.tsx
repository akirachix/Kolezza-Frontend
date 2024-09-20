import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useGetChildData from '@/app/(admin)/admin/components/hooks/useGetChildData';

const PatientDetails = ({ childId }: { childId: string }) => {
  const { childData, loading, error } = useGetChildData(childId);
  const router = useRouter();

  const calculateAge = (dobString: string) => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-customGreen rounded-[10px] ml-0 nh:ml-[-0.5rem] -mt-8 pb-12 nh:pb-8 px-4 md:px-8 lg:px-16 nh:px-9">
  <IoIosArrowBack className="text-[2.5rem] pt-4" onClick={() => router.back()} />
  <div className="flex flex-wrap nhm:gap-[3rem] nh:gap-[2rem] nhm:ml-6 nh:ml-5 gap-20 ml-[8rem] nhm:text-[1.15rem] nh:text-[1rem] text-[1.5rem] nhm:pr-16 nh:pr-1 mt-7 mb-10">
    {[
      { label: 'Name', value: `${childData.first_name} ${childData.last_name}` },
      { label: 'Age', value: `${calculateAge(childData.date_of_birth)} years` },
      { label: 'Current Module', value: childData.childmodule_id },
    ].map((info, index) => (
      <div key={index} className="bg-white w-full nhm:w-52 nh:w-44 md:w-80 px-[2rem] py-[2rem] rounded-lg nhm:py-[0.85rem] nh:py-[0.75rem] nhm:px-[1.95rem] nh:px-[0.95rem] drop-shadow-[3px_3px_6px_rgba(0,0,0,0.5)]">
        <strong>{info.label}:</strong>
        <p>{info.value}</p>
      </div>
    ))}
  </div>
  <div className="flex flex-wrap justify-center nhm:gap-112 nh:gap-10  gap-[20rem] text-xl font-semibold">
    <Link href={`/patient-progress/${childId}`} className="hover:underline">Patient Progress</Link>
    <Link href={`/activate-module/${childId}`} className="hover:underline">Activate New Module</Link>
  </div>
</div>

  );
};

export default PatientDetails;