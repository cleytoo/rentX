import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to lista all availables cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "carro test",
      brand: "teste",
      description: "descrição carro teste",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "ABC-123",
      category_id: "12321312",
    });
    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availaboe cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car_name_test",
      brand: "car",
      description: "descrição carro name",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "ANM-123",
      category_id: "name12323",
    });

    const cars = await listCarsUseCase.execute({
      name: "car_name_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availaboe cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car",
      brand: "car_brand_test",
      description: "descrição carro brand",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "ANM-123",
      category_id: "name12323",
    });

    const cars = await listCarsUseCase.execute({
      brand: "car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availaboe cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "car",
      brand: "car",
      description: "descrição carro category_id",
      daily_rate: 100,
      fine_amount: 50,
      license_plate: "ANM-123",
      category_id: "category_id_test",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "category_id_test",
    });

    expect(cars).toEqual([car]);
  });
});
