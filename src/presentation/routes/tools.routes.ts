import { Request, Response, Router } from "express";
import authMiddleware from "../../infra/middlewares/auth.middleware";
import toolsController from "../controller/tools.controller";

/**
 * @swagger
 * /:id:
 *   delete:
 *     summary: Delete tool
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Delete a tool by Id
 *         schema:
 *           type: integer
 *     responses:
 *       '204'
 */

const deleteTools = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params
  await toolsController.delete({ id: +id })

  res.status(204).json({
    message: 'No Content'
  });
}

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create tool
 *     tags:
 *       - Tools
 *     requestBody:
 *       description: Create a new tool
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               link:
 *                 type: string
 *               description:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '201'
 */

const createTools = async (req: Request, res: Response): Promise<void> => {
  const {
    title,
    link,
    description,
    tags
  } = req.body;

  const tools = await toolsController.create({
    title,
    link,
    description,
    tags
  })

  res.status(201).json(tools);
}

/**
 * @swagger
 * /:
 *   get:
 *     summary: List Tools
 *     tags:
 *       - Tools
 *     responses:
 *       '201'
 */

const listTools = async (req: Request, res: Response): Promise<void> => {

  const tools = await toolsController.list()

  res.status(201).json(tools);
}

/**
 * @swagger
 * /searching:
 *   get:
 *     summary: Find tool by keyword
 *     tags:
 *       - Tools
 *     parameters:
 *       - in: query
 *         name: key
 *         required: true
 *         description: key word
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 */

const searchingTools = async (req: Request, res: Response): Promise<void> => {
  const { key } = req.query
  const tools = await toolsController.searching(key as string)

  res.status(201).json(tools);
}


const toolsRoutes = Router()
toolsRoutes.use(authMiddleware)
toolsRoutes.post('/', createTools);
toolsRoutes.delete('/:id', deleteTools);
toolsRoutes.get('/searching', searchingTools);
toolsRoutes.get('/', listTools);

export { toolsRoutes };

