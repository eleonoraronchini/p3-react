import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, toggleLike } from '../components/MusicSlice';

const MusicSection = ({ title, data }) => {
  const dispatch = useDispatch();
  const likedSongs = useSelector((state) => state.music.likedSongs);

  const handleSongClick = (song) => {
    dispatch(setCurrentSong(song));
  };

  const handleLikeClick = (song) => {
    dispatch(toggleLike(song));
  };

  return (
    <div className="col-10">
      <h2 style={{ color: 'white' }}>{title}</h2> 
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3 music-section">
        {data.map((song) => (
          <div key={song.id} className="col text-center">
            <img
              className="img-fluid"
              src={song.album?.cover_medium}
              alt={song.title}
              onClick={() => handleSongClick(song)}
            />
            <p style={{ color: 'white' }}> 
               "{song.title}"<br />
                {song.artist?.name}
              <button
                onClick={() => handleLikeClick(song)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center', 
                  justifyContent: 'center', 
                }}
              >
                {likedSongs.some((likedSong) => likedSong.id === song.id) ? (
                  // Icona cuore pieno per "like"
                <div className='px-2'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="white"
                    className="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                    style={{ marginRight: '8px' }} 
                  >
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                  </svg>
                  </div>
                ) : (
                  // Icona cuore vuoto per "unlike"
                  <div className='px-2'>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="white"
                    className="bi bi-heart"
                    viewBox="0 0 16 16"
                    style={{ marginRight: '8px' }} 
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                  </svg>
                  </div>
                )}
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicSection;