import ms, { StringValue } from "ms";

export type MillisecondsInputStringValue = StringValue

export const toMilliseconds = (value: MillisecondsInputStringValue) => {
  return ms(value);
};