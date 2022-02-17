import { Router } from "express";

import { CreateSpesificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { esnureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpeficationController = new CreateSpesificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  esnureAdmin,
  createSpeficationController.handle
);

export { specificationsRoutes };
