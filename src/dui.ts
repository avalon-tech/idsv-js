import { cleanDocument } from './utils';

/**
 * Validates a DUI (Documento Único de Identidad) in El Salvador.
 *
 * @param dui The DUI to validate.
 * @returns True if the DUI is valid, false otherwise.
 */
export const isValidDUI = (dui: string): boolean => {
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

export default {
    isValidDUI,
}