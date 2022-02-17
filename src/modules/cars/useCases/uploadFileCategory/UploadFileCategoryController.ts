import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadFileCategoryUseCase } from "./UploadFileCategoryUseCase";

class UploadFileCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;
    const uploadFileCategoryUseCase = container.resolve(
      UploadFileCategoryUseCase
    );
    await uploadFileCategoryUseCase.execute(file);
    return response.status(201).send();
  }
}

export { UploadFileCategoryController };
