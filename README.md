# idSV-js

[![codecov](https://codecov.io/gh/avalon-tech/idsv-js/graph/badge.svg?token=TUNXRWZ5W1)](https://codecov.io/gh/avalon-tech/idsv-js)

[Esta documentación tambien está disponible en español.](https://github.com/avalon-tech/idsv-js/blob/main/README.es.md)

## Introduction

idSV is a tool for validation and formatting of common identity numbers in El Salvador, such as DUI and NIT.

## Important notice

Since December 17th, 2021, DUIs are valid NITs for natural persons, so any DUI is a valid NIT. This means that you can use the same number for both validations in the context of a natural person (i.e. a person with a DUI).

Legal entities are not affected by this change, so you should still use the NIT validation for them.

There is also an option to override this functionality in the library when required.

## Installation

You can install the package via npm:

```bash
npm install @avalontechsv/idsv
```

## Usage

### Validation

```javascript
import { isValidDUI, isValidNIT } from "@avalontechsv/idsv";

// Validate a DUI
// Properly formatted DUIs, with or without dashes or spaces at the beginning or end, are valid.
isValidDUI("12345678-4"); // true
isValidDUI("123456784"); // true
isValidDUI(" 12345678-4 "); // true

// Also, the library pads the DUI with zeros to the left if it's shorter than 9 digits. This is useful for validating DUIs that are stored in a database as integers.
isValidDUI("18"); // true

// Documents made only of zeros do not exist, so they are never valid.
isValidDUI("00000000-0"); // false

// Validate a NIT
// Properly formatted DUIs and NITs, with or without dashes or spaces at the beginning or end, are valid.
isValidNIT("12345678-4"); // true
isValidNIT("1234-567890-123-0"); // true

// DUIs are valid NITs by default, but you can override this behavior passing false as the second parameter.
isValidNIT("12345678-4", false); // false

// Also, the library pads the NIT with zeros to the left if it's shorter than 14 digits. This is useful for validating NITs that are stored in a database as integers.
isValidNIT("115", false); // true
```

### Formatting

```javascript
import { formatDUI, formatNIT } from "@avalontechsv/idsv";

// Format a DUI
// Same as validation, but it returns the formatted DUI instead of a boolean.
formatDUI("12345678-4"); // '12345678-4'
formatDUI("123456784"); // '12345678-4'
formatDUI(" 12345678-4 "); // '12345678-4'
formatDUI("18"); // '00000001-8'

// Invalid DUIs throw an error.
formatDUI("12345678-9"); // Error: Invalid DUI

// Input without digits, such as an empty string, also throws an error.
formatDUI(""); // Error: Invalid DUI

// Format a NIT
// Same as validation, but it returns the formatted NIT instead of a boolean. By default, valid DUIs are also valid NITs, but you can override this behavior passing false as the second parameter.

formatNIT("00000001-8"); // '00000001-8' (DUI)
formatNIT("1234-567890-123-0"); // '1234-567890-123-0'
formatNIT(" 1234-567890-123-0 "); // '1234-567890-123-0'

formatNIT("00000001-8", false); // Throws an error because '00000001-8' is a valid DUI but not a valid NIT.

// Invalid NITs throw an error.
formatNIT("1234-567890-123-1"); // Error: Invalid NIT
```

## Testing

You can run the tests with npm:

```bash
npm run test
```

## Other languages

This library is also available in other languages:

- [PHP](https://github.com/avalon-tech/idSV) (installable via Composer)

## License

This package is open-sourced software licensed under the [GNU General Public License v3.0](https://opensource.org/licenses/GPL-3.0).
