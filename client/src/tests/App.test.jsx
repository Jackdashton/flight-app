import { render, screen } from "@testing-library/react";
import App from "../App";
import { expect } from "vitest";

describe("App component", () => {
  it("should render without crashing", () => {
    render(<App />);
  });
  it("should find MorningFlights button", () => {
    render(<App />);
    const morningFlightsButton = screen.getByText(
      /How many of the flights depart in the morning (before 12 PM)?/
    );
    expect(morningFlightsButton).toBeTruthy();
  });
});
