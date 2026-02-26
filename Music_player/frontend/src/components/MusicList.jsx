import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { MusicContext } from '../context/MusicContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const MusicList = () => {
  const [songsLocal, setSongsLocal] = useState([]);
  const { setCurrentSong, setsongName, setSongs, setCurrentIndex } = useContext(MusicContext);
  const [SetOpen, setSetOpen] = useState(true);
  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/audio/music-list`, { withCredentials: true })
      .then(res => {
        setSongsLocal(res.data);
        setSongs(res.data); // Update context with all songs
      })
      .catch(err => {
        console.error('Error fetching music list:', err);
      });
  }, [setSongs]);

  const handleSongClick = (song, index) => {
    setCurrentSong(song.filename);
    setsongName(song.originalName);
    setSelectedSong(song.filename);
    setCurrentIndex(index); // Set the index in context
  };

  return (
    <div
      className={`min-h-full bg-black border-[2px] border-cyan-950 rounded-3xl max-h-[300px] text-white flex flex-col items-center p-6 transition-opacity duration-500
        ${SetOpen ? 'max-w-fit  w-full' : 'w-90'} // ✅ shrink when closed
      `}
    >
      <div className="mb-6 flex items-center justify-center space-x-4">
        <h1 className="text-2xl font-bold">🎶 Music Library</h1>
        {SetOpen ? (
          <svg
            className="m-auto cursor-pointer"
            onClick={() => setSetOpen(!SetOpen)}
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        ) : (
          <svg
            className="m-auto cursor-pointer"
            onClick={() => setSetOpen(!SetOpen)}
            xmlns="http://www.w3.org/2000/svg"
            width="24" height="24"
            fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        )}
      </div>

      {/* Only show list when open */}
      <ul className={`only-thumb  sm:w-[27vw] w-[70vw] space-y-4 overflow-y-scroll overflow-x-hidden transition-all duration-600 ease-in-out 
        ${SetOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'} `} >

         {songsLocal.map((song, index) => ( 
          <li onClick={() => handleSongClick(song, index)} 
          key={song.filename} 
          className="bg-gray-800 w-[100vw] hover:bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer flex items-center justify-between" >
            <span className={`truncate ${selectedSong === song.filename ? 'text-blue-400 font-semibold' : ''}`} >
               {song.originalName}
            </span> 
          </li>
             ))} 
      </ul>
    </div>
  );
};

export default MusicList;
