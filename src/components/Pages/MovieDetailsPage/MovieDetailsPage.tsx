import { useReducer } from "react";
import { useParams } from "react-router-dom";

import { CircularProgress, Typography } from "@mui/material";

import { useQuery } from "@tanstack/react-query";

import { Header } from "@/components";
import { MovieDetails } from "@/components";
import { ALWAYS_RERENDER } from "@/config";
import { axios, MovieAPI } from "@/lib";
import { VerboseMovieEntity } from "@/types";

export const MovieDetailsPage = () => {
  const { movieId } = useParams();

  const fetchMovie = async (): Promise<VerboseMovieEntity> =>
    (await axios.jsonp(`movie/${movieId}`)) as unknown as VerboseMovieEntity;

  const { data: movie, status } = useQuery({
    queryKey: ["movies", movieId],
    queryFn: fetchMovie,
  });

  const [_, forceRerender] = useReducer(ALWAYS_RERENDER, []);

  const handleFavoriteToggle = (movieId: number) => {
    MovieAPI.toggleMovieById(movieId);

    forceRerender();
  };

  return (
    <>
      <Header />
      {status === "loading" ? (
        <CircularProgress />
      ) : status === "error" ? (
        <Typography>Something went wrong. Reload the page</Typography>
      ) : (
        <MovieDetails movie={movie} onFavoriteToggle={handleFavoriteToggle} />
      )}
    </>
  );
};
