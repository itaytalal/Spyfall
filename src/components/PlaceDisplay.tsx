import React from "react";
import { Place } from "@/types/Place";
import axios from "axios";

type PlaceDisplayProps = {
  places: Place[];
  onExtend?: ((place: Place) => void) | null;
  setPlaces?: ((places: Place[]) => void) | null; // Add this prop to update the places state
};

export default function PlaceDisplay({ places, onExtend = null, setPlaces = null }: PlaceDisplayProps) {
  const onRemove = async (id: number) => {
    if (setPlaces) {
      try {
        const response = await axios.delete(`/api/places?id=${id}`);
        if (response.data.success) {
          setPlaces(response.data.places);
        } else {
          console.error("Failed to remove place:", response.data.message);
        }
      } catch (error) {
        console.error("Error removing place:", error);
      }
    }
  };

  return (
    <table className="w-full table-fixed m-2">
      <tbody>
        {places.map((place, index) => (
          <React.Fragment key={place.id}>
            {index % 2 === 0 && (
              <tr>
                <td className="p-2 border border-gray-300">
                  <div className={`flex justify-between items-center ${!onExtend ? 'justify-center' : ''}`}>
                    <span className={`font-bold ${!onExtend ? 'text-center w-full' : ''}`}>{places[index]?.name}</span>
                    {onExtend && (
                      <div className="flex gap-2">
                        <button
                          className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                          onClick={() => onExtend(place)}
                        >
                          הרחב
                        </button>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                          onClick={() => onRemove(place.id)}
                        >
                          מחק
                        </button>
                      </div>
                    )}
                  </div>
                </td>
                {index + 1 < places.length && (
                  <td className="p-2 border border-gray-300">
                    <div className={`flex  items-center ${!onExtend ? 'justify-center' : 'justify-between'}`}>
                      <span className={`font-bold ${!onExtend ? 'text-center w-full' : ''}`}>
                        {places[index + 1]?.name}
                      </span>
                      {onExtend && (
                        <div className="flex gap-2">
                          <button
                            className="px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                            onClick={() => onExtend(places[index + 1])}
                          >
                            הרחב
                          </button>
                          <button
                            className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                            onClick={() => onRemove(places[index + 1].id)}
                          >
                            מחק
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}
