import { describe , it, expect } from "vitest";
import { BigDecimal } from "./index";

describe("BigDecimal", () => {
  it("should create a BigDecimal instance", () => {
    const bd = new BigDecimal("1000.1");
    expect(bd).toBeInstanceOf(BigDecimal);
    expect(bd.toString()).toBe("1000.1");
  });
});