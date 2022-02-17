import { parse as csvParse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IUploadFileCategory {
  name: string;
  description: string;
}

@injectable()
class UploadFileCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async loadCategories(
    file: Express.Multer.File
  ): Promise<IUploadFileCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IUploadFileCategory[] = [];
      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();
      stream.pipe(parseFile);
      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          fs.promises.unlink(file.path);
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { UploadFileCategoryUseCase };
