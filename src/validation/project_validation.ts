import { body } from "express-validator";


export const projectValidation = [
	body('title')
		.isString()
		.notEmpty()
		.trim(),
	body('description')
		.isString()
		.notEmpty()
		.trim(),
	body('course')
		.isString()
		.notEmpty()
		.trim(),
	body('link')
		.isObject()
		.notEmpty()
		.trim(),
	body('image')
		.isString()
		.notEmpty()
		.trim(),
]