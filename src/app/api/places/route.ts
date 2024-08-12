import { Place } from "@/types/Place";
import { NextResponse } from "next/server";

let places: Place[] = [
  {
    id: 1,
    name: "חנות",
    //prettier-ignore
    jobs: ["קופאי/ת","מנהל/ת חנות","שרת/ת","מאבטח/ת","סוכן/ת מכירות","לקוח/ה",],
  },
  {
    id: 2,
    name: "תחנת משטרה",
    //prettier-ignore
    jobs: ["שוטר סיור", "תובע מחוזי","טלפנ/ית","מכין סופגניות","קצין משטרתי","פקח","שוטר ימי","שוטר תנועה","אזרח מגזע נחות"],
  },
  {
    id: 3,
    name: "קניון",
    //prettier-ignore
    jobs: ["קופאי","בעלים","מנהל חנות","שרת","מאבטח","סוכן מכירות","לקוח"],
  },
  {
    id: 31,
    name: "ים",
    jobs: ["מציל", "מדריך שייט", "סוכן טיולים", "מלצר", "דייג"],
  },
  {
    id: 32,
    name: "בית קפה",
    jobs: ["בריסטה", "מלצר", "שף", "מנהל/ת משמרת", "עובד/ת ניקיון"],
  },
  {
    id: 33,
    name: "בסיס צבאי",
    jobs: ["חייל", "קצין", "מחבל", "שקמיסט", "משקית תש"],
  },
  {
    id: 4,
    name: "הר מושלג",
    jobs: [
      "מדריך סקי",
      "טכנאי רכבלים",
      "בעל בית קפה",
      "אורח",
      "עובד/ת חנות השכרת ציוד",
    ],
  },
  {
    id: 5,
    name: "בית ספר",
    jobs: ["מורה", "סייעת", "מנהל/ת", "יועץ/ת", "מאמן/ת ספורט"],
  },
  {
    id: 6,
    name: "בית עלמין",
    jobs: [
      "עובד/ת תחזוקה",
      "מנהלי קבורה",
      "קברן",
      "גופה",
      "עובד/ת אדמיניסטרציה",
      "מאבטח",
    ],
  },
  {
    id: 7,
    name: "כנסת",
    jobs: [
      "חבר/ת כנסת",
      "יועץ/ת פוליטי",
      "עוזר/ת פרלמנטרי",
      "מאבטח אישים",
      "פקיד",
    ],
  },
  {
    id: 8,
    name: "סופרמרקט",
    jobs: ["קופאי/ת", "מנהל/ת משמרת", "עובד/ת מדף", "מאבטח"],
  },
  {
    id: 9,
    name: "מוזיאון",
    jobs: ["מדריך", "אוצר", "עובד/ת קבלה", "מנהל/ת פרויקטים"],
  },
  {
    id: 10,
    name: "חניון",
    jobs: ["מאבטח", "עובד/ת תפעול", "פקח/ית", "מנהל/ת חניון"],
  },
  {
    id: 11,
    name: "בית חולים",
    jobs: [
      "רופא",
      "אחות",
      "עובד/ת מנהלה",
      "מנהל/ת מחלקה",
      "מטופל",
      "כירורג",
      "מנתח פלסטי",
    ],
  },
  {
    id: 12,
    name: "חנות בגדים",
    jobs: ["מוכר/ת", "מנהל/ת חנות", "עובד/ת מחסן", "מעצב/ת אופנה"],
  },
  {
    id: 13,
    name: "פארק",
    jobs: [
      "מדריך טיולים",
      "מאבטח",
      "עובד/ת ניקיון",
      "מנהל/ת פארק",
      "זוג בדייט",
    ],
  },
  {
    id: 15,
    name: "נמל תעופה",
    jobs: ["מאבטח", "עובד/ת קבלה", "מנהל/ת טרמינל", "טכנאי/ת מטוסים", "טייס"],
  },
  {
    id: 14,
    name: "חדר כושר",
    jobs: [
      "מדריך כושר",
      "מתאמנ/ת",
      "לוחם",
      "כוסית בטייץ",
      "סטרואיד בוסטר",
      "מדריכת פילאטיס",
    ],
  },
  {
    id: 16,
    name: "סטודיו ליוגה",
    jobs: ["מדריך/ה", "תלמידים", "נגן קערה טיבטית", "סטלנ/ית"],
  },
  {
    id: 17,
    name: "אולם אירועים",
    jobs: ["מנהל/ת אירועים", "מלצר", "שף", "מאבטח", "רב"],
  },
  {
    id: 18,
    name: "ספארי",
    jobs: ["עובד/ת חווה", "מדריך/ה", "עובד/ת ניקיון", "מנהל/ת חווה","מאכיל קופים","אורח"],
  },
  {
    id: 19,
    name: "קולנוע",
    jobs: ["מוכר/ת כרטיסים", "מלצר", "מנהל/ת אולם", "מאבטח"],
  },
  {
    id: 20,
    name: "פארק מים",
    jobs: ["מציל", "עובד/ת דלפק", "מדריך/ה", "מאבטח", "ילד שנהנה מהחיים שלו"],
  },
  {
    id: 21,
    name: "חנות פרחים",
    jobs: ["מוכר/ת", "מעצב/ת פרחים", "מנהל/ת חנות", "עובד/ת משלוחים"],
  },
  {
    id: 22,
    name: "ספרייה",
    jobs: ["ספרן/ית", "עובד/ת אדמיניסטרציה", "מדריך/ה", "מאבטח"],
  },
  {
    id: 25,
    name: "אצטדיון כדורגל",
    jobs: [
      "מאמן/ת",
      "מביא כדורים",
      "נער מגבות",
      "בעל קבוצה",
      "נער מים",
      "שחקן כוכב",
      "שחקן ספסל",
    ],
  },
  {
    id: 26,
    name: "אצטדיון כדורסל",
    jobs: [
      "מאמן/ת",
      "מביא כדורים",
      "נער מגבות",
      "בעל קבוצה",
      "נער מים",
      "שחקן כוכב",
      "שחקן ספסל",
    ],
  },
  {
    id: 27,
    name: "מגרש טניס",
    jobs: ["שחקן", "מביא כדורים", "שופט", "נער מים", "שחר חיון"],
  },
];
export async function GET(req: Request) {
  //the function first check is it recieved an id.
  //if there is an id it will return the place by id
  //if there is no id in params it will return all places.
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (id) {
    const place = places.find((place) => place.id === parseInt(id));
    if (place) {
      return NextResponse.json(place);
    } else {
      return NextResponse.json(
        { success: false, message: "Place not found" },
        { status: 404 }
      );
    }
  } else {
    return NextResponse.json(places);
  }
}
//recieve a placeName + jobs[]/length>3
export async function PUT(req: Request) {
  try {
    const { placeName, jobs }: { placeName: string; jobs: string[] } =
      await req.json();

    // Check for invalid data
    if (!placeName || !Array.isArray(jobs) || jobs.length < 3) {
      return NextResponse.json(
        { success: false, message: "Invalid place data" },
        { status: 400 }
      );
    }

    // Check if the placeName already exists
    const existingPlace = places.find((place) => place.name === placeName);
    if (existingPlace) {
      return NextResponse.json(
        { success: false, message: "Place name already exists" },
        { status: 400 }
      );
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
    console.error("Error updating places:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
//delete a place by id
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = parseInt(url.searchParams.get("id") || "");

  if (isNaN(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid ID" },
      { status: 400 }
    );
  }

  const initialLength = places.length;
  places = places.filter((place) => place.id !== id);

  if (places.length === initialLength) {
    return NextResponse.json(
      { success: false, message: "Place not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true, places });
}
