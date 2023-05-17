import prisma from "../prisma"
import { CreateProjectData, UpdateProject } from "../types"


/**
 * Get all projects
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
			image: data.image,
			User: {
				connect: {
					id: sub
				}
			}
		}
	})
}

/**
 * 
 * @param projectId 
 * @param projectData 
 * @returns 
 */
export const updateProjectById = async (projectId: number, projectData: UpdateProject) => {
	return await prisma.project.update({
		where: {
			id: projectId,
		},
		data: projectData
	})
}