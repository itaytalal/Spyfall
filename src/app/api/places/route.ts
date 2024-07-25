import { Place } from "@/types/Place";
import { NextResponse } from "next/server";

let places: Place[] = [
  {
    id: 1,
    name: "חנות",
    //prettier-ignore
    jobs: ["Cashier","Store Manager","Janitor","Security Gaurd","Sales Agesnt","Client",],
  },
  {
    id: 2,
    name: "תחנת משטרה",
    //prettier-ignore
    jobs: ["Patrol Officer", "Car Tech","Emergency Call Speaker","Security Gaurd","Captain","Inspector","Border Police","Roads Patrol",],
  },
  {
    id: 3,
    name: "קניון",
    //prettier-ignore
    jobs: ["Cashier","Mall Manager","Store Manager","Janitor","Security Gaurd","Sales Agesnt","Client"],
  },
];
export async function GET(req: Request) {
  //the function first check is it recieved an id. 
  //if there is an id it will return the place by id
  //if there is no id in params it will return all places.
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (id) {
    const place = places.find((place) => place.id === parseInt(id));
    if (place) {
      return NextResponse.json(place);
    } else {
      return NextResponse.json({ success: false, message: 'Place not found' }, { status: 404 });
    }
  } else {
    return NextResponse.json(places);
  }
}
//recieve a placeName + jobs[]/length>3
export async function PUT(req: Request) {
  try {
    const { placeName, jobs }: { placeName: string, jobs: string[] } = await req.json();

    // Check for invalid data
    if (!placeName || !Array.isArray(jobs) || jobs.length<3) {
      return NextResponse.json({ success: false, message: 'Invalid place data' }, { status: 400 });
    }

    // Check if the placeName already exists
    const existingPlace = places.find((place) => place.name === placeName);
    if (existingPlace) {
      return NextResponse.json({ success: false, message: 'Place name already exists' }, { status: 400 });
    }

    // Assign the smallest available ID
    const existingIds = places.map((place) => place.id);
    let newId = 1;
    while (existingIds.includes(newId)) {
      newId++;
    }

    // Create the new place
    const newPlace: Place = { id: newId, name: placeName, jobs };
    places = [...places, newPlace];

    return NextResponse.json({ success: true, places });
  } catch (error) {
    console.error('Error updating places:', error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
}
  //delete a place by id
  export async function DELETE(req: Request) {
    const url = new URL(req.url);
    const id = parseInt(url.searchParams.get('id') || '');
  
    if (isNaN(id)) {
      return NextResponse.json({ success: false, message: 'Invalid ID' }, { status: 400 });
    }
  
    const initialLength = places.length;
    places = places.filter((place) => place.id !== id);
  
    if (places.length === initialLength) {
      return NextResponse.json({ success: false, message: 'Place not found' }, { status: 404 });
    }
  
    return NextResponse.json({ success: true, places });
  }