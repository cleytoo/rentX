import { v4 as uuidv4 } from "uuid";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      id: uuidv4(),
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
      created_at: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
    return rental;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }

  async listRentalsByUser(id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => rental.user_id === id);

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
