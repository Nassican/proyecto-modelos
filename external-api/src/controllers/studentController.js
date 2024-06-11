import { validateCodAlumno } from '../schemas/alumnoSchema.js'
import { sendError, sendSuccess } from '../utils/response.js'
import { ConnectionError } from '../utils/errors.js'
import { pdfParse } from '../utils/pdfParse.cjs'
import { reporteModel } from '../models/reporteModel.js'

export class StudentController {
  static COD_PERIODO = '150'

  static async getStudentByCode (req, res) {
    const { code } = req.params
    const { success } = validateCodAlumno(code)
    if (!success) return sendError({ res, code: 400, message: 'Incorrect code format' })

    try {
      const formData = new FormData()
      formData.append('cod_alumno', code)
      formData.append('reporte', StudentController.COD_PERIODO)

      const resReporte = await reporteModel.getReportePdf({ formData })
      const pdf = await pdfParse(resReporte)

      if (!pdf) return sendError({ res, code: 404, message: 'Student not found' })
      if (pdf.text.trim() === '') return sendError({ res, code: 404, message: 'Student not found' })

      const name = pdf.text.trim().split('\n')[1].split(/\d/)[0]

      return sendSuccess({ res, data: { code, name } })
    } catch (err) {
      if (err instanceof ConnectionError) {
        return sendError({ res, message: 'Connection error' })
      }
      return sendError({ res, message: 'Internal server error' })
    }
  }
}
