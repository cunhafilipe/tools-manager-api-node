import { Router } from "express";
import { loginRoutes } from "./login.routes";
import { toolsRoutes } from "./tools.routes";
import { userRoutes } from "./user.routes";

const routes = Router()


routes.use('/user', userRoutes);
routes.use('/tools', toolsRoutes);
routes.use('/login', loginRoutes);

export { routes };

