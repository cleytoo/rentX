import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";

import { CreateRentalUseCase } from "../createRental/CreateRentalUseCase";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

let inMemoryUsersRepository: UsersRepositoryInMemory;
let inMemoryRentalsRepository: RentalsRepositoryInMemory;
let inMemoryCarsRepository: CarsRepositoryInMemory;
let listRentalsByUseCase: ListRentalsByUserUseCase;
let createRentalUseCase: CreateRentalUseCase;

describe("List rentals by user", () => {
  beforeEach(() => {
    inMemoryRentalsRepository = new RentalsRepositoryInMemory();
    inMemoryUsersRepository = new UsersRepositoryInMemory();
    inMemoryCarsRepository = new CarsRepositoryInMemory();

    listRentalsByUseCase = new ListRentalsByUserUseCase(
      inMemoryRentalsRepository
    );
  });

  it("should be able to lista rentals by user", async () => {
    await inMemoryUsersRepository.create({
      name: "vini",
      driver_license: "123",
      email: "vini@gmail.com",
      password: "102030",
    });
    const user = await inMemoryUsersRepository.findByEmail("vini@gmail.com");

    const car = await inMemoryCarsRepository.create({
      name: "Name car",
      description: "Description car",
      daily_rate: 100,
      license_plate: "abc-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "catgory",
    });

    const rental = await inMemoryRentalsRepository.create({
      car_id: car.id,
      user_id: user.id,
      expected_return_date: new Date("2022-02-20T20:23:57.978Z"),
    });

    const rentals = await listRentalsByUseCase.execute(user.id);

    expect(rentals).toEqual([rental]);
  });
});
