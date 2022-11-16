import {useNavigate} from "react-router-dom";

const ArtistCard = ({track}) => {
  const navigate = useNavigate();

  const artistName = track?.artists ? track.artists[0].alias : track?.subtitle;
  const artistId = track?.artists ? track.artists[0].adamid : null;

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={()=> artistId && navigate(`/artists/${artistId}`)}>
      <img src={track?.images?.background} alt="artist" className="w-full h-56 rounded-lg" />
      <h2 className="mt-4 font-semibold text-lg text-white">{artistName.toUpperCase().split('-').join(' ')}</h2>
    </div>
  )
};

export default ArtistCard;
