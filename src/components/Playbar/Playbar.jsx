
import { useContext, useEffect, useState } from 'react'
import styles from './PlayBar.module.scss'
import { AudioContext } from '../../context/AudioContext'
import secondsToMMSS from '../../utils/secontsToMMSS'
import { Pause, PlayArrow } from '@mui/icons-material'
import { IconButton, Slider } from '@mui/material'

const TimeControls = () => {
  const { audio, currentTrack, isPlaying } = useContext(AudioContext);

  const { duration } = currentTrack;

  const [currentTime, setCurrentTime] = useState(0);

  const formattedCurrentTime = secondsToMMSS(currentTime);

  const sliderCurrentTime = Math.round((currentTime / duration) * 100);

  const handleChangeCurrentTime = (_, value) => {

    const time = Math.round((value / 100) * duration);

    setCurrentTime(time);
    audio.currentTime = time;
  };

  useEffect(() => {
    const timeInterval = setInterval(() => {
      console.log(currentTime);
      setCurrentTime(audio.currentTime);
    }, 1000);

    if(!isPlaying){
      clearInterval(timeInterval);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [isPlaying]);

  return (
    <>
      <p>{formattedCurrentTime}</p>
      <Slider
        step={1}
        min={0}
        max={100}
        value={sliderCurrentTime}
        onChange={handleChangeCurrentTime}
      />
    </>
  );
};

const Playbar = () => {
  const {
    currentTrack,
    handleToggleAudio,
    isPlaying
  } = useContext(AudioContext)

  if(!currentTrack) return null

  const {title, artists, preview, duration} = currentTrack

  const formattedDuration = secondsToMMSS(duration);

  return (
    <div className={styles.playbar}>
      <img className={styles.preview} src={preview} alt="" />
      <IconButton onClick={() => handleToggleAudio(currentTrack)}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </IconButton>
      <div className={styles.credits}>
        <h4>{title}</h4>
        <p>{artists}</p>
      </div>
      <div className={styles.slider}>
        <TimeControls />
        <p>{formattedDuration}</p>
      </div>
    </div>
  );
}

export default Playbar