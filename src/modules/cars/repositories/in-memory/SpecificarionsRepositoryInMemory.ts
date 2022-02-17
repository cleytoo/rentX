import { v4 as uuidv4 } from "uuid";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationDTO,
  ISpecificationrepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationrepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      id: uuidv4(),
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find((el) => el.name === name);

    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((el) =>
      ids.includes(el.id)
    );

    return specifications;
  }
}

export { SpecificationRepositoryInMemory };
