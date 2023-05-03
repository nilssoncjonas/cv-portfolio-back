import express from 'express'
import  { index, store } from '../controllers/project_controlles'
import { projectValidation } from '../validation/project_validation'
const router = express.Router()

/**
 * get
 */
router.get('/', index)

/**
 * post
 */
router.post('/', projectValidation, store)

export default router