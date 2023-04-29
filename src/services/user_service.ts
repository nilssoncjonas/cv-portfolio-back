import prisma from "../prisma";
import { CreateUserData } from "../types";

/**
 * Creates a new user
 */

export const createUser = async (data: CreateUserData) => {
	return await prisma.user.create({ data })
}

/**
 * When creating a new user, checks if email already is in use or
 * when login check if user exists in database
 */
export const getUserByEmail = async (email: string) => {
	return await prisma.user.findUnique({
		where: { email }
	})
}