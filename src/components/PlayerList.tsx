import React from 'react';
import axios from 'axios';
import { Place } from '@/types/Place';
import toast, { Toaster } from 'react-hot-toast';
import PopToast from './PopToast';

type Props = {
  players: string[];
  place?: Place | null;
  setPlayers?: (players: string[]) => void; // Optional setPlayers function
  mySpy?: string | null;
  mySpy2?: string | null;
  onAllPlayersDisabled?: () => void; // Callback when all players are disabled
  disabledPlayers?:string[] | null
  setDisabledPlayers?:((players:string[])=>void) | null ///this is dont to avoid using useState in this components as i want to keep is serverComp
};

export default function PlayersList({ players, place = null, mySpy = null, mySpy2 = null, setPlayers, onAllPlayersDisabled,disabledPlayers=null,setDisabledPlayers=null }: Props) {
  const addtodisabled = (player : string)=>{
    if (setDisabledPlayers && disabledPlayers){
    setDisabledPlayers([...disabledPlayers, player]);
    }
    if (disabledPlayers?.length === players.length - 1)  //the render is not quick enough so i must change 
      onAllPlayersDisabled?.();
  }

  const deletePlayer = async (player: string) => {
    try {
      const response = await axios.delete(`/api/players?player=${player}`);
      if (response.data.success && setPlayers) {
        const playerFetch = await axios.get<string[]>('/api/players');
        setPlayers(playerFetch.data);
      } else {
        alert(response.data.message || 'Error deleting player');
      }
    } catch (error: any) {
      console.error('Error deleting player:', error);
    }
  };

  const ToastPlayerData = (player: string) => {
    if (player === mySpy) {
      return toast.custom((t) => (
        <PopToast
          job="?????"
          placeName="?????"
          dismis={() => {
            toast.dismiss(t.id);
            addtodisabled(player)
          }}
        />
      ));
    }
    if (mySpy2 && player === mySpy2) {
      return toast.custom((t) => (
        <PopToast
          job="?????"
          placeName="?????"
          dismis={() => {
            toast.dismiss(t.id);
            addtodisabled(player)
          }}
        />
      ));
    }
    if (place?.jobs.length) {
      const randomJobindex = Math.floor(Math.random() * place?.jobs.length);
      const randomJob = place.jobs[randomJobindex];
      toast.custom((t) => (
        <PopToast
          dismis={() => {
            toast.dismiss(t.id);
            addtodisabled(player)
          }}
          job={randomJob}
          placeName={place.name}
        />
      ));
    }
  };

  const handleClick = (player: string) => {
    if (place) {
      ToastPlayerData(player);
    } else {
      deletePlayer(player);
    }
  };

  return (
    <div className='flex flex-col items-center py-2 gap-3 border-b-2 border-black w-screen'>
      <Toaster />
      {players.length === 0 && (
        <div className=' text-red-500 font-semibold m-2'>אין שחקנים!</div>
      )}
      {players.map((player, index) => (
        <div
          key={3000 + index}
          className={`px-5 w-52 py-2 rounded-md shadow-md text-center ${
            disabledPlayers?.includes(player)
              ? 'bg-gray-400 text-gray-300'
              : place
              ? 'bg-blue-500 text-white cursor-pointer hover:bg-blue-700'
              : 'bg-gray-700 text-gray-300 cursor-pointer hover:bg-red-700'
          }`}
          onClick={!disabledPlayers?.includes(player) ? () => handleClick(player) : undefined}
        >
          {player}
        </div>
      ))}
    </div>
  );
}
