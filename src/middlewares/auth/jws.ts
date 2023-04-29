import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from '../../types'
const debug = Debug('cv-port-backend:jwt')

/**
 * Validate JWT Access Token
 */
export const validateToken = (req: Request, res: Response, next: NextFunction) => {

	if (!req.headers.authorization) {
		debug("Authorization header missing")

		return res.status(401).send({
			status: "fail",
			data: "Authorization required",
		})
	}

	const [authSchema, token] = req.headers.authorization.split(" ")

	if (authSchema.toLocaleLowerCase() !== "bearer") {
		debug("Authorization schema isn't Bearer")
		return res.status(401).send({
			status: "fail",
			data: "Authorization required", 
		})
	}

	try {
		const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "") as unknown) as JwtPayload
		
			req.token = payload

	} catch (err) {
		debug("Token failed verification", err)
		return res.status(401).send({
			status: "fail",
			data: "Authorization required"
		})
	}

	next()
}