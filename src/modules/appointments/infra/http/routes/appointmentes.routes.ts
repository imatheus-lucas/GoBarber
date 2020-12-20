import { Router } from "express";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import AppointmentsController from "../controllers/AppointmentController";
const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get("/", async (request, response) => {

//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post("/", AppointmentsController.create);

export default appointmentRouter;
