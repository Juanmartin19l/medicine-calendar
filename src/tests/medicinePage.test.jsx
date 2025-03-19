import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MedicinePage from "../pages/MedicinePage";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

// Mock de componentes
vi.mock("../components/Header", () => ({
  Header: () => <div data-testid="header-component">Header Mock</div>,
}));

vi.mock("../components/Footer", () => ({
  Footer: () => <div data-testid="footer-component">Footer Mock</div>,
}));

vi.mock("../components/SEO", () => ({
  SEO: () => <div data-testid="seo-component">SEO Mock</div>,
}));

vi.mock("../components/shared/PageHeader", () => ({
  PageHeader: ({ title, subtitle }) => (
    <div data-testid="page-header-component">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  ),
}));

vi.mock("../components/medicine/SectionContainer", () => ({
  SectionContainer: ({ id, title, children }) => (
    <div data-testid={`section-${id}`}>
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

vi.mock("../components/medicine/MedicineForm", () => ({
  MedicineForm: ({ onSubmit }) => (
    <div data-testid="medicine-form">
      <button
        onClick={() =>
          onSubmit({
            name: "Test Medicine",
            interval: 8,
            duration: 7,
            startTime: new Date().toISOString(),
          })
        }
        data-testid="add-medicine-button"
      >
        Add Medicine
      </button>
    </div>
  ),
}));

vi.mock("../components/medicine/MedicineList", () => ({
  MedicineList: ({ medicines, onDelete }) => (
    <div data-testid="medicine-list">
      <div>Medicines Count: {medicines.length}</div>
      {medicines.map((med, index) => (
        <div key={index} data-testid={`medicine-item-${index}`}>
          {med.name}
          <button
            onClick={() => onDelete(index)}
            data-testid={`delete-medicine-${index}`}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../components/medicine/CalendarExport", () => ({
  Export: ({ medicines }) => (
    <div data-testid="calendar-export">
      <div>Exportable Medicines: {medicines.length}</div>
    </div>
  ),
}));

vi.mock("../components/medicine/InfoSection", () => ({
  InfoSection: () => <div data-testid="info-section">Info Section Mock</div>,
}));

vi.mock("../utils/calendarExporter", () => ({
  clearFileCache: vi.fn(),
}));

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    getAll: () => store,
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("MedicinePage Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders all main sections of the page", () => {
    render(
      <BrowserRouter>
        <MedicinePage />
      </BrowserRouter>
    );

    expect(screen.getByTestId("header-component")).toBeInTheDocument();
    expect(screen.getByTestId("footer-component")).toBeInTheDocument();
    expect(screen.getByTestId("seo-component")).toBeInTheDocument();
    expect(screen.getByTestId("page-header-component")).toBeInTheDocument();
    expect(screen.getByTestId("section-add-medication")).toBeInTheDocument();
    expect(screen.getByTestId("section-your-medications")).toBeInTheDocument();
    expect(screen.getByTestId("section-export-calendar")).toBeInTheDocument();
    expect(screen.getByTestId("info-section")).toBeInTheDocument();
  });

  it("loads medicines from localStorage on initial render", () => {
    // Setup localStorage with existing medicines
    const testMedicines = [
      {
        name: "Paracetamol",
        interval: 8,
        duration: 7,
        startTime: "2023-01-01T08:00:00.000Z",
      },
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(testMedicines));

    render(
      <BrowserRouter>
        <MedicinePage />
      </BrowserRouter>
    );

    expect(localStorage.getItem).toHaveBeenCalledWith("medicines");
    expect(screen.getByText("Medicines Count: 1")).toBeInTheDocument();
    expect(screen.getByText("Paracetamol")).toBeInTheDocument();
  });

  it("adds a new medicine when form is submitted", async () => {
    // Importar clearFileCache y restablecer el mock antes de la prueba
    const { clearFileCache } = await import("../utils/calendarExporter");

    render(
      <BrowserRouter>
        <MedicinePage />
      </BrowserRouter>
    );

    // Initially no medicines
    expect(screen.getByText("Medicines Count: 0")).toBeInTheDocument();

    // Add a medicine
    fireEvent.click(screen.getByTestId("add-medicine-button"));

    // Should update the list
    expect(screen.getByText("Medicines Count: 1")).toBeInTheDocument();
    expect(screen.getByText("Test Medicine")).toBeInTheDocument();

    // Should save to localStorage
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem.mock.calls[0][0]).toBe("medicines");

    // Should call clearFileCache
    await waitFor(() => {
      expect(clearFileCache).toHaveBeenCalled();
    });
  });

  it("deletes a medicine when delete button is clicked", async () => {
    // Importar clearFileCache y restablecer el mock antes de la prueba
    const { clearFileCache } = await import("../utils/calendarExporter");

    // Setup with one existing medicine
    const testMedicines = [
      {
        name: "Paracetamol",
        interval: 8,
        duration: 7,
        startTime: "2023-01-01T08:00:00.000Z",
      },
    ];
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(testMedicines));

    render(
      <BrowserRouter>
        <MedicinePage />
      </BrowserRouter>
    );

    // Initially one medicine
    expect(screen.getByText("Medicines Count: 1")).toBeInTheDocument();

    // Delete the medicine
    fireEvent.click(screen.getByTestId("delete-medicine-0"));

    // Should update the list
    expect(screen.getByText("Medicines Count: 0")).toBeInTheDocument();

    // Should save to localStorage
    expect(localStorage.setItem).toHaveBeenCalled();

    // Should call clearFileCache - usar waitFor para manejar posibles llamadas asíncronas
    await waitFor(() => {
      expect(clearFileCache).toHaveBeenCalled();
    });
  });

  it("handles localStorage errors gracefully", () => {
    // Mock localStorage.getItem to throw an error
    localStorage.getItem.mockImplementationOnce(() => {
      throw new Error("Storage error");
    });

    // Mock console.error
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <BrowserRouter>
        <MedicinePage />
      </BrowserRouter>
    );

    // Should default to empty array
    expect(screen.getByText("Medicines Count: 0")).toBeInTheDocument();

    // Mock localStorage.setItem to throw an error
    localStorage.setItem.mockImplementationOnce(() => {
      throw new Error("Storage error");
    });

    // Add a medicine
    fireEvent.click(screen.getByTestId("add-medicine-button"));

    // Should log the error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error saving data:",
      expect.any(Error)
    );

    consoleErrorSpy.mockRestore();
  });

  it("updates the export component when medicines change", () => {
    render(
      <BrowserRouter>
        <MedicinePage />
      </BrowserRouter>
    );

    // Initially no medicines to export
    expect(screen.getByText("Exportable Medicines: 0")).toBeInTheDocument();

    // Add a medicine
    fireEvent.click(screen.getByTestId("add-medicine-button"));

    // Export component should update
    expect(screen.getByText("Exportable Medicines: 1")).toBeInTheDocument();
  });
});
