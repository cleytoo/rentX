import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new cat", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "catgory",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to createa car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "catgory",
    });

    await expect(
      createCarUseCase.execute({
        name: "Car 2",
        description: "Description car",
        daily_rate: 100,
        license_plate: "abc-1234",
        fine_amount: 60,
        brand: "Brand",
        category_id: "catgory",
      })
    ).rejects.toEqual(new AppError("car already exists"));
  });

  it("should be able to create a car as available by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "catgory",
    });

    expect(car.available).toBe(true);
  });
});
