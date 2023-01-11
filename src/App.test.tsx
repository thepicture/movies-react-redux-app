import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { render } from "@testing-library/react";

import { store } from "@/app";
import { AppProvider, router } from "@/providers";

import "./__mocks__/intersectionObserverStub";

test("renders header", () => {
  const { getByText } = render(
    <Provider store={store}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </Provider>
  );

  expect(
    getByText(/Popular Movies/i, { selector: "button" })
  ).toBeInTheDocument();
  expect(getByText(/Favorites/i, { selector: "button" })).toBeInTheDocument();
});
