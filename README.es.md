# idSV-js

[![codecov](https://codecov.io/gh/avalon-tech/idsv-js/graph/badge.svg?token=TUNXRWZ5W1)](https://codecov.io/gh/avalon-tech/idsv-js)

[This documentation is also available in English.](https://github.com/avalon-tech/idsv-js/blob/main/README.md)

## Introducción

idSV es una herramienta para la validación y formateo de números de identidad comunes en El Salvador, como el DUI y el NIT.

## Aviso importante

Desde el 17 de diciembre de 2021, los DUIs son NITs válidos para personas naturales, por lo que cualquier DUI es un NIT válido. Esto significa que puedes usar el mismo número para ambas validaciones en el contexto de una persona natural (es decir, una persona con un DUI).

Las entidades legales no se ven afectadas por este cambio, por lo que aún debes usar la validación de NIT para ellas.

También hay una opción para anular este comportamiento en la biblioteca cuando sea necesario.

## Instalación

Puedes instalar el paquete a través de npm:

```bash
npm install @avalontechsv/idsv
```

## Uso

### Validación

```javascript
import { isValidDUI, isValidNIT } from "@avalontechsv/idsv";

// Validar un DUI
// Los DUIs formateados correctamente, con o sin guiones o espacios al principio o al final, son válidos.
isValidDUI("12345678-4"); // true
isValidDUI("123456784"); // true
isValidDUI(" 12345678-4 "); // true

// También, la biblioteca completa con ceros a la izquierda si es más corto que 9 dígitos. Esto es útil para validar DUIs que se almacenan en una base de datos como enteros.
isValidDUI("18"); // true

// Los documentos formados solo por ceros no existen, así que nunca son válidos.
isValidDUI("00000000-0"); // false

// Validar un NIT
// Los DUIs y NITs formateados correctamente, con o sin guiones o espacios al principio o al final, son válidos.
isValidNIT("12345678-4"); // true
isValidNIT("1234-567890-123-0"); // true

// Los DUIs son NITs válidos por defecto, pero puedes anular este comportamiento pasando false como segundo parámetro.
isValidNIT("12345678-4", false); // false

// También, la biblioteca completa con ceros a la izquierda si es más corto que 14 dígitos. Esto es útil para validar NITs que se almacenan en una base de datos como enteros.
isValidNIT("115", false); // true
```

### Formateo

```javascript
import { formatDUI, formatNIT } from "@avalontechsv/idsv";

// Formatear un DUI
// Funciona de la misma manera que la validación, pero devuelve el DUI formateado.
formatDUI("12345678-4"); // '12345678-4'
formatDUI("123456784"); // '12345678-4'
formatDUI(" 12345678-4 "); // '12345678-4'
formatDUI("18"); // '00000001-8'

// Los DUI inválidos devuelven un error.
formatDUI("12345678-9"); // Error: Invalid DUI

// La entrada sin dígitos, como una cadena vacía, también devuelve un error.
formatDUI(""); // Error: Invalid DUI

// Formatear un NIT
// Funciona de la misma manera que la validación, pero devuelve el NIT formateado. Por defecto, los DUIs son NITs válidos, pero puedes anular este comportamiento pasando false como segundo parámetro.

formatNIT("00000001-8"); // '00000001-8' (DUI)
formatNIT("1234-567890-123-0"); // '1234-567890-123-0'
formatNIT(" 1234-567890-123-0 "); // '1234-567890-123-0'

formatNIT("00000001-8", false); // Devuelve un error porque '00000001-8' es un DUI válido, pero no un NIT válido.

// Los NIT inválidos devuelven un error.
formatNIT("1234-567890-123-1"); // Error: Invalid NIT
```

## Pruebas

Puedes ejecutar las pruebas con el siguiente comando:

```bash
npm run test
```

## Otros lenguajes

Esta biblioteca también está disponible en otros lenguajes:

- [PHP](https://github.com/avalon-tech/idSV) (instalable a través de Composer)

## Licencia

Este paquete es software de código abierto bajo la licencia [GNU General Public License v3.0](https://opensource.org/licenses/GPL-3.0).
