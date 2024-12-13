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

  return (
    <div className="container-fluid fixed-bottom bg-container pt-2">
      <div className="row h-100">
        <div className="col-lg-10 offset-lg-2">
          <div className="row h-100 flex-column justify-content-center align-items-center">
            <div className="col-8 col-md-6 playerControls">
              <div className="d-flex justify-content-between align-items-center">
                {/* Shuffle Button */}
                <a href="#" className="player-button mx-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-shuffle" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"/>
                    <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/>
                  </svg>
                </a>

                {/* Previous Button */}
                <a href="#" onClick={handlePrevSong} className="player-button mx-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-rewind-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M7.729 5.055A.5.5 0 0 1 8 5.5v1.886l3.21-2.293A.5.5 0 0 1 12 5.5v5a.5.5 0 0 1-.79.407L8 8.614V10.5a.5.5 0 0 1-.79.407l-3.5-2.5a.5.5 0 0 1 0-.814l3.5-2.5a.5.5 0 0 1 .519-.038"/>
                  </svg>
                </a>

                {/* Play/Pause Button */}
                <a href="#" onClick={handlePlayPause} className="player-button mx-3">
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5m3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814z"/>
                    </svg>
                  )}
                </a>

                {/* Next Button */}
                <a href="#" onClick={handleNextSong} className="player-button mx-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-fast-forward-circle-fill" viewBox="0 0 16 16">
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407"/>
                  </svg>
                </a>

                {/* Repeat Button */}
                <a href="#" className="player-button mx-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="bi bi-repeat" viewBox="0 0 16 16">
                    <path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z"/>
                  </svg>
                </a>
              </div>
            </div>
            {/* Song Progress */}
            <div
              className="progress"
              style={{ cursor: 'pointer' }}
              onClick={handleProgressChange}
              ref={progressBarRef}
            >
              <div className="progress-bar" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;