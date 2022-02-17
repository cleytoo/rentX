import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // usuario existe
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Email or password incorrect");
    }
    // senha correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new AppError("Email or password incorrect");
    }
    // criar o token
    const token = sign({}, "6a223266e88f384d3e7420771f35683a", {
      subject: user.id,
      expiresIn: "1d",
    });

    delete user.password;

    return { user, token };
  }
}

export { AuthenticateUserUseCase };
