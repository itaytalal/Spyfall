import React from 'react';
import { Place } from '@/types/Place';
import { FaTimesCircle } from 'react-icons/fa';

type Props = {
  place: Place;
  exit:()=>void
  newJob:string;
  setNewJob:(j:string)=>void
  handleDeleteJob: (job:string,place:Place)=>void
  handleAddJob: (place:Place)=>void
};

const ExpandedJobs = ({ place,exit,newJob,setNewJob,handleDeleteJob,handleAddJob }: Props) => {


  return (
    <div className='relative flex flex-col min-w-96 bg-white rounded-lg shadow-md p-5 mx-auto'>
      <button
        className='absolute top-2 left-2 text-black hover:text-red-500 transition-colors duration-300'
        onClick={exit}
      >
        <FaTimesCircle size={24} />
      </button>
      <h1 className='text-2xl font-bold text-blue-700 mb-4 text-center'>{place.name}</h1>
      <h2 className='text-xl font-semibold text-gray-800 mb-2 text-center'>תפקידים:</h2>
      <table className='w-full border-collapse'>
        <tbody>
          {place.jobs.map((job, index) => (
            <tr key={5000 + index} className='border-b'>
              <td className='p-2 flex justify-between items-center text-gray-700'>
                <span className='pl-20 pr-5'>{job}</span>
                <button
                  onClick={() => handleDeleteJob(job,place)}
                  className='px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300'
                >
                  X
                </button>
              </td>
            </tr>
          ))}
          <tr><td className='p-2 flex justify-between items-center text-gray-700'>
          <input className='pr-2 mr-5'
          type="text"
          value={newJob}
          onChange={(e) => setNewJob(e.target.value)}
          placeholder="הוסף תפקיד"
        />
        <button  className='px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300' onClick={()=>handleAddJob(place)}>+</button></td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default ExpandedJobs;
