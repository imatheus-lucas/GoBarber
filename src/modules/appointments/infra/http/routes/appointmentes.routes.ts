import { parseISO } from "date-fns";
import { Router } from "express";

import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
const appointmentRouter = Router();

const appointmentsRepository = new AppointmentsRepository()
appointmentRouter.use(ensureAuthenticated);

// appointmentRouter.get("/", async (request, response) => {

//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);

//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentRouter.post("/", async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(appointmentsRepository);

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return response.json(appointment);
});

export default appointmentRouter;
