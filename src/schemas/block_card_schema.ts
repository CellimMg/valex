import joi from "joi";

const blockSchema: joi.ObjectSchema = joi.object({
    password: joi.string().min(4).required()
});

export default blockSchema;