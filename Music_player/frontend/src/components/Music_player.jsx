import React, { useRef, useState, useEffect, useContext } from 'react';
import { MusicContext } from '../context/MusicContext';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const MusicPlayer = ({ filename, title }) => {
  const audioRef = useRef(null);
  const shouldAutoPlayRef = useRef(false); // Track if we should auto-play next song
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showVolume, setShowVolume] = useState(false);
  const { currentSong, songName, playNextSong, playPreviousSong, loopMode, toggleLoopMode } = useContext(MusicContext);

  useEffect(() => {
  const audio = audioRef.current;
  if (!audio || !currentSong) return;

  audio.src = `${API_BASE_URL}/audio/music/${currentSong}`;
  audio.load();

  // ✅ Always auto-play when song changes
  audio.play()
    .then(() => setIsPlaying(true))
    .catch(err => console.log("Play blocked:", err));

  setProgress(0);

  const updateProgress = () => setProgress(audio.currentTime);
  const updateDuration = () => setDuration(audio.duration);

  const handleEnded = () => {
    if (loopMode === 'loop') {
      audio.currentTime = 0;
      audio.play();
    } else {
      playNextSong(); // ✅ next song will auto-play
    }
  };

  audio.addEventListener('timeupdate', updateProgress);
  audio.addEventListener('loadedmetadata', updateDuration);
  audio.addEventListener('ended', handleEnded);

  return () => {
    audio.removeEventListener('timeupdate', updateProgress);
    audio.removeEventListener('loadedmetadata', updateDuration);
    audio.removeEventListener('ended', handleEnded);
  };
}, [currentSong, loopMode]);


  

  const togglePlay = () => {
  const audio = audioRef.current;
  if (!audio) return;

  if (audio.paused) {
    audio.play();
    setIsPlaying(true);
  } else {
    audio.pause();
    setIsPlaying(false);
  }
};

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = e.target.value;
    setProgress(audio.currentTime);
  };

  const handleVolume = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const vol = e.target.value;
    audio.volume = vol;
    setVolume(vol);
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div id="MusicPlayer" className="w-full max-w-2xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-2xl p-8 text-white shadow-2xl border border-slate-700/50">

      {/* Album Art Placeholder */}
      <div className="w-full h-48 bg-gradient-to-br from-violet-600 to-purple-900 rounded-xl mb-6 flex items-center justify-center shadow-lg">
        <span className="text-6xl">🎵</span>
      </div>

      {/* Track Info */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent truncate">
          {songName || title || "Select a song to play"}
        </h2>
        {currentSong?<p className="text-slate-400 text-sm">Now Playing</p>:<p>  </p>}
        
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={progress}
          onChange={handleSeek}
          className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500 hover:accent-violet-400 transition"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {/* Previous Song Button */}
        <button
          onClick={playPreviousSong}
          className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-200 hover:scale-110 active:scale-95"
          title="Previous song"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-skip-forward-icon -scale-x-100 lucide-skip-forward"><path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/></svg>

        </button>

        {/* Backward 10s Button */}
        <button
          onClick={() => {
            const audio = audioRef.current;
            if (audio) audio.currentTime = Math.max(audio.currentTime - 10, 0);
          }}
          className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-200 hover:scale-110 active:scale-95"
          title="Backward 10s"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-forward-icon -scale-x-100 lucide-forward"><path d="m15 17 5-5-5-5"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>
        </button>



        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="p-4 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 transition-all duration-200 hover:scale-110 active:scale-95 shadow-lg hover:shadow-violet-500/50"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
         {/* Forward 10s Button */}

        <button
          onClick={() => {
            const audio = audioRef.current;
            if (audio) audio.currentTime = Math.min(audio.currentTime + 10, duration);
          }}
          className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-200 hover:scale-110 active:scale-95"
          title="Forward 10s"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-forward-icon lucide-forward"><path d="m15 17 5-5-5-5"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>
        </button>
        {/* Next Song Button */}
        <button
          onClick={playNextSong}
          className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-200 hover:scale-110 active:scale-95"
          title="Next song"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-skip-forward-icon lucide-skip-forward"><path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/></svg>
        </button>

       

      </div>

      {/* Volume and Loop Control Row */}
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3 flex-1">
          <button
            onClick={() => setShowVolume(!showVolume)}
            className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 transition-all duration-200 text-slate-300 hover:text-white"
            title="Volume"
          >
            {volume > 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/><path d="M19.364 18.364a9 9 0 0 0 0-12.728"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-off-icon lucide-volume-off"><path d="M16 9a5 5 0 0 1 .95 2.293"/><path d="M19.364 5.636a9 9 0 0 1 1.889 9.96"/><path d="m2 2 20 20"/><path d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"/><path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686"/></svg>
            )}
          </button>

          <div className="flex items-center gap-2 flex-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolume}
              className="w-24 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-500 hover:accent-violet-400 transition"
            />
            <span className="text-xs text-slate-400 w-6 text-right">{Math.round(volume * 100)}%</span>
          </div>
        </div>

        {/* Loop/Next Mode Toggle Button */}
        <button
          onClick={toggleLoopMode}
          className={`p-2 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 ${loopMode === 'loop'
              ? 'bg-violet-600 hover:bg-violet-500 text-white'
              : 'bg-slate-700 hover:bg-slate-600 text-slate-400'
            }`}
          title={loopMode === 'loop' ? 'Loop: ON' : 'Loop: OFF'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-repeat-icon lucide-repeat"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>
        </button>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} crossOrigin="anonymous"></audio>
    </div>
  );
};

export default MusicPlayer;
