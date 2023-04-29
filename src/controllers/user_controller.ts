/**
 * User Controller
 */
import bcrypt from 'bcrypt'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../types'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createUser, getUserByEmail } from '../services/user_service'
const debug = Debug('user-controller:debug')
/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => { 
	const { email, password } = req.body

	const user = await getUserByEmail(email)
	if (!user) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required",
		})
	}
	
	const result = await bcrypt.compare(password, user.password )
	if (!result) {
		return res.status(401).send({
			status: "fail",
			message: "Authorization required",
		})
	}

	const payload: JwtPayload = {
		sub: user.id,
		email: user.email,
		password: user.password
	}

	if (!process.env.ACCESS_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "No access token secret defined",
		})
	}

	const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h'
	})

	if (!process.env.REFRESH_TOKEN_SECRET) {
		return res.status(500).send({
			status: "error",
			message: "No refresh token secret defined",
		})
	}	
	const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: process.env.REFRESH_TOKEN_LIFETIME || '1d'
	})

	res.status(200).send({
		status: "success",
		data: {
			access_token,
			refresh_token
		}
	})
}

/**
 * Register a new user
 */
export const register =async (req: Request, res: Response) => {
	const validationErros = validationResult(req)
	if (!validationErros.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErros.array()
		})
	}

	const validatedData = matchedData(req)
	
	const hashedPassword = 
	await bcrypt.hash(validatedData.password, Number(process.env.SALT_ROUNDS) || 10)

	validatedData.password = hashedPassword

	try {
		await createUser({
			email: validatedData.email,
			password: validatedData.password,
			first_name: validatedData.first_name,
			last_name: validatedData.last_name,
			admin: validatedData.admin
		})

	res.status(200).send({
		status: "success",
		data: {
			email: validatedData.email,
			first_name: validatedData.first_name,
			last_name: validatedData.last_name,
			admin: validatedData.admin
		}
	})
	} catch (err) {
		res.status(500).send({
			status: "error",
			message: "Something unexpected happened"
		})
	}
}

/** 
 * Refresh token
 */
export const refresh = async (req: Request, res: Response) => {
	if (!req.headers.authorization) {
		debug("Authorization header dosen't exists")
		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	const [authSchema, token] =  req.headers.authorization.split(" ")

	if (authSchema.toLocaleLowerCase() !== "bearer") {
		debug("Expected Bearer as authorizxation schema")
		return res.status(401).send({
			status: "fail",
			data: "Authorization required", 
		})
}

	try {
		const payload = (jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || "") as unknown) as JwtPayload

		delete payload.iat
		delete payload.exp

		if (!process.env.ACCESS_TOKEN_SECRET) {
			return res.status(500).send({
				status: "error",
				message: "No access token secret defined",
			})
		}
		const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.ACCESS_TOKEN_LIFETIME || '4h',
		})

		res.status(200).send({
			status: "success",
			data: {
				access_token,
			},
		})
	} catch (err) {
		debug("Token failed verification", err)
		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}
}	