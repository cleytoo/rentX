import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ListCategoriesController } from "@modules/cars/useCases/listCategories/ListCategoriesController";
import { UploadFileCategoryController } from "@modules/cars/useCases/uploadFileCategory/UploadFileCategoryController";

import { esnureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const uploadFileCategoryController = new UploadFileCategoryController();

categoriesRoutes.post(
  "/",
  ensureAuthenticated,
  esnureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/upload",
  upload.single("file"),
  ensureAuthenticated,
  esnureAdmin,
  uploadFileCategoryController.handle
);

export { categoriesRoutes };
