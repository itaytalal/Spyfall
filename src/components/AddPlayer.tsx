"use client";
import React, { FormEvent, useState } from 'react';
import axios from 'axios';
import { useUserContext } from '@/context/myContext';

export default function AddPlayer() {
    const [playerInput, setPlayerInput] = useState<string>("");
    const {setPlayers} = useUserContext()
    const submitPlayer = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/players', playerInput, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.data.success) {
                const playerFetch = await axios.get<string[]>('/api/players')
                setPlayers(playerFetch.data)
                setPlayerInput('');
            } else {
                alert(response.data.message || 'Error adding player');
            }
        } catch (error: any) {
            console.error('Error adding player:', error);
            alert("לא ניתן להוסיף שם זה")
        }
    };

    return (
        <form onSubmit={submitPlayer} className='flex flex-col text-center max-w-min gap-3'>
            <input
                className='text-center'
                placeholder='Add Player Name:'
                value={playerInput}
                onChange={(e) => setPlayerInput(e.target.value)}
                required
            />
            <button
                type='submit'
                className='px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white cursor-pointer rounded-md shadow-md'
            >
                הוסף שחקן
            </button>
    </form>
    );
}
