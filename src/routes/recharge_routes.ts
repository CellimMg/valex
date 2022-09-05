import { Router } from "express";
import { createRecharge } from "../controllers/recharge_controller";
import { validateApiKey } from "../middlewares/api_key_validation_middleware";
import { cardExpirationValidate } from "../middlewares/card_expiration_middleware";
import { cardValidation } from "../middlewares/card_validation_middleware";
import { schemaValidate } from "../middlewares/schema_validation_middleware";
import rechargeSchema from "../schemas/recharge_schema";

const rechargesRouter = Router();

rechargesRouter.post("/recharge/:idCard", schemaValidate(rechargeSchema), validateApiKey, cardValidation, cardExpirationValidate, createRecharge);

export default rechargesRouter;