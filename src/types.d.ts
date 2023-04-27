export type CreateUserData = {
  email: string,
  password: string
  first_name: string,
  last_name: string,  
}

export type JwtPayload = {
	sub: number,
  email: string,
	password: string,
	iat?: number,
  exp?: number
}
