import path from "path";
import User from "@modules/users/infra/typeorm/entities/User";
import uploadConfig from "@config/Upload";
import AppError from "@shared/errors/AppError";
import fs from "fs";
import IUserRepository from "../repositories/IUserRepository";

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  constructor(private userRepository: IUserRepository) {}
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
  //  const userRepository = getRepository(User);
    const user = await this.userRepository.findById(user_id);
    if (!user) {
      throw new AppError("Only authenticated users ca change avatar.", 401);
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
