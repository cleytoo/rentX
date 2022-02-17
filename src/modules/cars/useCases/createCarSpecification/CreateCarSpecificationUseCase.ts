import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationrepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationrepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carsRepository.findById(car_id);

    if (!carAlreadyExists) {
      throw new AppError("Car not exists");
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    carAlreadyExists.specifications = specifications;

    await this.carsRepository.create(carAlreadyExists);

    return carAlreadyExists;
  }
}

export { CreateCarSpecificationUseCase };
