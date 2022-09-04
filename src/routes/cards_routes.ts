import { Router } from "express";
import { createCard } from "../controllers/cards_controller";
import { validateApiKey } from "../middlewares/api_key_validation_middleware";
import { validateType } from "../middlewares/type_validation_middleware";

const cardsRouter = Router();


cardsRouter.post("/card", validateApiKey, validateType, createCard);

export default cardsRouter;