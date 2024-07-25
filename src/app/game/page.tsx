"use client";
import { useUserContext } from "@/context/myContext";
import React, { useEffect, useState } from "react";
import "../../styles/myStyle.css";
import { GiSpy } from "react-icons/gi";
import PlayersList from "@/components/PlayerList";
import { Place } from "@/types/Place";
import { useRouter } from "next/navigation";
import { VscLoading } from "react-icons/vsc";
import Timer from "@/components/Timer";
import { IoIosReturnRight } from "react-icons/io";


export default function Home() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { spys, players, places } = useUserContext();
  const [chosenPlace, setChosenPlace] = useState<Place | null>(null);
  const [chosenSpy1, setChosenSpy1] = useState<string | null>(null);
  const [chosenSpy2, setChosenSpy2] = useState<string | null>(null);
  const [timerStart, setTimerStart] = useState<boolean>(false);
  const [disabledPlayers,setDisabledPlayers] = useState<string[]>([])
  const router = useRouter();
  const backHome = (): void => {
    router.push("/");
  };

  useEffect(() => {
    if (places.length === 0 || players.length === 0) {
      router.push("/");
      return;
    }

    try {
      console.log("spys: " + spys);
      console.log("players: " + players);
      console.log("places: " + places);

      // Choose a random place from the places array
      if (places.length > 0) {
        const randomIndex = Math.floor(Math.random() * places.length);
        setChosenPlace(places[randomIndex]);
      }
      if (players.length > 0) {
        const firstSpyIndex = Math.floor(Math.random() * players.length);
        setChosenSpy1(players[firstSpyIndex]);

        if (spys === 2 && players.length > 1) {
          let secondSpyIndex;
          do {
            secondSpyIndex = Math.floor(Math.random() * players.length);
          } while (secondSpyIndex === firstSpyIndex);
          setChosenSpy2(players[secondSpyIndex]);
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [spys, players, places, router]);

  if (loading) {
    return (
      <div>
        <VscLoading className="animate-spin text-gray-800" size={50} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex flex-row gap-2 items-center">
        <GiSpy />
        {spys}
      </div>
      <PlayersList
        players={players}
        place={chosenPlace}
        onAllPlayersDisabled={() => setTimerStart(true)}
        mySpy={chosenSpy1}
        mySpy2={chosenSpy2 || null}
        disabledPlayers={disabledPlayers}
        setDisabledPlayers={setDisabledPlayers}
      />
      {chosenPlace && timerStart && (
        <div className="text-center mt-4">
          <Timer initialMinutes={1} />
        </div>
      )}
      <button className="flex flex-row items-center gap-1 border-2 px-4 py-2
      rounded shadow border-black hover:bg-white" onClick={() => backHome()}><IoIosReturnRight /> חזור </button>
    </div>
  );
}
