import {useEffect, useRef} from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

// Swiper
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode} from "swiper";
import "swiper/css";
import "swiper/css/free-mode";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong} from "../redux/features/playerSlice"; 
import {useGetTopChartsQuery} from "../redux/services/shazamCore";

const TopChartCard = ({song, idx, isPlaying, activeSong, handlePauseClick, handlePlayClick}) => (
  <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 rounded-lg cursor-pointer mb-2">
    
    <h3 className="font-bold text-base text-white mr-3 pl-2">{idx+1}.</h3>
    
    <div className="flex flex-1 flex-row justify-between items-center">
      <img src={song?.images?.coverart} alt={song?.title} className="w-20 h-20 rounded-lg" />
      <div className="flex flex-1 flex-col justify-center mx-3">
        <Link to={`/songs/${song?.key}`}>
          <p className="text-xl font-bold text-white">{song?.title}</p>
        </Link>
        <Link to={`/artists/${song?.artists[0].adamid}`}>
          <p className="text-ase text-gray-300 mt-1">{song?.subtitle}</p>
        </Link>
      </div>
    </div>

    <div className="pr-2">
      
    <PlayPause isPlaying={isPlaying} activeSong={activeSong} song={song} handlePause={handlePauseClick} handlePlay={handlePlayClick} />
    </div>
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const {activeSong, isPlaying} = useSelector(state => state.player);
  const {data} = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    // divRef.current.scrollIntoView({behavior: 'smooth'});
  });

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };
  
  const handlePlayClick = (song, idx) => {
    dispatch(setActiveSong({song, data, idx}));
    dispatch(playPause(true));  
  };

  return (
    <div ref={divRef} className="flex flex-1 flex-col xl:ml-6 ml-0 xl:mb-0 mb-6 mt-6 xl:max-w-[500px] max-w-full">

      {/* Top Charts Section */}
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">TopCharts</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor">See more</p>
          </Link>
        </div>

        <div className="flex flex-col mt-4 gap-1">
          {topPlays?.map((song, idx) => (
            <TopChartCard key={song.key} song={song} idx={idx} isPlaying={isPlaying} activeSong={activeSong} handlePauseClick={handlePauseClick} handlePlayClick={() => handlePlayClick(song, idx)} />
            ))}
        </div>
      </div>
      
      {/* Top Artists Section */}
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
            <h2 className="text-white font-bold text-2xl">TopArtists</h2>
            <Link to="/top-artists">
              <p className="text-gray-300 text-base cursor">See more</p>
            </Link>
          </div>

          <Swiper slidesPerView="auto" spaceBetween={15} freeMode centeredSlides centeredSlidesBounds className="mt-4" >
            {topPlays?.map((song, idx) => (
              <SwiperSlide key={song?.key} style={{width: '25%', height: 'auto'}} className="shadow-lg rounded-full animate-slider" >
                <Link to={`/artists/${song?.artists[0].adamid}`}>
                  <img src={song?.images.background} alt="name" className="rounded-full w-full object-cover" />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
      </div>

    </div>
  )
};

export default TopPlay;
