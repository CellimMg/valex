import { Router } from "express";
import { validateApiKey } from "../middlewares/api_key_validation_middleware";
import { cardExpirationValidate } from "../middlewares/card_expiration_middleware";
import { cardValidation } from "../middlewares/card_validation_middleware";

const rechargesRouter = Router();


rechargesRouter.post("/payment", validateApiKey, cardValidation, cardExpirationValidate,);

export default rechargesRouter;