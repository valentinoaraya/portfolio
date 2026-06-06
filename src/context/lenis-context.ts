import type Lenis from 'lenis'
import { createContext, type RefObject } from 'react'

export const LenisContext = createContext<RefObject<Lenis | null> | null>(null)
