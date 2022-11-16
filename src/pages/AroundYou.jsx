import {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";

import {Error, Loader, SongCard} from "../components";
import {useGetSongsByCountryQuery} from "../redux/services/shazamCore";

const AroundYou = () => {
    const [country, setCountry] = useState('');
    const [loading, setLoading] = useState(true);
    const {activeSong, isPlaying} = useSelector(state => state.player);
    const {data, isFetching, error} = useGetSongsByCountryQuery(country);

    // Getting User Country using geoipify api
    useEffect(() => {
        axios.get('https://geo.ipify.org/api/v2/country?apiKey=at_ZfjbnMedhFxIxONtaJIx6A4KDGAfa')
        .then(res => setCountry(res?.data?.location?.country))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }, [country]);

    if(isFetching || loading) return <Loader title="Loading Songs Around You..." />

    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">AroundYou <span className="font-black">{country}</span></h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.map((song, idx) => (
                    <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} idx={idx} data={data} />
                ))}
            </div>
        </div>
    )
}

export default AroundYou;
