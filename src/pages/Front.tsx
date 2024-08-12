"use client";
import AddPlayer from "@/components/AddPlayer";
import ExpandedJobs from "@/components/ExpandedJobs";
import PlaceControl from "@/components/PlaceControl";
import PlacesToggle from "@/components/PlacesToggle";
import PlayersList from "@/components/PlayerList";
import SpyRadio from "@/components/SpyRadio";
import { useUserContext } from "@/context/myContext";
import { Place } from "@/types/Place";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { VscLoading } from "react-icons/vsc";

type Props = {};

export const Front = (props: Props) => {
  const { user, players, setPlayers, places, setPlaces, setSpys,spys } = useUserContext();
  const [showPlaces, setShowPlaces] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newJob, setNewJob] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [spy, setSpystring] = useState<string>("1");
  const router = useRouter();


  const toggleShowPlaces = () => setShowPlaces(!showPlaces);

  const setSpy = (val: string): void => {
    setSpystring(val);
    setSpys(parseInt(val));
  };

  const resetSelectedPlace = (): void =>{
     setSelectedPlace(null);
    setNewJob("")
    }

  const handleExtendPlace = (place: Place) => {setSelectedPlace(place);
    setNewJob("")}

  const start = (): void => {
    if(players.length<3) return alert("המשחק דורש לפחות 3 שחקנים")
    if (places.length < 3) return alert("המשחק דורש לפחות 3 מקומות")
    if (spys == 2 && players.length < 4) return alert("לשני מרגלים דרושים לפחות 5 שחקנים")
    router.push("/game");
  };

  const fetchPlaces = async () => {
    try {
      const response = await axios.get<Place[]>("/api/places");
      setPlaces(response.data);
    } catch (error: any) {
      setError(error.message);}
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      fetchPlaces().then(() => setLoading(false));
      setSpy("1");
      if (players.length>0) {
        setLoading(true);
        const postPlayer = async () => {
          try {
            const res = await axios.post("/api/players",players);
            console.log(res);
          } catch (error: any) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
        postPlayer();
      }
    }
  }, [user, router, setPlaces]);

  const handleDeleteJob = async (job: string, place: Place) => {
    if (place.jobs.length <=3) return alert("למקום חייבים להיות לפחות 3 תפקידים")
    try {
      const newJobs = place.jobs.filter((j) => j !== job);
      const payload = {
        placeName: place.name,
        jobs: newJobs,
      };
  
      // Delete the place from the backend
      await axios.delete(`/api/places?id=${place.id}`);
      const res = await axios.put('/api/places', payload);
      //render places after change
      setPlaces(res.data.places)
      const newPlace = res.data.places.find((p: Place) => p.name === place.name);
      // Update the selected place directly with the newPlace
      setSelectedPlace(newPlace);
  
      console.log(`Deleted job: ${job}`);
      console.log("places after job delete:", newPlace);
    } catch (error) {
      console.error('Error updating place:', error);
    }
  };
  const handleAddJob = async (place:Place) => {
    if (!newJob.trim()) return; // Prevent adding empty job
    const dup = place.jobs.find(j=>j===newJob)
    if (dup) return//preventAdding duplicate
    try {
      const newJobs = [...place.jobs, newJob.trim()];
      const payload = {
        placeName: place.name,
        jobs: newJobs,
      };
      await axios.delete(`/api/places?id=${place.id}`);
      const res = await axios.put('/api/places', payload);
      //render places after change
      setPlaces(res.data.places)
      const newPlace = res.data.places.find((p: Place) => p.name === place.name);
      // Update the selected place directly with the newPlace
      setSelectedPlace(newPlace);
      console.log(`Added job: ${newJob}`);
      setNewJob(''); // Clear the input field
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };
  

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
    <main className="flex flex-col gap-4 items-center">
      <h1 className="mb-4 text-gray-800">שלום {user}</h1>
      <h1>שחקנים:</h1>
      <PlayersList players={players} setPlayers={setPlayers} />
      <AddPlayer />
      <SpyRadio spy={spy} setSpy={setSpy} />
      <button
        onClick={start}
        className="px-8 py-4 cursor-pointer rounded-md shadow-md text-white text-2xl bg-green-500 hover:bg-green-700"
      >
        שחק
      </button>

      <PlacesToggle showPlaces={showPlaces} toggleShowPlaces={toggleShowPlaces} places={places}/>
      {showPlaces && (
        <PlaceControl
          places={places}
          onExtend={handleExtendPlace}
          setPlaces={setPlaces}
        />
      )}
      {selectedPlace && (
        <ExpandedJobs 
          handleDeleteJob={handleDeleteJob} 
          place={selectedPlace} 
          exit={resetSelectedPlace} 
          newJob={newJob} 
          setNewJob={setNewJob} 
          handleAddJob={handleAddJob}
        />
      )}
    </main>
  );
};
