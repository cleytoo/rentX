import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      category_id,
      daily_rate,
      license_plate,
      fine_amount,
      description,
      brand,
    } = request.body;

    const createCarUseCase = container.resolve(CreateCarUseCase);

    const car = await createCarUseCase.execute({
      name,
      category_id,
      daily_rate,
      license_plate,
      fine_amount,
      description,
      brand,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
