import { getRepository, Repository } from "typeorm";
import IUserRepository from "@modules/users/repositories/IUserRepository";
import User from "../entities/User";
import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;
  constructor() {
    this.ormRepository = getRepository(User);
  }
  public async findById(id: string): Promise<User | undefined> {
    const user = this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const User = await this.ormRepository.findOne({
      where: { email },
    });
    return User;
  }

  public async create(UserData: ICreateUserDTO): Promise<User> {
    const User = this.ormRepository.create(UserData);

    await this.ormRepository.save(User);

    return User;
  }
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
