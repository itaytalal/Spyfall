import React from "react";
import CreateRoles from "./CreateRoles";
import { FaTimesCircle } from "react-icons/fa";
import axios from "axios";

type Props = {
  newPlaceName: string;
  setNewPlaceName: (name: string) => void;
  setActiveAdder: (yes: boolean) => void;
  makeRoles: boolean;
  setMakeRoles: (yes: boolean) => void;
  setNewRole: (role: string) => void;
  newRole: string;
  roles: string[];
  setRoles: (r: string[]) => void;
  savePlace:()=>void
  closeCreating:()=>void
};

const PlaceAdder = ({
  closeCreating,
  savePlace,
  roles,
  setRoles,
  newRole,
  setNewRole,
  newPlaceName,
  setNewPlaceName,
  setActiveAdder,
  makeRoles,
  setMakeRoles,
}: Props) => {
  const startCreating = () => {
    if (!newPlaceName.trim()) return;
    setMakeRoles(true);
  };

  
  return (
    <div className="flex relative flex-col gap-2 border-gray-700 border-2 p-2 rounded-md">
            <button
        className='absolute top-2 left-2 text-black hover:text-red-500 transition-colors duration-300'
        onClick={closeCreating}
      ><FaTimesCircle size={24} /></button>
      {!makeRoles ? (
        <div className="flex mt-8 flex-col gap-2">
          <input
            className="text-center"
            type="text"
            value={newPlaceName}
            onChange={(e) => setNewPlaceName(e.target.value)}
            placeholder="שם המקום החדש"
          />
          <button
            onClick={startCreating}
            className="rounded shadow px-4 py-2 bg-green-500"
          >
            צור
          </button>
        </div>
      ) : (
        <div className="text-xl mt-8 font-bold text-center">{newPlaceName}</div>
      )}
      {makeRoles && (
        <CreateRoles
          roles={roles}
          setRoles={setRoles}
          newRole={newRole}
          setNewRole={setNewRole}
          savePlace={savePlace}
        />
      )}
    </div>
  );
};

export default PlaceAdder;
