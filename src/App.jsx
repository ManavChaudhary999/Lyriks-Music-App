import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts, HomePage } from './pages';

const url = process.env.NODE_ENV === 'production' ? 'lyrics-music-streaming.netlify.app' : '';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />
        <div className="px-1 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar">
          <div className="pb-40">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path={`${url}/Discover`} element={<Discover />} />
              <Route path={`${url}/top-artists`} element={<TopArtists />} />
              <Route path={`${url}/top-charts`} element={<TopCharts />} />
              <Route path={`${url}/around-you`} element={<AroundYou />} />
              <Route path={`${url}/artists/:id`} element={<ArtistDetails />} />
              <Route path={`${url}/songs/:songid`} element={<SongDetails />} />
              <Route path={`${url}/search/:searchTerm`} element={<Search />} />
            </Routes>
          </div>
        </div>
      </div>

      {activeSong?.title && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
