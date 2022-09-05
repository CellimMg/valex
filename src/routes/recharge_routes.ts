import { Router } from "express";
import { createRecharge } from "../controllers/recharge_controller";
import { validateApiKey } from "../middlewares/api_key_validation_middleware";
import { cardExpirationValidate } from "../middlewares/card_expiration_middleware";
import { cardValidation } from "../middlewares/card_validation_middleware";

const rechargesRouter = Router();


rechargesRouter.post("/recharge", validateApiKey, cardValidation, cardExpirationValidate, createRecharge);

export default rechargesRouter;