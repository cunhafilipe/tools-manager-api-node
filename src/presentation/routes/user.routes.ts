import { Request, Response, Router } from "express";
import userCreateController from "../controller/user.controller";

const userRoutes = Router()

const createUser = async (req: Request, res: Response): Promise<void> => {
  const {
    name,
    email,
    password
  } = req.body;

  const userCreate = await userCreateController.create({
    name,
    email,
    password
  })

  res.status(201).json(userCreate);
}

userRoutes.post('/', createUser);

export { userRoutes };

