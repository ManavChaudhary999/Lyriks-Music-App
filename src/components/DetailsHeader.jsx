import {Link} from "react-router-dom";

const DetailsHeader = ({artistId, artistData, songData}) => {
  const artistAttributes = artistData?.artists[artistId]?.attributes;
  
  return (
    <div className="flex flex-col relative w-full">
      
      {/* Gradien Box */}
      <div className="w-full bg-gradient-to-l from-transparent to-[#191624] sm:h-48 h-28" />
      
      {/* Artist Details Or Song Details */}
      <div className="absolute inset-0 flex items-center">
      
        {/* If ArtistId present then put its image with custom size by replacing with url params else put song image */}
        <img src={ artistId ? artistAttributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500') : songData?.images?.coverart } alt="art" className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black" />
      
        <div className="ml-5">
          {/* ArtistName Or Song Title */}
          <p className="font-bold text-white sm:text-3xl text-xl">{artistId ? artistAttributes?.name : songData?.title}</p>
          {/* Artist Title */}
          {!artistId && (
            <Link to={`/artists/${songData?.artists[0].adamid}`}>
              <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
            </Link>
          )}
          {/* Genre Name */}
          <p className="text-base text-gray-400 mt-2">
            {artistId ? artistAttributes?.genreNames[0] : songData?.genres?.primary}
          </p>

        </div>
      </div>
      
      <div className="w-full sm:h-44 h-24" />
    </div>
  )
};
export default DetailsHeader;
