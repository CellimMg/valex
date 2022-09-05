import joi from "joi";

const rechargeSchema: joi.ObjectSchema = joi.object({
    amount: joi.number().required()
});

export default rechargeSchema;