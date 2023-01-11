import { createBrowserRouter } from "react-router-dom";

import { FavoriteMoviesPage, MoviesPage } from "@/components";
import { MovieDetailsPage } from "@/components/Pages/MovieDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MoviesPage />,
  },
  {
    path: "/movies/favorites",
    element: <FavoriteMoviesPage />,
  },
  {
    path: "/movies/:movieId",
    element: <MovieDetailsPage />,
  },
]);
