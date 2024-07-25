import { NextResponse } from "next/server";

let players: string[] = [];

// Check if a player exists in the list
const playerExists = (player: string): boolean => players.includes(player);

// Remove a player from the list
function removePlayer(player: string): boolean {
    const index = players.indexOf(player);
    if (index > -1) {
        players.splice(index, 1);
        return true;
    }
    return false;
}

// Handle PUT request to add a new player
export async function PUT(req: Request) {
    try {
        const newPlayer: string = await req.json();
        if (!newPlayer.trim() || playerExists(newPlayer))
            return NextResponse.json({ success: false, message: 'Player cannot be added' }, { status: 401 });
        players.push(newPlayer);
        return NextResponse.json({ success: true, players });
    } catch (error) {
        console.error('Error Posting Player:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}

// Handle GET request to fetch the list of players
export async function GET() {
    return NextResponse.json(players);
}

// Handle DELETE request to remove a player
export async function DELETE(req: Request) {
    try {
        const url = new URL(req.url);
        const player = url.searchParams.get('player');
        if (!player || !playerExists(player)) {
            return NextResponse.json({ success: false, message: 'Player not found' }, { status: 404 });
        }
        removePlayer(player);
        return NextResponse.json({ success: true, players });
    } catch (error) {
        console.error('Error Deleting Player:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
// Handle POST request to initialize the players array
export async function POST(req: Request) {
    try {
        const initialPlayers: string[] = await req.json();

        // Validate the incoming data is an array of strings
        if (!Array.isArray(initialPlayers) || initialPlayers.some(player => typeof player !== 'string' || !player.trim())) {
            return NextResponse.json({ success: false, message: 'Invalid input data' }, { status: 400 });
        }

        // Set the players array to the new list
        players = initialPlayers;
        return NextResponse.json({ success: true, players });
    } catch (error) {
        console.error('Error Initializing Players:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}