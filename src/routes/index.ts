import { Router } from "express";
import appointmentRouter from "./appointmentes.routes";
import usersRouter from "./users.routes";

const routes = Router();
routes.use("/appointments", appointmentRouter);
routes.use("/users", usersRouter);

export default routes;
