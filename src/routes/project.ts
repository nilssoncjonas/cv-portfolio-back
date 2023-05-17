import express from 'express'
import  { index, store, update } from '../controllers/project_controlles'
import { projectValidation } from '../validation/project_validation'
import {validateToken} from "../middlewares/auth/jws";
const router = express.Router()

/**
 * get
 */
router.get('/', index)

/**
 * post
 */
router.post('/', validateToken, projectValidation, store)

/**
 * patch /project/:projectId
 */
router.patch('/:projectId', validateToken, projectValidation, update)

export default router