import { isValidDUI as isDui } from './dui'
import { isValidNIT as isNit } from './nit'

export const isValidDUI = (dui: string): boolean => isDui(dui)
export const isValidNIT = (nit: string, allowDUI: boolean = true): boolean => isNit(nit, allowDUI)

export default {
    isValidDUI,
    isValidNIT
}