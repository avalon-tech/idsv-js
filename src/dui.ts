import { cleanDocument } from './utils';

/**
 * Validates a DUI (Documento Único de Identidad) in El Salvador.
 *
 * @param dui The DUI to validate.
 * @returns True if the DUI is valid, false otherwise.
 */
export const validator = (dui: string): boolean => {
    // DUI cannot be null
    if (dui === null) {
        return false;
    }

    // DUI cannot be empty
    if (dui === '') {
        return false;
    }

    dui = cleanDocument(dui);

    // DUI must be numeric
    if (isNaN(Number(dui))) {
        return false;
    }

    // Pad DUI with zeros if it's less than 9 digits
    if (dui.length < 9) {
        dui = dui.padStart(9, '0');
    }

    // DUI must be 9 digits
    if (dui.length !== 9) {
        return false;
    }

    // DUI must have a valid check digit
    const checkDigit: number = Number(dui[8]);

    const duiWithoutCheckDigit: string = dui.slice(0, 8);

    let sum: number = 0;

    for(let i: number = 0; i < duiWithoutCheckDigit.length; i++) {
        sum += Number(duiWithoutCheckDigit[i]) * (9 - i);
    }

    const expectedCheckDigit: number = 10 - (sum % 10);

    if(expectedCheckDigit === 10) {
        return checkDigit === 0;
    }

    return checkDigit === expectedCheckDigit;
}

/**
 * Formats a DUI (Documento Único de Identidad) in El Salvador.
 * 
 * @param unformatted The unformatted DUI to format.
 * @returns The formatted DUI.
 * @throws Error if the DUI is not valid.
 * @see validator
 * @see cleanDocument
 */
export const formatter = (unformatted: string): string => {
    unformatted = cleanDocument(unformatted);

    // Pad DUI with zeros if it's less than 9 digits
    if (unformatted.length < 9) {
        unformatted = unformatted.padStart(9, '0');
    }

    const validated: boolean = validator(unformatted);

    // Throw an exception if the DUI is not valid
    if (!validated) {
        throw new Error('Invalid DUI');
    }

    const formatted: string = `${unformatted.slice(0, 8)}-${unformatted[8]}`;

    return formatted;
}

export default {
    validator,
    formatter,
}