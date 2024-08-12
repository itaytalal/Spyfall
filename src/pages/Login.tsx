"use client"
import { useUserContext } from '@/context/myContext'
import { useRouter } from 'next/navigation'
import React from 'react'
import "../styles/myStyle.css"

type Props= {}

const Login = ({ }:Props) => {
    const { user, setUser } = useUserContext()
    const router = useRouter()
  
    const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault()
      if (user.trim().length > 2) { 
        router.push("/")
      } else {
        alert("שם המשתמש חייב להיות ארוך מ2 תווים")
      }
    }
  
    return (
      <div className='flex min-h-screen flex-col items-center space-y-5 '>
        <h1 className='text-lg font-bold m-2'>הזדהות</h1>
        <form className='gap-4' onSubmit={handleSubmit}>
          <label className='text-center'>
            הקלד את שמך:<br/>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            />
          </label>
          <button type="submit" className='button-style px-6 py-3 mt-5'>התחל</button>
        </form>
      </div>
    )
}

export default Login