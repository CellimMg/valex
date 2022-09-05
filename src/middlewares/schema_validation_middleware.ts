import { NextFunction, Request, Response } from "express";
import joi from "joi";

export function schemaValidate(schema: joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;

            const { error } = schema.validate(body);

            if (error) return res.status(422).send({ message: error?.details[0].message });

            next();
        } catch (error) {
            return res.sendStatus(500);
        }
    };
}