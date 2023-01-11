import { createBrowserRouter } from "react-router-dom";

import { MoviesPage } from "@/components";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MoviesPage />,
  },
]);
