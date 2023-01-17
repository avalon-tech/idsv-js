import { isValidDUI, isValidNIT } from './dist/index.js';

let dui = '00000000-0';
let nit = '0614-070320-104-9';

console.log("isValidDUI('" + dui + "'): " + isValidDUI(dui));
console.log("isValidNIT('" + nit + "'): " + isValidNIT(nit));
console.log("isValidNIT('" + dui + "'): " + isValidNIT(dui));
console.log("isValidNIT('" + dui + "', false): " + isValidDUI(nit, false));