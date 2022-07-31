import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { checkIfDataExpired } from "./App";

describe("App", () => {
  // test("checkIfDataExpired()", () => {
  //   render(<App />);
  //   const linkElement = screen.getByText(/learn react/i);
  //   expect(linkElement).toBeInTheDocument();
  // });

  it("checkIfDataExpired()", () => {
    let dataNow = new Date("2010-12-12T02:00:00.000Z");
    let dataToBeChecked = new Date("2050-12-12T02:00:00.000Z");

    expect(checkIfDataExpired(dataNow, dataToBeChecked)).toBeTruthy();

    dataNow = new Date("2020-12-12T02:00:00.000Z");
    dataToBeChecked = new Date("2010-12-12T02:00:00.000Z");

    expect(checkIfDataExpired(dataNow, dataToBeChecked)).not.toBeTruthy();
  });
});
