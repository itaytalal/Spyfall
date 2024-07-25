"use client";
import React, { useState } from "react";
import PlaceDisplay from "./PlaceDisplay";
import { Place } from "@/types/Place";
import PlaceAdder from "./PlaceAdder";
import axios from "axios";

type Props = {
  places: Place[];
  onExtend: (place: Place) => void;
  setPlaces: (places: Place[]) => void; // Add this prop to update the places state
};

const PlaceControl = ({ places, onExtend, setPlaces }: Props) => {
  const [acitveAdder, setActiveAdder] = useState<boolean>(false);
  const [newPlaceName,setNewPlaceName] = useState<string>("")
  const [makeRoles,setMakeRoles] = useState<boolean>(false)
  const [newRole,setNewRole] = useState<string>("")
  const [roles,setRoles] = useState<string[]>([])
  const closeCreating = ()=>{
    setActiveAdder(false)
    setNewPlaceName("")
    setMakeRoles(false)
    setRoles([])
  }
  const savePlace = async ()=>{
    if (roles.length < 3) return alert("מקום חייב להכיל לפחות 3 תפקידים")
      try {
        // Construct the payload to match the API's expected structure
        const payload = {
          placeName: newPlaceName,
          jobs: roles,
        };
        const response = await axios.put('/api/places', payload);
        if (response.data.success) {
          console.log('Place saved successfully:', response.data);
          closeCreating()
          setPlaces(response.data.places)
        } else {
          console.error('Failed to save place:', response.data.message);
        }
      } catch (error) {
        console.error('Error saving place:', error);
      }
  }
  return (
    <div className="mt-4 w-full bg-white p-4 rounded-md shadow-md max-w-4xl flex flex-col items-center">
      <PlaceDisplay places={places} onExtend={onExtend} setPlaces={setPlaces} />
      {!acitveAdder ? (
        <button
          onClick={() => setActiveAdder(true)}
          className="px-8 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md shadow"
        >
          הוסף מקום
        </button>
      ) : (
        <PlaceAdder closeCreating={closeCreating} savePlace={savePlace} roles={roles} setRoles={setRoles} newRole={newRole} setNewRole={setNewRole}  setMakeRoles={setMakeRoles} makeRoles={makeRoles}  newPlaceName={newPlaceName} setNewPlaceName={setNewPlaceName} setActiveAdder={setActiveAdder}/>
      )}
    </div>
  );
};

export default PlaceControl;
