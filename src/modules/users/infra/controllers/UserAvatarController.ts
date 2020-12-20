import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { Request, Response } from "express";
import UsersRepository from "../typeorm/repositories/UsersRepository";

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response>{
    const userRepository = new UsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(userRepository);
    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
}

export default new UserAvatarController();
