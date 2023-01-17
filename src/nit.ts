import { cleanDocument } from './utils';
import { validator as isValidDUI, formatter as formatDUI } from './dui'

/**
 * Validates a NIT (Número de Identificación Tributaria) in El Salvador.
 * Since DUIs are valid NITs, this function also validates DUIs using the isValidDUI function.
 * This behavior can be disabled by setting the allowDUI parameter to false.
 *
 * @param nit The NIT to validate.
 * @param allowDUI Whether to allow DUIs as valid NITs. Defaults to true.
 * @returns True if the NIT is valid, false otherwise.
 * @see isValidDUI
 **/
export const validator = (nit: string, allowDUI: boolean = true): boolean => {
    if(allowDUI && isValidDUI(nit)) {
        return true;
    }

    // NIT cannot be null
    if (nit === null) {
        return false;
    }

    // NIT cannot be empty
    if (nit === '') {
        return false;
    }

    nit = cleanDocument(nit);

    // NIT must be numeric
    if (isNaN(Number(nit))) {
        return false;
    }

    // Pad NIT with zeros if it's less than 14 digits
    if (nit.length < 14) {
        nit = nit.padStart(14, '0');
    }

    // NIT must be 14 digits
    if (nit.length !== 14) {
        return false;
    }

    let sum: number = 0;
    let calculatedCheckDigit: number = 0;
    let calculatedFactor: number = 0;

    // Validate if it's an old (<= 100) or new (>= 100) NIT
    if (Number(nit.slice(10, 13)) <= 100) { // Old routine
        for (let i: number = 1; i <= 13; i++) {
            sum += Number(nit[i - 1]) * (15 - i);
        }
        calculatedCheckDigit = sum % 11;
        if (calculatedCheckDigit === 10) {
            calculatedCheckDigit = 0;
        }
    } else { // New routine
        for (let i: number = 1; i <= 13; i++) {
            calculatedFactor = (3 + (6 * Math.floor(Math.abs((i + 4) / 6)))) - i;
            sum += Number(nit[i - 1]) * calculatedFactor;
        }
        calculatedCheckDigit = sum % 11;
        if (calculatedCheckDigit > 1) {
            calculatedCheckDigit = 11 - calculatedCheckDigit;
        } else {
            calculatedCheckDigit = 0;
        }
    }

    return Number(nit[13]) === calculatedCheckDigit;
}

export const formatter = (unformatted: string, allowDUI: boolean = true): string => {
    if(allowDUI && isValidDUI(unformatted)) {
        return formatDUI(unformatted);
    }

    unformatted = cleanDocument(unformatted);

    if (unformatted.length < 14) {
        unformatted = unformatted.padStart(14, '0');
    }

    const validated = validator(unformatted, false);

    if (!validated) {
        throw new Error('Invalid NIT');
    }

    const formatted: string = unformatted.slice(0, 4) + '-' + unformatted.slice(4, 10) + '-' + unformatted.slice(10, 13) + '-' + unformatted.slice(13, 14);

    return formatted;
}

export default {
    validator,
    formatter
}