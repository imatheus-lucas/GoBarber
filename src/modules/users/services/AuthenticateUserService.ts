import User from "@modules/users/infra/typeorm/entities/User";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import AuthConfig from "@config/Auth";
import AppError from "@shared/errors/AppError";
import IUserRepository from "../repositories/IUserRepository";
interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
class AuthenticateUserService {
  constructor(private userRepository: IUserRepository) {}
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    //const userRepository = getRepository(User);

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Incorret Email/Password combination", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Incorret Email/Password combination", 401);
    }

    const { secret, expiresIn } = AuthConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
