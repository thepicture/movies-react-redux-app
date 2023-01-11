import { RouterProvider, useRoutes } from "react-router-dom";

import { AppProvider } from "@/providers";
import { router } from "@/providers";

import "./App.css";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
