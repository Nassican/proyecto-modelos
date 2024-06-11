import { z } from 'zod'

const codAlumnoSchema = z.string().length(9).regex(/^\d+$/)

export function validateCodAlumno (codAlumno) {
  return codAlumnoSchema.safeParse(codAlumno)
}
