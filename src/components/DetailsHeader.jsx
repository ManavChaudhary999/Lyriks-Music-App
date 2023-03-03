import {Link} from "react-router-dom";

const DetailsHeader = ({artistId, artistData, songData}) => {
  // const artistAttributes = artistData?.artists[artistId]?.attributes; // Depricated
  const artistAttributes = artistData?.attributes;
  const artistBioArr = `${artistAttributes?.artistBio}`.split('•');
  const artistAlbums = artistData?.views["full-albums"]?.data;
  
  return (
    <div className="flex flex-col relative w-full">
      
      <div className="relative">
        {/* Gradien Box */}
        <div className="w-full bg-gradient-to-l from-transparent to-[#191624] sm:h-48 h-28" />
        
        {/* Artist Cover Or Song Cover */}
        <div className="absolute sm:top-24 top-14 flex items-center">
        
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
      </div>
      
      <div className="w-full sm:h-44 h-24" />

      {/* Artist Bio */}
      {artistData &&
        <div>
          <h2 className="font-bold sm:text-3xl text-xl text-white text-left mb-5">Bio</h2>
          <ul>
          {artistBioArr?.map((bio, idx)=> (
            <li key={idx} className="text-lg text-gray-400 sm:mt-2 mt-5">
              {bio === 'undefined' ? "Nothing to Show" : bio}
            </li>
          ))}
          </ul>
        </div>
      }
      
      {/* Artist Albums */}
      {artistData &&
        <div className="sm:mt-12 mt-16">
          <h2 className="font-bold sm:text-3xl text-xl text-white text-left mb-5">Albums</h2>
          {artistAlbums.length === 0 && <p className="text-gray-400 text-lg">Nothing to Show</p>}
          <div className="flex sm:flex-row flex-col flex-wrap gap-8 content-center">
            {artistAlbums?.map(album => (
              <a key={album.id} className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer hover:bg-white/20" href={album?.attributes?.url} target="_blank">
                <img src={album?.attributes?.artwork?.url} alt="artist" className="w-full h-56 rounded-lg" />
                <h2 className="text-center mt-4 font-semibold text-lg text-white">{album?.attributes?.name}</h2>
              </a>
            ))}
          </div>
        </div>
      }

    </div>
  )
};
export default DetailsHeader;
