import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const shazamApiKey = process.env.VITE_SHAZAM_CORE_RAPID_API_KEY;
// console.log(shazamApiKey);

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '558d74c58cmsh9de4668a14f7847p1d0a79jsn8441546a125c');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: ()=> '/charts/world'}),
        getSongDetails: builder.query({query: ({songid})=> `/tracks/details?track_id=${songid}`}),
        getRelatedSongs: builder.query({query: ({songid})=> `/tracks/related?track_id=${songid}`}),
        getArtistDetails: builder.query({query: (artistId)=> `/artists/details?artist_id=${artistId}`}),
        getSongsByCountry: builder.query({query: (countryCode) => `/charts/country?country_code=${countryCode}`}),
        getSongsByGenres: builder.query({query: (genre) => `/charts/genre-world?genre_code=${genre}`}),
        getSongsBySearch: builder.query({query: (searchTerm) => `/search/multi?search_type=SONGS&query=${searchTerm}`}),
    }),
});

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetRelatedSongsQuery,
    useGetArtistDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsByGenresQuery,
    useGetSongsBySearchQuery,
} = shazamCoreApi;