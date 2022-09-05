import { Router } from "express";
import { createPayment } from "../controllers/payments_controller";
import { cardExpirationValidate } from "../middlewares/card_expiration_middleware";
import { cardPasswordValidation } from "../middlewares/card_password_validation_middleware";
import { cardValidation } from "../middlewares/card_validation_middleware";

const paymentsRouter = Router();

paymentsRouter.post("/payment/:idCard", cardValidation, cardExpirationValidate, cardPasswordValidation, createPayment);

export default paymentsRouter;