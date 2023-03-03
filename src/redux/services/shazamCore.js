import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '558d74c58cmsh9de4668a14f7847p1d0a79jsn8441546a125c');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({query: ()=> '/v1/charts/world'}),
        getSongDetails: builder.query({query: ({songid})=> `/v1/tracks/details?track_id=${songid}`}),
        getRelatedSongs: builder.query({query: ({songid})=> `/v1/tracks/related?track_id=${songid}`}),
        getArtistDetails: builder.query({query: (artistId)=> `/v2/artists/details?artist_id=${artistId}`}),
        getSongsByCountry: builder.query({query: (countryCode) => `/v1/charts/country?country_code=${countryCode}`}),
        getSongsByGenres: builder.query({query: (genre) => `/v1/charts/genre-world?genre_code=${genre}`}),
        getSongsBySearch: builder.query({query: (searchTerm) => `/v1/search/multi?search_type=SONGS&query=${searchTerm}`}),
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