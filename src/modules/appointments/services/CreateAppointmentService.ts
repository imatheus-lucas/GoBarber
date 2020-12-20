import Appointment from "@modules/appointments/infra/typeorm/entities/Appointment";
import AppointmentRepository from "@modules/appointments/infra/typeorm/repositories/AppointmentRepository";
import { getCustomRepository } from "typeorm";
import { startOfHour } from "date-fns";

import AppError from "@shared/errors/AppError";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequest {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {

  constructor(private appointmentRepository: IAppointmentsRepository){}
  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {


    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked", 401);
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
export default CreateAppointmentService;
