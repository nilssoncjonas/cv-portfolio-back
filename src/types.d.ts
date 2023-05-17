export type CreateUserData = {
  email: string,
  password: string
  first_name: string,
  last_name: string,  
	admin?: boolean
}

export type JwtPayload = {
	sub: number,
  email: string,
	password: string,
	iat?: number,
  exp?: number
}

export type CreateProjectData = {
	title: string,
	description: string,
	course: string,
	link: object,
	image: string
}