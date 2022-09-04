import * as cardRepository from "../repositories/card_repository";
import { Company } from "../repositories/company_repository";
import { Employee } from "../repositories/employee_repository";
import { Transactions } from "../utils/type_enum";
import { faker } from "@faker-js/faker";
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
    return `${currentDate.getMonth().toString().padStart(2, "0")}/
        ${(currentDate.getFullYear() + 5).toString().substring(-2)}`;
}

function getCardNumber(): string {
    return faker.finance.creditCardNumber();
}

function getHolderName(name: string): string {
    const nameAsList = name.split(" ");
    const nameFormated = [];
    for (let i = 0; i < nameAsList.length; i++) {
        if (i == 9 || i == nameAsList.length - 1) {
            nameFormated.push(nameAsList[i]);
        } else {
            if (nameAsList[i].length >= 3) nameFormated.push(nameAsList[i]);
        }
    }
    return nameFormated.join(" ");
}

function isValidType(type: cardRepository.TransactionTypes): boolean {
    return Object.values(Transactions).includes(type);
}