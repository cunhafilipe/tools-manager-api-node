import { Request, Response, Router } from "express";
import loginController from "../controller/login.controller";

/**
 * @swagger
 * /:
 *   post:
 *     summary: Login user
 *     tags:
 *       - User
 *     responses:
 *       '200':
 *         description: User login
 */

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const login = await loginController.execute({
    email,
    password
  })

  res.status(200).json(login)


}

const loginRoutes = Router()

loginRoutes.post('/', login);


export { loginRoutes };

