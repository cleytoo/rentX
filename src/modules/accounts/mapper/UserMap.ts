import { instanceToInstance } from "class-transformer";

import { User } from "../infra/typeorm/entities/User";

export interface IUserResponseDTO {
  name: string;
  email: string;
  id: string;
  avatar_url(): string;
  driver_license: string;
  avatar: string;
}

export class UserMap {
  static toDTO({
    email,
    name,
    id,
    driver_license,
    avatar_url,
    avatar,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      id,
      driver_license,
      avatar_url,
      avatar,
    });

    return user;
  }
}
