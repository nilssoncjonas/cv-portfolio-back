import express from 'express'
import  { index, store } from '../controllers/project_controlles'
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

export default router