import { v4 as uuidv4 } from "uuid";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    password,
    email,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      password,
      driver_license,
      id: uuidv4(),
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.users.find((user) => user.id === id);

    return user;
  }
}

export { UsersRepositoryInMemory };
