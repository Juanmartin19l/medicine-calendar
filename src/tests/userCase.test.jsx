import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { UserCases } from "../components/about/UserCases";
import "@testing-library/jest-dom";

// Mock for child components and framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    section: ({ children, ...props }) => (
      <section data-testid="motion-section" {...props}>
        {children}
      </section>
    ),
  },
}));

vi.mock("../components/about/SectionTitle", () => ({
  SectionTitle: ({ title }) => <h2 data-testid="section-title">{title}</h2>,
}));

vi.mock("../components/about/UserCase", () => ({
  UserCase: ({ icon, color, title, description }) => (
    <div data-testid={`user-case-${title}`} className={`color-${color}`}>
      <div data-testid="user-case-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  ),
}));

describe("UserCases Component", () => {
  it("renders the section title correctly", () => {
    render(<UserCases />);

    expect(screen.getByTestId("section-title")).toHaveTextContent(
      "Who Benefits from Medicine Calendar"
    );
  });

  it("renders all user cases with correct data", () => {
    render(<UserCases />);

    // Verify that all 4 user cases are rendered
    expect(
      screen.getByTestId("user-case-Individuals with Chronic Conditions")
    ).toBeInTheDocument();
    expect(screen.getByTestId("user-case-Caregivers")).toBeInTheDocument();
    expect(
      screen.getByTestId("user-case-Busy Professionals")
    ).toBeInTheDocument();
    expect(screen.getByTestId("user-case-Senior Citizens")).toBeInTheDocument();
  });

  it("passes the correct color prop to each user case", () => {
    render(<UserCases />);

    // Verify colors
    expect(
      screen.getByTestId("user-case-Individuals with Chronic Conditions")
    ).toHaveClass("color-blue");
    expect(screen.getByTestId("user-case-Caregivers")).toHaveClass(
      "color-purple"
    );
    expect(screen.getByTestId("user-case-Busy Professionals")).toHaveClass(
      "color-green"
    );
    expect(screen.getByTestId("user-case-Senior Citizens")).toHaveClass(
      "color-blue"
    );
  });

  it("renders proper descriptions for each user case", () => {
    render(<UserCases />);

    // Verify descriptions
    expect(
      screen.getByText(/People managing ongoing health conditions/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Those caring for loved ones/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/When life gets hectic/i)).toBeInTheDocument();
    expect(
      screen.getByText(/With an interface designed for clarity/i)
    ).toBeInTheDocument();
  });

  it("renders all required icons", () => {
    render(<UserCases />);

    // Verify users icons
    const icons = screen.getAllByTestId("user-case-icon");
    expect(icons.length).toBe(4);
  });

  it("wraps user cases in a responsive grid", () => {
    const { container } = render(<UserCases />);

    // Verify grid container
    const gridElement = container.querySelector(".grid");
    expect(gridElement).toBeInTheDocument();
    expect(gridElement.className).toContain("md:grid-cols-2");
  });
});
