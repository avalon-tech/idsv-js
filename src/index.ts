import { isValidDUI as isDui } from './dui'

export const isValidDUI = (dui: string): boolean => isDui(dui);

export default {
    isValidDUI,
};