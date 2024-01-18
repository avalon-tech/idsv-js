import { cleanDocument } from "./utils";

/**
 * Validates a DUI (Documento Único de Identidad) in El Salvador.
 *
 * @param dui The DUI to validate.
 * @returns True if the DUI is valid, false otherwise.
 */
export const validator = (dui: string | number): boolean => {
  if (typeof dui === "number") {
    dui = dui.toString();
  }

  if (dui.length === 0) {
    return false;
  }

  dui = cleanDocument(dui);

  if (!dui) {
    return false;
  }

  // Pad DUI with zeros if it's less than 9 digits
  if (dui.length < 9) {
    dui = dui.padStart(9, "0");
  }

  // DUI must be 9 digits
  if (dui.length !== 9) {
    return false;
  }

  // DUI must have a valid check digit
  const checkDigit: number = Number(dui[8]);

  const duiWithoutCheckDigit: string = dui.slice(0, 8);

  let sum: number = 0;

  for (let i: number = 0; i < duiWithoutCheckDigit.length; i++) {
    sum += Number(duiWithoutCheckDigit[i]) * (9 - i);
  }

  const expectedCheckDigit: number = 10 - (sum % 10);

  if (expectedCheckDigit === 10) {
    return checkDigit === 0;
  }

  return checkDigit === expectedCheckDigit;
};

/**
 * Formats a DUI (Documento Único de Identidad) in El Salvador.
 *
 * @param unformatted The unformatted DUI to format.
 * @returns The formatted DUI.
 * @throws Error if the DUI is not valid.
 * @see validator
 * @see cleanDocument
 */
export const formatter = (unformatted: string | number): string => {
  // If DUI is a string, clean it
  if (typeof unformatted === "string") {
    unformatted = cleanDocument(unformatted);
  } else {
    unformatted = unformatted.toString();
  }

  // From this point on, unformatted is a string, so we can safely use string methods.

  // Pad DUI with zeros if it's less than 9 digits
  if (unformatted.length < 9) {
    unformatted = unformatted.padStart(9, "0");
  }

  const validated: boolean = validator(unformatted);

  // Throw an exception if the DUI is not valid
  if (!validated) {
    throw new Error("Invalid DUI");
  }

  const formatted: string = `${unformatted.slice(0, 8)}-${unformatted[8]}`;

  return formatted;
};

export default {
  validator,
  formatter,
};
