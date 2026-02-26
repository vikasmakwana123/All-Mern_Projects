import { createContext, useState } from 'react';

// Create the context
export const MusicContext = createContext();

// Create provider component
export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [songName, setsongName] = useState(null);
  const [songs, setSongs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [loopMode, setLoopMode] = useState('next'); // 'loop' or 'next'

  const playNextSong = () => {
    if (songs.length === 0) return;
    
    if (loopMode === 'loop') {
      // Restart current song
      setCurrentSong(songs[currentIndex]?.filename);
    } else {
      // Play next song
      const nextIndex = (currentIndex + 1) % songs.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(songs[nextIndex].filename);
      setsongName(songs[nextIndex].originalName);
    }
  };

  const playPreviousSong = () => {
    if (songs.length === 0) return;
    
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setCurrentIndex(prevIndex);
    setCurrentSong(songs[prevIndex].filename);
    setsongName(songs[prevIndex].originalName);
  };

  const toggleLoopMode = () => {
    setLoopMode(loopMode === 'loop' ? 'next' : 'loop');
  };

  return (
    <MusicContext.Provider value={{ 
      songName, 
      setsongName, 
      currentSong, 
      setCurrentSong,
      songs,
      setSongs,
      currentIndex,
      setCurrentIndex,
      playNextSong,
      playPreviousSong,
      loopMode,
      toggleLoopMode
    }}>
      {children}
    </MusicContext.Provider>
  );
};
