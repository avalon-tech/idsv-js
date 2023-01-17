import { validator as isDui, formatter as formatDui } from './dui'
import { validator as isNit, formatter as formatNit } from './nit'

export const isValidDUI = (dui: string): boolean => isDui(dui)
export const formatDUI = (dui: string): string => formatDui(dui)
export const isValidNIT = (nit: string, allowDUI: boolean = true): boolean => isNit(nit, allowDUI)
export const formatNIT = (nit: string, allowDUI: boolean = true): string => formatNit(nit, allowDUI)

export default {
    isValidDUI,
    formatDUI,
    isValidNIT,
    formatNIT,
}