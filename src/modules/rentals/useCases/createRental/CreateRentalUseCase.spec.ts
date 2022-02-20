import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/date-provider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayJsProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const datAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayJsProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsProvider,
      carsRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "description",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "123",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "3333",
      expected_return_date: datAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if is there is another to the same user", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "test",
      description: "description",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "123",
      brand: "brand",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      expected_return_date: datAdd24Hours,
      user_id: "12345",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "12345",
        expected_return_date: datAdd24Hours,
        car_id: "1020",
      })
    ).rejects.toEqual(new AppError("there's a rental in progress for user!"));
  });

  it("should not be able to create a new with invalid return time", async () => {
    expect(
      createRentalUseCase.execute({
        car_id: "1020",
        user_id: "3333",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time"));
  });
});
