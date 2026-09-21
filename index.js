import { isValidDUI, isValidNIT } from './dist/index.js';

let dui = '12345678-4';
let nit = '0999-999999-101-7';
let numericDui = 18;
let numericNit = 9999999991017;

console.log("isValidDUI('" + dui + "'): " + isValidDUI(dui));
console.log("isValidNIT('" + nit + "'): " + isValidNIT(nit));
console.log("isValidNIT('" + dui + "'): " + isValidNIT(dui));
console.log("isValidNIT('" + dui + "', false): " + isValidNIT(dui, false));

console.log("isValidDUI(" + numericDui + "): " + isValidDUI(numericDui));
console.log("isValidNIT(" + numericNit + "): " + isValidNIT(numericNit));