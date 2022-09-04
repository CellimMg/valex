import { Router } from "express";
import { createCard, activateCard, getCardTransactions } from "../controllers/cards_controller";
import { validateApiKey } from "../middlewares/api_key_validation_middleware";
import { cardExpirationValidate } from "../middlewares/card_expiration_middleware";
import { cardValidation } from "../middlewares/card_validation_middleware";
import { validateType } from "../middlewares/type_validation_middleware";

const cardsRouter = Router();


cardsRouter.post("/card", validateApiKey, validateType, createCard);
cardsRouter.put("/card/:idCard", cardValidation, cardExpirationValidate, activateCard);
cardsRouter.get("/card/:idCard", cardValidation, getCardTransactions);


export default cardsRouter;