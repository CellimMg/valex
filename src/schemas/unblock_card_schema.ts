import joi from "joi";

const unblockSchema: joi.ObjectSchema = joi.object({
    password: joi.string().min(4).max(4).required()
});

export default unblockSchema;