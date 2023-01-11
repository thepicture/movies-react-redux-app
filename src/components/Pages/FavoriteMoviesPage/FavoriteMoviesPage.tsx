import { useReducer, useState } from "react";

import { CircularProgress } from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import { Header, MovieList } from "@/components";
import { ALWAYS_RERENDER } from "@/config";
import { MovieAPI, queryClient } from "@/lib";
import { axios } from "@/lib";
import { VerboseMovieEntity } from "@/types";

export const FavoriteMoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleFavoriteToggle = (movieId: number) => {
    MovieAPI.toggleMovieById(movieId);

    queryClient.invalidateQueries({ queryKey: ["movies", "favorites"] });

    forceRerender();
  };

  const [_, forceRerender] = useReducer(ALWAYS_RERENDER, []);

  const fetchFavoriteMovies = async (): Promise<VerboseMovieEntity[]> => {
    return (
      await Promise.all(
        MovieAPI.getFavoriteMovieIds().map(
          (movieId) =>
            axios.jsonp(`movie/${movieId}`) as unknown as VerboseMovieEntity
        )
      )
    ).filter(
      (movie) =>
        searchQuery.length === 0 ||
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const queryKey =
    searchQuery.length > 0
      ? ["movies", "favorites", searchQuery.toLowerCase()]
      : ["movies", "favorites"];

  const { data, status, refetch } = useQuery({
    queryKey,
    queryFn: fetchFavoriteMovies,
  });

  const handleSearchQuery = (query: string) => {
    setSearchQuery(query);

    refetch();
  };

  return (
    <>
      <Header onSearchQuery={handleSearchQuery} />
      <>
        {status === "loading" ? (
          <CircularProgress />
        ) : status === "error" ? (
          <p>Error</p>
        ) : (
          <MovieList onFavoriteToggle={handleFavoriteToggle} movies={data} />
        )}
      </>
    </>
  );
};
