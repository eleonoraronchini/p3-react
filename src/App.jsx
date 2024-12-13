import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './components/Sidebar';
import MusicSection from './components/MusicSection';
import Player from './components/Player';
import { useSelector } from 'react-redux';

const App = () => {
  const [rockData, setRockData] = useState([]);
  const [popData, setPopData] = useState([]);
  const [hipHopData, setHipHopData] = useState([]);
  const currentSong = useSelector((state) => state.music.currentSong); // Ottieni la canzone corrente dal Redux

  useEffect(() => {
    const fetchData = async (artistName, setter) => {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`
        );
        if (response.ok) {
          const { data } = await response.json();
          setter(data.slice(0, 4)); // Prendi solo i primi 4 risultati
        } else {
          throw new Error('Error fetching data');
        }
      } catch (err) {
        console.error('Error:', err);
      }
    };

    fetchData('queen', setRockData);
    fetchData('katyperry', setPopData);
    fetchData('eminem', setHipHopData);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 col-md-3 col-lg-2">
          <Sidebar />
        </div>

        <main className="col-12 col-md-9 offset-md-3 mainPage">
          <div className="row">
            <MusicSection title="Rock Classics" data={rockData} />
            <MusicSection title="Pop Culture" data={popData} />
            <MusicSection title="#HipHop" data={hipHopData} />
          </div>
        </main>
      </div>
      
      <Player currentSong={currentSong} /> {/* Passa la canzone corrente */}
    </div>
  );
};

export default App;