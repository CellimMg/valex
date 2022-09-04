import { NextFunction, Request, Response } from "express";
import * as cardRepository from "../repositories/card_repository";

export async function cardExpirationValidate(req: Request, res: Response, next: NextFunction) {
    const card: cardRepository.Card = res.locals.card;
    if (isExpired(card.expirationDate)) return res.status(400).send({ message: "O cartão já está expirado!" });;
    next();
}

function isExpired(expireDate: string) {
    const currentDate = new Date;
    const currentDateString = `${currentDate.toLocaleDateString().split("/")[1]}/${(currentDate.getFullYear()).toString().substring(2)}`;
    if (getExpireYear(expireDate) > getExpireYear(currentDateString)) {
        return false;
    } else if (getExpireYear(expireDate) < getExpireYear(currentDateString)) {
        return true;
    } else {
        if (getExpireMonth(expireDate) <= getExpireMonth(currentDateString)) {
            return false;
        } else {
            return true;
        }
    }
}

function getExpireMonth(expireDate: string) {
    return expireDate.split("/")[0];
}

function getExpireYear(expireDate: string) {
    return expireDate.split("/")[1];
}