import joi from "joi";

const activateSchema: joi.ObjectSchema = joi.object({
    cvv: joi.number().min(4).required(),
    password: joi.string().min(4).required()
});

export default activateSchema;