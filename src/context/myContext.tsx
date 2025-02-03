"use client"

import { Place } from "@/types/Place"
import { useContext, useState,createContext } from "react"

const userContext = createContext<any>(undefined)

export function ContextWrap({children}:{children:React.ReactNode}){
    const [players,setPlayers] = useState<string[]>([])
    const [places,setPlaces] = useState<Place[]>([])
    const [user,setUser] = useState<string>("")
    const [spys,setSpys] = useState<Number>(1)
    const [timeMinute,setTimeMinute] = useState<Number>(15)
    
    return(
        <userContext.Provider value={{user,setUser,players,setPlayers,places,setPlaces,spys,setSpys,timeMinute,setTimeMinute}}>
            {children}
        </userContext.Provider>
    )
}
export function useUserContext() {
    return useContext(userContext)
}