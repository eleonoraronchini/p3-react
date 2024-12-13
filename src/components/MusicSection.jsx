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
      <h2>{title}</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3 music-section">
        {data.map((song) => (
          <div key={song.id} className="col text-center">
            <img
              className="img-fluid"
              src={song.album?.cover_medium}
              alt={song.title}
              onClick={() => handleSongClick(song)}
            />
            <p>
              Track: "{song.title}"<br />
              Artist: {song.artist?.name}
              <button onClick={() => handleLikeClick(song)}>
                {likedSongs.some((likedSong) => likedSong.id === song.id) ? 'Unlike' : 'Like'}
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicSection;