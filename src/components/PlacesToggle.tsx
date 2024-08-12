import { Place } from '@/types/Place';
import React from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

type Props= {
    toggleShowPlaces:()=>void;
    showPlaces:boolean;
    places:Place[]
}

const PlacesToggle = ({toggleShowPlaces,showPlaces,places }:Props) => {
  return (
    <div
    className="bg-white mt-2 p-4 gap-4 flex items-center justify-between rounded-md text-black cursor-pointer hover:bg-gray-200 shadow-md"
    onClick={toggleShowPlaces}
  >
    <p>מקומות: ({places.length})</p>
    {!showPlaces ? <FaChevronDown /> : <FaChevronUp />}
  </div>
  )
}

export default PlacesToggle