import { Router } from 'express'
import { studentRouter } from './studentRoutes.js'

export const v1Router = Router()

v1Router
  .use('/student', studentRouter)
