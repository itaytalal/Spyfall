import React from 'react'

type Props = {}

export default function Root({}: Props) {
  return (
    <main className="flex flex-col  font-sans">
    <header className="bg-gray-800 text-white py-4 text-center fixed top-0 left-0 w-full z-10  ">
      <div className="max-w-screen-lg mx-auto px-4">
        <h2 className="m-0">SpyFall</h2>
      </div>
    </header>
    <div className="flex-grow">
    </div>
  </main>
  )
}