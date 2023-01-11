import { MovieEntity } from "@/types";

export type ProductionCompany = {
  name: string;
  id: number;
  logoPath: string | null;
  originCountry: string;
};

export type ProductionCountry = {
  name: string;
};

export type SpokenLanguage = {
  name: string;
};

export type MovieEntityDetails = {
  belongsToCollection: any;
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  imdbId: string | null;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string | null;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  releaseDate: string;
  revenue: number;
  runtime: number | null;
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
};

export type VerboseMovieEntity = MovieEntity & MovieEntityDetails;
