import { Router } from "express";
import { createPayment } from "../controllers/payments_controller";
import { cardExpirationValidate } from "../middlewares/card_expiration_middleware";
import { cardPasswordValidation } from "../middlewares/card_password_validation_middleware";
import { cardValidation } from "../middlewares/card_validation_middleware";
import { schemaValidate } from "../middlewares/schema_validation_middleware";
import paymentSchema from "../schemas/payment_schema";

const paymentsRouter = Router();

paymentsRouter.post("/payment/:idCard", schemaValidate(paymentSchema), cardValidation, cardExpirationValidate, cardPasswordValidation, createPayment);

export default paymentsRouter;