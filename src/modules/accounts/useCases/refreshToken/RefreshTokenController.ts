import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUseCase } from "./RefreshTokenUserCase";

export class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenController = container.resolve(RefreshTokenUseCase);

    const refresh_token = await refreshTokenController.execute(token);

    return response.json(refresh_token);
  }
}
