import { describe, it, expect, vi, beforeEach } from "vitest";
import { createClient } from "@supabase/supabase-js";

// Mock createClient
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    storage: {
      from: vi.fn(() => ({
        upload: vi.fn(),
        getPublicUrl: vi.fn(),
      })),
    },
  })),
}));

describe("Supabase Client", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      VITE_SUPABASE_URL: "https://test-url.supabase.co",
      VITE_SUPABASE_ANON_KEY: "test-anon-key",
    };
    // Necesario para que import.meta.env esté disponible
    vi.stubEnv("VITE_SUPABASE_URL", "https://test-url.supabase.co");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "test-anon-key");
  });

  it("initializes with correct environment variables", async () => {
    // Import supabase client after setting up the environment
    const { supabase } = await import("../supabase/supabaseClient");

    expect(createClient).toHaveBeenCalledWith(
      "https://test-url.supabase.co",
      "test-anon-key"
    );
  });

  it("handles missing environment variables gracefully", async () => {
    // Clear environment variables
    vi.stubEnv("VITE_SUPABASE_URL", undefined);
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", undefined);

    // Capture console error
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Import should still work but with undefined values
    const supabaseModule = await import("../supabase/supabaseClient");

    // We don't expect an error, just undefined values being passed
    expect(createClient).toHaveBeenCalledWith(undefined, undefined);

    consoleErrorSpy.mockRestore();
  });

  it("exports a supabase client instance", async () => {
    const { supabase } = await import("../supabase/supabaseClient");

    expect(supabase).toBeDefined();
    expect(supabase.storage).toBeDefined();
    expect(typeof supabase.storage.from).toBe("function");
  });
});
