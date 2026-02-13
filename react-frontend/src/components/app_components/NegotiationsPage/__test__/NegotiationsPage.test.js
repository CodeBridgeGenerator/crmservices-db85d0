import React from "react";
import { render, screen } from "@testing-library/react";

import NegotiationsPage from "../NegotiationsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders negotiations page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NegotiationsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("negotiations-datatable")).toBeInTheDocument();
  expect(screen.getByRole("negotiations-add-button")).toBeInTheDocument();
});
