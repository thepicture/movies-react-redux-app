import { createBrowserRouter } from "react-router-dom";

import { PopularMovies } from "@/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PopularMovies />,
  },
]);
