import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],            // Tutte le canzoni caricate dalle API
  likedSongs: [],       // Canzoni "Mi piace"
  currentSong: null,    // Canzone attualmente in riproduzione
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
    toggleLike: (state, action) => {
      const song = action.payload;
      if (state.likedSongs.some((likedSong) => likedSong.id === song.id)) {
        state.likedSongs = state.likedSongs.filter((likedSong) => likedSong.id !== song.id);
      } else {
        state.likedSongs.push(song);
      }
    },
  },
});

export const { setSongs, setCurrentSong, toggleLike } = musicSlice.actions;

export default musicSlice.reducer;