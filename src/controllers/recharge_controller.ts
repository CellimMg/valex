import { Request, Response } from "express";
import { makeRecharge } from "../services/recharge_service";

export async function createRecharge(req: Request, res: Response) {
    try {
        const { amount } = req.body;

        if (amount <= 0) return res.status(400).send({ message: "O valor de recarga deve maior do que 0!" });

        await makeRecharge(amount, res.locals.card);

        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        switch (error) {
            case "NOT_ACTIVATED":
                return res.status(400).send({ message: "O cartão não está ativado!" });
            default:
                return res.sendStatus(500);
        }
    }
}