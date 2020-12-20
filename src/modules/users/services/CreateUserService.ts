import User from "@modules/users/infra/typeorm/entities/User";
import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepositoy = getRepository(User);

    const checkUserExists = await usersRepositoy.findOne({
      where: { email },
    });

    const hashedPassword = await hash(password, 8);

    if (checkUserExists) {
      throw new AppError("Email adress already used.");
    }

    const user = usersRepositoy.create({
      name,
      email,
      password: hashedPassword,
    });


    await usersRepositoy.save(user);
    return user;
  }
}
export default CreateUserService;
