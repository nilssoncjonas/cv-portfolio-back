import express from "express"
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

// del /refreshToken Logout User

export default router