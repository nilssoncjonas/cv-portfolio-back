// import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { getProjects, createProject, updateProjectById } from '../services/project_service'
import Debug from 'debug'
const debug = Debug('cv-back:project_controller')


/**
 * Get all resources
 */
export const index = async (req: Request, res: Response) => {

	try {
		const projects = await getProjects()
		res.status(200).send({
			status: "success",
			data: projects
		})
	} catch (err) {
		res.status(500).send({
			status: "error",
			message: "Something unexpected happened"
		})
	}
}

/**
 * Create a resource
 */
export const store = async (req: Request, res: Response) => {

	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}

	const validatedData = matchedData(req)
	debug(validatedData)

	try {
		const newProject = await createProject({
			title: validatedData.title,
			description: validatedData.description,
			course: validatedData.course,
			link: validatedData.link,
			image: validatedData.image
		}, req.token.sub)
		debug(newProject)
		res.status(200).send({
			status: "success",
			data: newProject,
		})
	} catch (err) {
		res.status(400).send({
			status: "error",
			message: "Something unexpected happened", err
		})
	}

}

/**
 * Update a resource
 */
export const update = async (req: Request, res: Response) => {
	const projectId = Number(req.params.projectId)
	debug("projectId:", projectId)
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}
	const validatedData = matchedData(req)
	debug("validatedData:", validatedData)
	try {

		const project = await updateProjectById(projectId, validatedData)

		res.status(200).send({
			status: "success",
			data: project
		})
	} catch (err) {
		res.status(400).send({
			status: "fail",
			message: `Could not update album ${projectId} content or ${err}`
		})
	}
}