import { describe, expect, it } from "vitest";
import { profile, projects } from "@/lib/portfolio-data";

describe("Truthful portfolio examples", () => {
  it("leaves contact destinations empty rather than inventing personal links", () => {
    expect(profile.email).toBe("");
    expect(profile.github).toBe("");
    expect(profile.linkedin).toBe("");
  });
  it("includes all five requested editable project examples", () => {
    expect(projects.map(project => project.kind)).toEqual(["portfolio", "tasks", "students", "shop", "campus"]);
  });
});