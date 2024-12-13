import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong } from '../components/MusicSlice'; 

const Player = () => {
  const dispatch = useDispatch();
  const currentSong = useSelector((state) => state.music.currentSong);
  const likedSongs = useSelector((state) => state.music.likedSongs);
  
  // Stato per gestire la riproduzione
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [audio] = useState(new Audio(currentSong?.preview || ""));
  const progressBarRef = useRef(null);

  // Funzione per aggiornare il progresso
  const updateProgress = () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    setProgress((currentTime / duration) * 100);
  };

  // Funzione per iniziare a riprodurre la canzone
  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Funzione per gestire la navigazione tra le canzoni (Successiva / Precedente)
  const handleNextSong = () => {
    // Logica per la canzone successiva
  };

  const handlePrevSong = () => {
    // Logica per la canzone precedente
  };

  // Funzione per cambiare il progresso della canzone (cliccando sulla barra)
  const handleProgressChange = (event) => {
    const width = progressBarRef.current.clientWidth;
    const clickPosition = event.nativeEvent.offsetX;
    const newProgress = (clickPosition / width) * 100;
    audio.currentTime = (newProgress / 100) * audio.duration;
    setProgress(newProgress);
  };

  useEffect(() => {
    if (currentSong) {
      setProgress(0);
      setIsPlaying(false);
      audio.src = currentSong.preview;
    }
  }, [currentSong, audio]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
      };
    }
  }, [audio]);

  if (!currentSong) {
    return <div className="container-fluid fixed-bottom bg-container pt-1">No song selected</div>;
  }

  return (
    <div className="container-fluid fixed-bottom bg-container pt-2">
      <div className="row h-100">
        <div className="col-lg-10 offset-lg-2">
          <div className="row h-100 flex-column justify-content-center align-items-center">
            <div className="col-8 col-md-6 playerControls">
              <div className="d-flex justify-content-between align-items-center">
                <a href="#" className="player-button">
                  <img src="/assets/shuffle.png" alt="shuffle" />
                </a>
                <a href="#" onClick={handlePrevSong} className="player-button">
                  <img src="/assets/prev.png" alt="prev" />
                </a>
                <a href="#" onClick={handlePlayPause} className="player-button">
                  <img src={isPlaying ? "/assets/pause.png" : "/assets/play.png"} alt="play-pause" />
                </a>
                <a href="#" onClick={handleNextSong} className="player-button">
                  <img src="/assets/next.png" alt="next" />
                </a>
                <a href="#" className="player-button">
                  <img src="/assets/repeat.png" alt="repeat" />
                </a>
              </div>
              <div className="progress mt-3" ref={progressBarRef} onClick={handleProgressChange}>
                <div 
                  role="progressbar" 
                  aria-valuenow={progress} 
                  aria-valuemin="0" 
                  aria-valuemax="100" 
                  style={{ width: `${progress}%` }}
                  className="progress-bar-custom"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="song-info text-center">
        <h4>{currentSong.title}</h4>
        <p>{currentSong.artist?.name}</p>
      </div>
    </div>
  );
};

export default Player;