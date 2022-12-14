import { Request, Response } from "express";
import * as companiesService from "../services/companies_service";
import * as employeesService from "../services/employees_service";
import * as cardsService from "../services/cards_service";
import { Employee } from "../repositories/employee_repository";
import { Card, TransactionTypes } from "../repositories/card_repository";

export async function createCard(req: Request, res: Response) {
    try {
        const { employeeId, type }:
            { employeeId: string | number, type: TransactionTypes } = req.body;

        const apiKey: string = res.locals.apiKey;

        await companiesService.verifyCompanyByKey(apiKey);
        const employee: Employee = await employeesService.getEmployeeById(parseInt(`${employeeId}`));
        const employeeCard: Card = await cardsService.getCardByTypeAndEmployeeId(employee.id, type);

        if (employeeCard) return res.status(400).send({ message: "Este usuário já possui um cartão deste tipo!" });

        await cardsService.createCard(employee, type);

        return res.sendStatus(201);
    } catch (error) {
        switch (error) {
            case "INVALID_TYPE":
                return res.status(422).send({ message: "Tipo de cartão inválido!" });
            case "EMPLOYEE_NOT_FOUND":
                return res.status(404).send({ message: "Usuário não encontrado!" });
            case "COMPANY_NOT_FOUND":
                return res.status(401).send({ message: "Chave api inválida!" });
            default:
                return res.sendStatus(500);
        }
    }
}


export async function activateCard(req: Request, res: Response) {
    try {
        const { cvv, password } = req.body;
        await cardsService.activateCard(res.locals.card, cvv, password);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        switch (error) {
            case "NOT_MATCH":
                return res.status(400).send({ message: "Código de segurança inválido!" });
            case "INVALID_PASSWORD":
                return res.status(422).send({ message: "A senha deve possuir 4 dígitos!" });
            case "ALREADY_ACTIVATED":
                return res.status(400).send({ message: "O cartão ja está ativado!" });
            default:
                return res.sendStatus(500);
        }
    }
}

export async function blockCard(req: Request, res: Response) {
    try {
        const card: Card = res.locals.card;
        await cardsService.blockCard(card);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        switch (error) {
            case "ALREADY_BLOCKED":
                return res.status(400).send({ message: "O cartão ja está bloqueado!" });
            default:
                return res.sendStatus(500);
        }
    }
}
export async function unblockCard(req: Request, res: Response) {
    try {
        const card: Card = res.locals.card;
        await cardsService.unblockCard(card);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        switch (error) {
            case "ALREADY_UNBLOCKED":
                return res.status(400).send({ message: "O cartão ja está desbloqueado!" });
            default:
                return res.sendStatus(500);
        }
    }
}

export async function getCardTransactions(req: Request, res: Response) {
    try {
        const card: Card = res.locals.card;
        const transactions = await cardsService.getCardTransactions(card.id);
        return res.status(200).send(transactions);
    } catch (error) {
        console.log(error);
        switch (error) {
            default:
                return res.sendStatus(500);
        }
    }
}