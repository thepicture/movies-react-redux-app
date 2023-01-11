import { createBrowserRouter } from "react-router-dom";

import { FavoriteMoviesPage, MoviesPage } from "@/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MoviesPage />,
  },
  {
    path: "/movies/favorites",
    element: <FavoriteMoviesPage />,
  },
]);
