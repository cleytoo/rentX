import { v4 as uuiv4 } from "uuid";

import { ICreateCarDTO } from "@modules/cars/dto/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  constructor() {
    const fakeCar: Car = {
      name: "Fakecar",
      available: false,
      brand: "fake",
      category: null,
      created_at: new Date(),
      category_id: "23232",
      license_plate: "abp-123",
      daily_rate: 10,
      description: "lalala",
      fine_amount: 10,
      specifications: [],
      id: uuiv4(),
    };

    this.cars.push(fakeCar);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      id: id || uuiv4(),
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
      available: true,
      created_at: new Date().getTime(),
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(plate: string): Promise<Car> {
    const car = await this.cars.find((car) => car.license_plate === plate);

    return car;
  }

  async findAvailable(
    brand: string,
    name: string,
    category_id: string
  ): Promise<Car[]> {
    const availablesCars = await this.cars.filter((car) => car.available);
    let cars = [];

    if (brand || name || category_id) {
      cars = availablesCars.filter(
        (car) =>
          (car.brand && car.brand === brand) ||
          (car.name && car.name === name) ||
          (car.category_id && car.category_id === category_id)
      );
    } else {
      cars = availablesCars;
    }

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.cars.find((car) => car.id === id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
