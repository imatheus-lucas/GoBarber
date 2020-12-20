import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { Request, Response } from "express";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userRepository = new UsersRepository();
    const { name, email, password } = request.body;
    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;
    return response.json(user);
  }
}

export default new UsersController();
