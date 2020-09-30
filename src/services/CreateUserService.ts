import User from "../models/User";
import { getRepository } from "typeorm";

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

    if (checkUserExists) {
      throw new Error("Email adress already used.");
    }

    const user = usersRepositoy.create({
      name,
      email,
      password,
    });

    await usersRepositoy.save(user);

    return user;
  }
}
export default CreateUserService;
