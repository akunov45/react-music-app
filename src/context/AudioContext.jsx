import { createContext, useState } from 'react';


export const AudioContext = createContext({});

const audio = new Audio();


const AudioProvider = ({ children }) => {

  const [currentTrack, setCurrentTrack] = useState();
  const [isPlaying, setIsPlaying] = useState(false)

  const handleToggleAudio = (track) => {
    if (currentTrack?.id !== track?.id) {
      setCurrentTrack(track)
      setIsPlaying(true)
      audio.src = track.src
      audio.currentTime = 0
      audio.play();
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  }

  const contextValue = {
    audio,
    currentTrack,
    isPlaying,
    handleToggleAudio,
    setCurrentTrack,
    setIsPlaying
  }

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
};

export default AudioProvider;