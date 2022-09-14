import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithClient } from "./utils/testing/testing-utils";
import App from "./App";
import { server } from "./utils/testing/setupTests";
import { rest } from "msw";
import { createMemoryHistory } from "history";
import { BsApple } from "react-icons/bs";

beforeAll(() =>
  server.listen({
    onUnhandledRequest: "error",
  })
);
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("App", () => {
  it("bla", async () => {
    const view = renderWithClient(<App />);

    // expect(await screen.findByRole("")).toBeInTheDocument();
  });

  // it("renders logo and Korsol Text when request returned is 200 status and correct data", async () => {
  //   const view = renderWithClient(
  //     <Sidebar
  //       userId="test"
  //       activeMenu={true}
  //       setActiveMenu={() => {}}
  //       screenSize={1200}
  //     />
  //   );

  //   expect(await screen.findByText("Korsol")).toBeInTheDocument();
  //   expect(
  //     await screen.findByRole("img", {
  //       name: /korsol/i,
  //     })
  //   ).toBeInTheDocument();
  //   expect(
  //     await screen.findByRole("img", {
  //       name: /korsol/i,
  //     })
  //   ).toHaveAttribute(
  //     "src",
  //     "https://res.cloudinary.com/dn8l30dkf/image/upload/v1656488020/korsol-dashboard/korsol_logo_sx43pn.png"
  //   );
  // });

  // it("renders dashboard link", async () => {
  //   const view = renderWithClient(
  //     <Sidebar
  //       userId="test"
  //       activeMenu={true}
  //       setActiveMenu={() => {}}
  //       screenSize={1200}
  //     />
  //   );

  //   expect(
  //     await screen.findByRole("link", { name: "dashboard" })
  //   ).toHaveAttribute("href", "/dashboard");
  // });

  // it("renders closeMenu button", async () => {
  //   const closeButtonClicked = jest.fn();
  //   const user = userEvent.setup();

  //   const view = renderWithClient(
  //     <Sidebar
  //       userId="test"
  //       activeMenu={true}
  //       setActiveMenu={closeButtonClicked}
  //       screenSize={1200}
  //     />
  //   );

  //   expect(await screen.findByRole("button")).toBeInTheDocument();

  //   // await user.click(await screen.findByRole("button"));
  //   // expect(closeButtonClicked).toHaveBeenCalled();
  //   ////TODO: I have no idea how to test clicks/function triggering
  // });

  // it("renders menu main titles", async () => {
  //   const view = renderWithClient(
  //     <Sidebar
  //       userId="test"
  //       activeMenu={true}
  //       setActiveMenu={() => {}}
  //       screenSize={1200}
  //     />
  //   );

  //   expect(await screen.findByText("Słowniki")).toBeInTheDocument();
  //   expect(await screen.findByText("Monitoring")).toBeInTheDocument();
  // });

  // it("renders links with proper paths", async () => {
  //   const history = createMemoryHistory();
  //   history.push = jest.fn();

  //   const view = renderWithClient(
  //     <Sidebar
  //       userId="test"
  //       activeMenu={true}
  //       setActiveMenu={() => {}}
  //       screenSize={1200}
  //     />
  //   );

  //   expect(await screen.findByText("firmy")).toBeInTheDocument();
  //   expect(await screen.findByText("szklarnie")).toBeInTheDocument();
  //   expect(await screen.findByText("produkty")).toBeInTheDocument();
  //   expect(await screen.findByText("Calendar")).toBeInTheDocument();
  //   expect(await screen.findByText("Kanban")).toBeInTheDocument();

  //   expect(
  //     await screen.findByRole("link", { name: "companies" })
  //   ).toHaveAttribute("href", "/companies");
  //   expect(
  //     await screen.findByRole("link", { name: "greenhouses" })
  //   ).toHaveAttribute("href", "/greenhouses");
  //   expect(
  //     await screen.findByRole("link", { name: "products" })
  //   ).toHaveAttribute("href", "/products");
  //   expect(
  //     await screen.findByRole("link", { name: "varieties" })
  //   ).toHaveAttribute("href", "/varieties");
  //   expect(
  //     await screen.findByRole("link", { name: "field-access" })
  //   ).toHaveAttribute("href", "/field-access");
  //   expect(
  //     await screen.findByRole("link", { name: "calendar" })
  //   ).toHaveAttribute("href", "/calendar");
  //   expect(await screen.findByRole("link", { name: "kanban" })).toHaveAttribute(
  //     "href",
  //     "/kanban"
  //   );
  // });
});
