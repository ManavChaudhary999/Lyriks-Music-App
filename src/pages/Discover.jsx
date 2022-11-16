import {useDispatch, useSelector} from "react-redux";

import {Error, Loader, SongCard} from "../components"
import {genres} from "../assets/constants";

import {selectGenreListId} from "../redux/features/playerSlice";
import {useGetSongsByGenresQuery} from "../redux/services/shazamCore";

const Discover = () => {
    const dispatch = useDispatch();
    const {activeSong, isPlaying, genreListId} = useSelector((state) => state.player);
    const {data, isFetching, error} = useGetSongsByGenresQuery(genreListId || 'POP');

    const genreTitle = genres.find(({value}) => value === genreListId)?.title;
    
    const handleSelectChange = (e) => {
        const genre = e.target.value;
        dispatch(selectGenreListId(genre));
    };

    // ************ Rendering **************
    if(isFetching) return <Loader title="Loading songs..." />
    
    if(error) return <Error />
    
    return(
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white text-left sm:mt-2">
                    Discover {genreTitle}
                </h2>
                <select onChange={handleSelectChange} value={genreListId || 'pop'} className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none mt-5">
                    {genres.map(genre => <option key={genre.value} value={genre.value}>{genre.title}</option>)}
                </select>
            </div>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, idx) => (
                    <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} idx={idx} data={data} />
                    ))}
            </div>
        </div>
    );
}

export default Discover;
