import { NextFunction, Request, Response } from "express";
import * as cardRepository from "../repositories/card_repository";

export async function cardValidation(req: Request, res: Response, next: NextFunction) {
    const { idCard } = req.params;
    const card = await cardRepository.findById(parseInt(idCard));
    if (!card) return res.status(404).send({ message: "Cartão não encontrado!" });;
    res.locals.card = card;
    next();
} 