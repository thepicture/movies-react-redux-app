import React from "react";
/// @ts-ignore
import Flip from "react-reveal/Flip";

import { Grid } from "@mui/material";

import { Movie } from "@/components";
import { MovieEntity } from "@/types";

export interface MovieListProps {
  movies: MovieEntity[];
  onFavoriteToggle: (movieId: number) => void;
}

export const MovieList: React.FC<MovieListProps> = ({
  movies,
  onFavoriteToggle,
}) => {
  return (
    <Grid container>
      {movies.map((movie: MovieEntity) => {
        return (
          <Grid key={movie.id} item xs={12} sm={6} md={4} p={2}>
            <Flip left height="100%">
              <Movie
                movie={movie}
                onFavoriteToggle={() => onFavoriteToggle(movie.id)}
              />
            </Flip>
          </Grid>
        );
      })}
    </Grid>
  );
};
