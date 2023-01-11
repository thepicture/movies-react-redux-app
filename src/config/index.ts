export const API_KEY =
  (process.env.REACT_APP_API_KEY as string) ||
  "010af89e03e170a041013e41fc7b17f4";

export const BASE_URL = process.env.REACT_APP_BASE_URL as string;

export const ALWAYS_RERENDER = () => [];

export const FALLBACK_MOVIE_IMAGE_URL =
  "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg";
