import Decimal from "decimal.js";

/**
 * Types accepted by {@link BigDecimal} helpers and arithmetic methods.
 */
export type BigDecimalLike = BigDecimal | Decimal | number | string;

/**
 * Immutable, chain‑friendly wrapper over **decimal.js** that preserves the
 * number of _casas decimais_ (scale) — e.g. `"145.00"` **stays** `"145.00"`.
 *
 * ```ts
 * const a = BigDecimal.from("145.00"); // scale = 2
 * a.toString();                         // "145.00"
 * a.plus("0.30").toString();           // "145.30" (scale = 2)
 * ```
 */
export class BigDecimal {
  /** Internal, immutable Decimal instance */
  private readonly value: Decimal;
  /** Number of digits to the right of the decimal point that we must preserve */
  private readonly scale: number;

  /* -------------------------------------------------------------------------- */
  /*                                CONSTRUCTOR                                */
  /* -------------------------------------------------------------------------- */
  constructor(input: BigDecimalLike = 0) {
    this.value = BigDecimal.coerce(input);
    this.scale = BigDecimal.extractScale(input);
  }

  /** Factory helper — same as `new BigDecimal(v)` but nicer for chaining */
  static from(v: BigDecimalLike): BigDecimal {
    return new BigDecimal(v);
  }

  /* -------------------------------------------------------------------------- */
  /*                                INTERNALS                                  */
  /* -------------------------------------------------------------------------- */
  private static coerce(v: BigDecimalLike): Decimal {
    if (v instanceof BigDecimal) return v.value;
    if (v instanceof Decimal) return v;
    if (typeof v === "number" || typeof v === "string") return new Decimal(v);
    throw new TypeError("Unsupported BigDecimalLike value");
  }

  /** Determines how many trailing decimal digits the **string** representation carries */
  private static extractScale(v: BigDecimalLike): number {
    if (v instanceof BigDecimal) return v.scale;

    if (typeof v === "string") {
      const match = v.match(/\.(\d*)(?:[eE][+-]?\d+)?$/);
      return match ? match[1].length : 0;
    }

    if (v instanceof Decimal) return v.decimalPlaces();

    if (typeof v === "number") {
      // For numbers we can lose trailing zeros (e.g. 145.00 -> 145) so rely on Decimal
      return new Decimal(v).decimalPlaces();
    }

    return 0;
  }

  /** Chooses the greater scale between two operands so we don’t lose precision */
  private static mergeScale(a: number, b: number): number {
    return Math.max(a, b);
  }

  /** Builds a new BigDecimal from a Decimal value and explicit scale */
  private static fromDecimal(value: Decimal, scale: number): BigDecimal {
    // Use toFixed so we materialise the exact trailing zeros desired
    return new BigDecimal(value.toFixed(scale));
  }

  /* -------------------------------------------------------------------------- */
  /*                              ARITHMETIC OPS                               */
  /* -------------------------------------------------------------------------- */
  plus(other: BigDecimalLike): BigDecimal {
    const result = this.value.plus(BigDecimal.coerce(other));
    const newScale = BigDecimal.mergeScale(this.scale, BigDecimal.extractScale(other));
    return BigDecimal.fromDecimal(result, newScale);
  }

  minus(other: BigDecimalLike): BigDecimal {
    const result = this.value.minus(BigDecimal.coerce(other));
    const newScale = BigDecimal.mergeScale(this.scale, BigDecimal.extractScale(other));
    return BigDecimal.fromDecimal(result, newScale);
  }

  times(other: BigDecimalLike): BigDecimal {
    const result = this.value.times(BigDecimal.coerce(other));
    const newScale = BigDecimal.mergeScale(this.scale, BigDecimal.extractScale(other));
    return BigDecimal.fromDecimal(result, newScale);
  }

  div(other: BigDecimalLike): BigDecimal {
    const divisor = BigDecimal.coerce(other);
    const result = this.value.div(divisor);
    // Division may increase precision — keep current scale or result's dp
    const newScale = BigDecimal.mergeScale(this.scale, result.decimalPlaces());
    return BigDecimal.fromDecimal(result, newScale);
  }

  mod(other: BigDecimalLike): BigDecimal {
    const result = this.value.mod(BigDecimal.coerce(other));
    const newScale = BigDecimal.mergeScale(this.scale, BigDecimal.extractScale(other));
    return BigDecimal.fromDecimal(result, newScale);
  }

  pow(exp: number): BigDecimal {
    const result = this.value.pow(exp);
    // When raising to a power we keep current scale (could be improved)
    return BigDecimal.fromDecimal(result, this.scale);
  }

  /* -------------------------------------------------------------------------- */
  /*                               COMPARISONS                                 */
  /* -------------------------------------------------------------------------- */
  eq(other: BigDecimalLike): boolean {
    return this.value.eq(BigDecimal.coerce(other));
  }

  gt(other: BigDecimalLike): boolean {
    return this.value.gt(BigDecimal.coerce(other));
  }

  gte(other: BigDecimalLike): boolean {
    return this.value.gte(BigDecimal.coerce(other));
  }

  lt(other: BigDecimalLike): boolean {
    return this.value.lt(BigDecimal.coerce(other));
  }

  lte(other: BigDecimalLike): boolean {
    return this.value.lte(BigDecimal.coerce(other));
  }

  /* -------------------------------------------------------------------------- */
  /*                               ROUNDING                                    */
  /* -------------------------------------------------------------------------- */
  /**
   * Returns a new {@link BigDecimal} rounded to `dp` decimal places, **updating**
   * its preserved scale.
   */
  round(dp = 0, mode: Decimal.Rounding = Decimal.ROUND_HALF_UP): BigDecimal {
    const result = this.value.toDecimalPlaces(dp, mode);
    return BigDecimal.fromDecimal(result, dp);
  }

  /* -------------------------------------------------------------------------- */
  /*                               CONVERSIONS                                 */
  /* -------------------------------------------------------------------------- */
  toNumber(): number {
    return this.value.toNumber();
  }

  /** String representation that always keeps trailing zeros as per `scale`. */
  toString(): string {
    return this.value.toFixed(this.scale);
  }

  /** Alias for {@link toString} so JSON.stringify() works nicely */
  toJSON(): string {
    return this.toString();
  }

  valueOf(): number {
    // Enables arithmetic with native ops, but beware precision loss!
    return this.toNumber();
  }
}