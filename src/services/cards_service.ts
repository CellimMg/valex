import * as cardRepository from "../repositories/card_repository";
import * as paymentRepository from "../repositories/payment_repository";
import * as rechargeRepository from "../repositories/recharge_repository";
import { Employee } from "../repositories/employee_repository";
import { Transactions } from "../utils/type_enum";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import crypt from "cryptr";

const cryptr = new crypt("meuEncryptador");


export async function getCardByTypeAndEmployeeId(employeeId: number, type: cardRepository.TransactionTypes) {
    if (!isValidType(type)) throw "INVALID_TYPE";
    const card = await cardRepository.findByTypeAndEmployeeId(type, employeeId);
    return card;
}

export async function createCard(employee: Employee, type: cardRepository.TransactionTypes) {
    const card: cardRepository.CardInsertData = {
        employeeId: employee.id,
        cardholderName: getHolderName(employee.fullName),
        expirationDate: getExpireDate(),
        isBlocked: false,
        isVirtual: false,
        number: getCardNumber(),
        securityCode: cryptCVV(getCVV()),
        type: type
    };
    await cardRepository.insert(card);
}

export async function activateCard(card: cardRepository.Card, cvv: string, password: string) {
    const cardData: cardRepository.CardUpdateData = { securityCode: cvv, password: hashPassword(password) };
    if (card.password != "" && card.password != null) throw "ALREADY_ACTIVATED";
    if (cvv != decryptCVV(card.securityCode)) throw "NOT_MATCH";
    if (password.length != 4) throw "INVALID_PASSWORD";

    await cardRepository.update(card.id, cardData);
}

export async function getCardTransactions(cardId: number) {

    const recharges = await getCardRecharges(cardId);
    const transactions = await getCardPayments(cardId);

    const totalRecharges = recharges.reduce((a, b) => a + b.amount, 0);
    const totalPayments = transactions.reduce((a, b) => a + b.amount, 0);

    return {
        balance: totalRecharges - totalPayments,
        transactions: transactions,
        recharges: recharges,
    };
}

export async function blockCard(card: cardRepository.Card) {
    if (card.isBlocked) throw "ALREADY_BLOCKED";
    await cardRepository.update(card.id, { isBlocked: true });
}

export async function unblockCard(card: cardRepository.Card) {
    if (card.isBlocked) throw "ALREADY_UNBLOCKED";
    await cardRepository.update(card.id, { isBlocked: false });
}

async function getCardRecharges(cardId: number) {
    const recharges: rechargeRepository.Recharge[] = await rechargeRepository.findByCardId(cardId);
    return recharges;
}
async function getCardPayments(cardId: number) {
    const payments: paymentRepository.PaymentWithBusinessName[] = await paymentRepository.findByCardId(cardId);
    return payments;
}

function hashPassword(password: string) {
    return bcrypt.hashSync(password, 8);
}

function cryptCVV(cvv: string) {
    return cryptr.encrypt(cvv);
}

function decryptCVV(cvvCrypted: string) {
    return cryptr.decrypt(cvvCrypted);
}

function getCVV(): string {
    return faker.finance.creditCardCVV();
}

function getExpireDate(): string {
    const currentDate = new Date;
    return `${currentDate.toLocaleDateString().split("/")[1]}/${(currentDate.getFullYear() + 5).toString().substring(2)}`;
}

function getCardNumber(): string {
    return faker.finance.creditCardNumber();
}

function getHolderName(name: string): string {
    const nameAsList = name.split(" ");
    const nameFormated = [];
    for (let i = 0; i < nameAsList.length; i++) {
        if (i == 0 || i == nameAsList.length - 1) {
            nameFormated.push(nameAsList[i]);
        } else {
            if (nameAsList[i].length >= 3) nameFormated.push(nameAsList[i][0]);
        }
    }
    return nameFormated.join(" ");
}

function isValidType(type: cardRepository.TransactionTypes): boolean {
    return Object.values(Transactions).includes(type);
}