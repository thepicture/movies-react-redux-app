import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "@/app";
import { fetchGenresAsync } from "@/features";

import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const container = document.getElementById("root")!;
const root = createRoot(container);

store.dispatch(fetchGenresAsync());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
