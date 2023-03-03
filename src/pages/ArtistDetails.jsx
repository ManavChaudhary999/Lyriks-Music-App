import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {DetailsHeader, Error, Loader, RelatedSongs} from "../components";

import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";

const ArtistDetails = () => {
    const {id: artistId} = useParams(); // Passed By Url Params
    const {activeSong, isPlaying} = useSelector(state => state.player);
    const {data: artistData, isFetching: isFetchingArtistDetails, error} = useGetArtistDetailsQuery(artistId);
    
    const artistUpdatedData = artistData?.data[0];
    console.log(artistUpdatedData);

    if(isFetchingArtistDetails) return <Loader title="Loading Artist Details..." />

    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistId} artistData={artistUpdatedData} />

            {/* <RelatedSongs data={Object.values(artistData?.songs)} artistId={artistId} isPlaying={isPlaying} activeSong={activeSong} /> */}
        </div>
    );
}

export default ArtistDetails;