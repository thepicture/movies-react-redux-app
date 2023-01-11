import { MovieEntity } from "@/types";

export type MovieEntityDetails = {
  genres: { id: number; name: string }[];
};

export type VerboseMovieEntity = MovieEntity & MovieEntityDetails;
