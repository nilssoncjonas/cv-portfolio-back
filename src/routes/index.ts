import express from "express"
import project from  './project'
import { login, refresh, register } from '../controllers/user_controller'
import { userValidation } from "../validation/user_validation"
// instantiate a new router
const router = express.Router()
/**
 * Get /
 */
router.get('/', (req, res) => res.send({message: "Hello, world!"}) )

/**
 * user reg
 */
router.post('/register', userValidation, register)

/**
 * login
 */
router.post('/login', login)

/**
 * User refresh
 */
router.post('/refresh', refresh)

/**
 * /project
 */
router.use('/project', project)

export default router