import { describe, it, expect } from "vitest";
import { addDays } from "./index";

describe("addDays()", () => {
  it("should add days to a date", () => {
    const date = new Date("2021-01-01");
    const result = addDays(date, 1);
    expect(result).toEqual(new Date("2021-01-02"));
  });
});