import joi from "joi";

const activateSchema: joi.ObjectSchema = joi.object({
    cvv: joi.number().min(3).max(3).required(),
    password: joi.string().min(4).max(4).required()
});

export default activateSchema;