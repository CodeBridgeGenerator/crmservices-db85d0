import React from "react";
import { render, screen } from "@testing-library/react";

import NegotiationsCreateDialogComponent from "../NegotiationsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders negotiations create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <NegotiationsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("negotiations-create-dialog-component")).toBeInTheDocument();
});
