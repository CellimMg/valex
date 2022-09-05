import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Card } from "../repositories/card_repository";
import { isActivated } from "../services/cards_service";

export async function cardPasswordValidation(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    const card: Card = res.locals.card;

    if (!isActivated(card)) return res.status(400).send({ message: "Ops! Este cartão não foi ativado!" });

    if (!bcrypt.compareSync(password, card.password!)) return res.status(400).send({ message: "Ops! A senha do cartão está incorreta!" });

    next();
}   