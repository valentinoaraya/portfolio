import { useContext } from 'react'
import { LenisContext } from '../context/lenis-context'

export function useLenisRef() {
  const ref = useContext(LenisContext)
  if (!ref) {
    throw new Error('useLenisRef must be used within LenisProvider')
  }
  return ref
}
