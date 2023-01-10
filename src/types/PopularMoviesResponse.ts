import { MovieEntity } from "./MovieEntity";

export type PopularMoviesResponse = {
  page: number;
  results: MovieEntity[];
  totalPages: number;
  totalResults: number;
};
