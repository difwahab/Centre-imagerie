import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Fusionne conditionnellement des classes CSS avec prise en charge de Tailwind CSS.
 * Utilise clsx pour gérer les conditions et tailwind-merge pour éviter les conflits.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}