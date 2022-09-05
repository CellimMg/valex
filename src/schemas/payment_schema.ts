import joi from "joi";

const paymentSchema: joi.ObjectSchema = joi.object({
    amount: joi.number().required(),
    password: joi.string().min(4).required(),
    businessId: joi.number().required()
});

export default paymentSchema;