import { body } from 'express-validator'
import { getUserByEmail } from '../services/user_service'

export const userValidation = [ 
	body('email')
		.isEmail()
		.not().isEmpty()
		.trim()
		.custom(async (value: string) => { const mail = await getUserByEmail(value)
			if (mail) {return Promise.reject('E-Mail already in use...')}
		}),
	body('password')
		.isString()
		.not().isEmpty()
		.trim()
		.isLength({min: 3, max:191}),
	body('first_name')
		.isString()
		.not().isEmpty()
		.trim()
		.isLength({min:3, max: 191}),
	body('last_name')
		.isString()
		.not().isEmpty()
		.trim()
		.isLength({min:3, max: 191}),
	body('admin')
		.isBoolean()
	]