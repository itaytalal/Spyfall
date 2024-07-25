import React from 'react'

type Props= {
    job:string,
    placeName:string,
    dismis:()=>void
}

const PopToast = ({job,placeName,dismis }:Props) => {
  return (
    <div className='flex flex-col gap-3 items-center bg-white p-12 text-2xl rounded-md shadow'>
      <h1>תפקיד: {job}</h1>
      <h1>מקום: {placeName}</h1>
      <button className='px-4 py-2 bg-gray-500 hover:bg-gray-700 rounded-md shadow' onClick={dismis}>יש לי!</button>
     </div>
  )
}

export default PopToast