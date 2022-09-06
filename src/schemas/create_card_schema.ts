import joi from "joi";

const createSchema: joi.ObjectSchema = joi.object({
    employeeId: joi.number().required(),
    type: joi.string().min(1).required()
});

export default createSchema;