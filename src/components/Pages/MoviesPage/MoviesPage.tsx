import { useReducer, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { CircularProgress, Typography } from "@mui/material";

import { useInfiniteQuery } from "@tanstack/react-query";

import { Header, MovieList } from "@/components";
import { ALWAYS_RERENDER } from "@/config";
import { axios } from "@/lib";
import { MovieAPI } from "@/lib";
import { PopularMoviesResponse } from "@/types";

export const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleFavoriteToggle = (movieId: number) => {
    MovieAPI.toggleMovieById(movieId);

    forceRerender();
  };

  const [_, forceRerender] = useReducer(ALWAYS_RERENDER, []);

  const fetchPopularMovies = async ({ pageParam = 1 }) => {
    const endpoint = searchQuery.length > 0 ? "search/movie" : "movie/popular";

    const response: PopularMoviesResponse = await axios.jsonp(endpoint, {
      params: {
        page: pageParam,
        query: searchQuery.toLowerCase(),
      },
    });

    return response;
  };

  const queryKey =
    searchQuery.length > 0 ? ["movies", searchQuery.toLowerCase()] : ["movies"];

  const {
    data,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey,
    queryFn: fetchPopularMovies,
    getNextPageParam: (lastPage) => lastPage.page + 1,
  });

  const [scrollObserverRef] = useInfiniteScroll({
    loading: isFetching && !isFetchingNextPage,
    hasNextPage: !!hasNextPage,
    onLoadMore: fetchNextPage,
    disabled: !!error,
  });

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);

    refetch();
  };

  const movies = data?.pages.map((group) => group.results).flat() || [];

  return (
    <>
      <Header onSearchQuery={handleSearchQuery} />
      <>
        {status === "loading" ? (
          <CircularProgress />
        ) : status === "error" ? (
          <p>Error</p>
        ) : movies.length > 0 ? (
          <MovieList onFavoriteToggle={handleFavoriteToggle} movies={movies} />
        ) : (
          <Typography>Nothing has found. Try to change your query</Typography>
        )}
      </>
      <div ref={scrollObserverRef} />
    </>
  );
};
