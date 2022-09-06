import { Router } from "express";
import { createCard, activateCard, getCardTransactions, blockCard, unblockCard } from "../controllers/cards_controller";
import { validateApiKey } from "../middlewares/api_key_validation_middleware";
import { cardExpirationValidate } from "../middlewares/card_expiration_middleware";
import { cardPasswordValidation } from "../middlewares/card_password_validation_middleware";
import { cardValidation } from "../middlewares/card_validation_middleware";
import { schemaValidate } from "../middlewares/schema_validation_middleware";
import { validateType } from "../middlewares/type_validation_middleware";
import activateSchema from "../schemas/activate_card_schema";
import blockSchema from "../schemas/block_card_schema";
import createSchema from "../schemas/create_card_schema";
import unblockSchema from "../schemas/unblock_card_schema";

const cardsRouter = Router();

cardsRouter.post("/card", schemaValidate(createSchema), validateApiKey, validateType, createCard);
cardsRouter.patch("/card/:idCard", schemaValidate(activateSchema), cardValidation, cardExpirationValidate, activateCard);
cardsRouter.get("/card/:idCard", cardValidation, getCardTransactions);
cardsRouter.patch("/card/:idCard/block", schemaValidate(blockSchema), cardValidation, cardExpirationValidate, cardPasswordValidation, blockCard);
cardsRouter.patch("/card/:idCard/unblock", schemaValidate(unblockSchema), cardValidation, cardExpirationValidate, cardPasswordValidation, unblockCard);

export default cardsRouter;