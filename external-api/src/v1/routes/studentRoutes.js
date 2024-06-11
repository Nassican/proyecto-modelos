import { Router } from 'express'
import { StudentController } from '../../controllers/studentController.js'

export const studentRouter = Router()

studentRouter
  .get('/:code', StudentController.getStudentByCode)
