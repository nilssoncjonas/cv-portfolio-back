import prisma from "../prisma"
import { CreateProjectData } from "../types"

/**
 * Get all project
 * @returns 
 */
export const getProjects = () => {
	return prisma.project.findMany()
}

/**
 * 
 * @param data 
 * @param sub 
 * @returns 
 */
export const createProject = (data: CreateProjectData, sub: number) => {
	return prisma.project.create({
		data: {
			title: data.title,
			description: data.description,
			course: data.course,
			link: data.link,
			User: {
				connect: {
					id: sub
				}
			}
		}
	})
}