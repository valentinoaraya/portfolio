import Lenis from 'lenis'
import { useEffect, useRef, type ReactNode } from 'react'
import { LenisContext } from './lenis-context'

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('lenis', 'lenis-smooth')

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    })

    lenisRef.current = instance

    return () => {
      root.classList.remove('lenis', 'lenis-smooth')
      instance.destroy()
      lenisRef.current = null
    }
  }, [])

  return (
    <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
  )
}
