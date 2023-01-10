import React from "react";

import { MovieEntity } from "@/types";

export interface MovieProps {
  movie: MovieEntity;
}

export const Movie: React.FC<MovieProps> = ({ movie }) => {
  return <div>Movie {movie.id}</div>;
};
