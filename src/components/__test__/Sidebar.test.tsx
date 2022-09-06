import React from "react";
import { screen } from "@testing-library/react";
import { renderWithClient } from "../../utils/testing/testing-utils";
import Sidebar from "../Sidebar";
import { server } from "../../utils/testing/setupTests";

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());

describe("Sidebar", () => {
  it("reanders (loading sidebar data...) text when loading ", async () => {
    const view = renderWithClient(
      <Sidebar
        userId="test"
        activeMenu={true}
        setActiveMenu={() => {}}
        screenSize={1200}
      />
    );

    await view.findByRole("");

    // expect(screen.getByText("loading sidebar data...")).toBeInTheDocument();
  });
});
