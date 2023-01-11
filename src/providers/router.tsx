import { createBrowserRouter } from "react-router-dom";

import { FavoriteMoviesPage, MoviesPage, NotFoundPage } from "@/components";
import { MovieDetailsPage } from "@/components";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MoviesPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/movies/favorites",
      element: <FavoriteMoviesPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "/movies/:movieId",
      element: <MovieDetailsPage />,
      errorElement: <NotFoundPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
      errorElement: <NotFoundPage />,
    },
  ],
  { basename: "/movies-react-redux-app" }
);
