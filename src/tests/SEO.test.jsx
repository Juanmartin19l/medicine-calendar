import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { SEO } from "../components/SEO";
import "@testing-library/jest-dom";

describe("SEO Component", () => {
  // Store the original state of document.head
  const originalDocHead = document.head.innerHTML;

  // Clean document.head after each test
  afterEach(() => {
    document.head.innerHTML = originalDocHead;
  });

  it("should update the document title", () => {
    render(<SEO title="Test Title" />);
    expect(document.title).toBe("Test Title");
  });

  it("should create meta description tag when provided", () => {
    render(<SEO description="This is a test description" />);
    const metaDescription = document.querySelector('meta[name="description"]');

    expect(metaDescription).not.toBeNull();
    expect(metaDescription.getAttribute("content")).toBe(
      "This is a test description"
    );
  });

  it("should create meta keywords tag when provided", () => {
    render(<SEO keywords="test, seo, keywords" />);
    const metaKeywords = document.querySelector('meta[name="keywords"]');

    expect(metaKeywords).not.toBeNull();
    expect(metaKeywords.getAttribute("content")).toBe("test, seo, keywords");
  });

  it("should create Open Graph meta tags when provided", () => {
    render(<SEO ogTitle="OG Test Title" ogDescription="OG Test Description" />);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );

    expect(ogTitle).not.toBeNull();
    expect(ogTitle.getAttribute("content")).toBe("OG Test Title");

    expect(ogDescription).not.toBeNull();
    expect(ogDescription.getAttribute("content")).toBe("OG Test Description");
  });

  it("should create canonical link when URL is provided", () => {
    render(<SEO canonical="https://example.com/page" />);
    const canonicalLink = document.querySelector('link[rel="canonical"]');

    expect(canonicalLink).not.toBeNull();
    expect(canonicalLink.getAttribute("href")).toBe("https://example.com/page");
  });

  it("should update existing meta tags instead of creating duplicates", () => {
    // First render with one value
    render(<SEO description="Description 1" />);

    // Then render with another value
    render(<SEO description="Description 2" />);

    // Verify there's only one meta description tag and it has the most recent value
    const metaDescriptions = document.querySelectorAll(
      'meta[name="description"]'
    );
    expect(metaDescriptions.length).toBe(1);
    expect(metaDescriptions[0].getAttribute("content")).toBe("Description 2");
  });

  it("should handle multiple props simultaneously", () => {
    render(
      <SEO
        title="Complete SEO Test"
        description="Testing all SEO properties"
        keywords="test, complete, seo"
        ogTitle="Complete OG Title"
        ogDescription="Complete OG Description"
        canonical="https://example.com/complete-test"
      />
    );

    expect(document.title).toBe("Complete SEO Test");
    expect(
      document.querySelector('meta[name="description"]').getAttribute("content")
    ).toBe("Testing all SEO properties");
    expect(
      document.querySelector('meta[name="keywords"]').getAttribute("content")
    ).toBe("test, complete, seo");
    expect(
      document
        .querySelector('meta[property="og:title"]')
        .getAttribute("content")
    ).toBe("Complete OG Title");
    expect(
      document
        .querySelector('meta[property="og:description"]')
        .getAttribute("content")
    ).toBe("Complete OG Description");
    expect(
      document.querySelector('link[rel="canonical"]').getAttribute("href")
    ).toBe("https://example.com/complete-test");
  });

  it("should not create meta elements when no props are provided", () => {
    const metaCountBefore = document.querySelectorAll("meta").length;

    render(<SEO />);

    const metaCountAfter = document.querySelectorAll("meta").length;
    expect(metaCountAfter).toBe(metaCountBefore);
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });
});
