# idSV-js

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
import { validateDUI, validateNIT } from '@avalontechsv/idsv';

// Validar un DUI
// Los DUIs formateados correctamente, con o sin guiones o espacios al principio o al final, son válidos.
validateDUI('00000000-0'); // true
validateDUI('000000000'); // true
validateDUI(' 00000000-0 '); // true

// También, la biblioteca completa con ceros a la izquierda si es más corto que 9 dígitos. Esto es útil para validar DUIs que se almacenan en una base de datos como enteros.
validateDUI('00'); // true

// Validar un NIT
// Los DUIs y NITs formateados correctamente, con o sin guiones o espacios al principio o al final, son válidos.
validateNIT('00000000-0'); // true
validateNIT('0000-000000-000-0'); // true

// Los DUIs son NITs válidos por defecto, pero puedes anular este comportamiento pasando false como segundo parámetro.
validateNIT('00000000-0', false); // false

// También, la biblioteca completa con ceros a la izquierda si es más corto que 14 dígitos. Esto es útil para validar NITs que se almacenan en una base de datos como enteros.
validateNIT('00'); // true
```

### Formateo
```javascript
import { formatDUI, formatNIT } from '@avalontechsv/idsv';

// Formatear un DUI
// Funciona de la misma manera que la validación, pero devuelve el DUI formateado.
formatDUI('00000000-0'); // '00000000-0'
formatDUI('000000000'); // '00000000-0'
formatDUI(' 00000000-0 '); // '00000000-0'
formatDUI('00'); // '00000000-0'

// Los DUI inválidos devuelven un error.
formatDUI('00000000-1'); // Error: Invalid DUI

// Formatear un NIT
// Funciona de la misma manera que la validación, pero devuelve el NIT formateado. Por defecto, los DUIs son NITs válidos, pero puedes anular este comportamiento pasando false como segundo parámetro.

formatNIT('00000001-8'); // '00000001-8' (DUI)
formatNIT('0000-000000-000-0'); // '0000-000000-000-0'
formatNIT(' 0000-000000-000-0 '); // '0000-000000-000-0'

formatNIT('00000001-8', false); // Devuelve un error porque '00000001-8' es un DUI válido, pero no un NIT válido.

// Los NIT inválidos devuelven un error.
formatNIT('0000-000000-000-1'); // Error: Invalid NIT
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
