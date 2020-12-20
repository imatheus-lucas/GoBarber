import { container } from "tsyringe";

import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";
import AppointmentsRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository";

container.registerSingleton<IAppointmentsRepository>(
  "AppointmentsRepository",
  AppointmentsRepository
);
