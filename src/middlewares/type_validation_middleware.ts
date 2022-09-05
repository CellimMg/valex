import { NextFunction, Request, Response } from "express";
import { TransactionTypes } from "../repositories/card_repository";

export async function validateType(req: Request, res: Response, next: NextFunction) {
    try {
        const { type }: { type: string } = req.body;
        if (!isValidType(type)) return res.sendStatus(422);
        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}

function isValidType(type: string) {
    return true;
}