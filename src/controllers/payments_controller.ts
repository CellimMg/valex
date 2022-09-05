import { Request, Response } from "express";
import { Card } from "../repositories/card_repository";
import { makePayment } from "../services/payments_service";

export async function createPayment(req: Request, res: Response) {
    try {
        const { amount, businessId } = req.body;

        if (amount <= 0) return res.status(400).send({ message: "O valor deve ser maior do que 0!" });

        const card: Card = res.locals.card;

        await makePayment(card, businessId, amount);

        return res.sendStatus(201);
    } catch (error) {
        switch (error) {
            case "NOT_FOUND":
                return res.status(404).send({ message: "Este estabelecimento não está cadastrado!" });
            case "CARD_BLOCKED":
                return res.status(400).send({ message: "O cartão está bloqueado!" });
            case "NOT_ALLOWED":
                return res.status(401).send({ message: "Cartão não autorizado para este tipo de transação!" });
            case "INSUFICIENT_FUNDS":
                return res.status(400).send({ message: "Saldo insuficiente!" });
            default:
                return res.sendStatus(500);
        }
    }
}