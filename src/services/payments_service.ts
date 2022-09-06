import { Business, findById } from "../repositories/business_repository";
import { Card } from "../repositories/card_repository";
import { insert } from "../repositories/payment_repository";
import { getCardPayments, getCardRecharges } from "./cards_service";

export async function makePayment(card: Card, businessId: number, amount: number) {
    const business: Business = await getBusiness(businessId);
    if (!business) throw "NOT_FOUND";
    if (card.isBlocked) throw "CARD_BLOCKED";
    if (business.type != card.type) throw "NOT_ALLOWED";

    const recharges = await getCardRecharges(card.id);
    const transactions = await getCardPayments(card.id);

    const totalRecharges = recharges.reduce((a, b) => a + b.amount, 0);
    const totalPayments = transactions.reduce((a, b) => a + b.amount, 0);

    if (amount > (totalRecharges - totalPayments)) throw "INSUFICIENT_FUNDS";

    await insert({ amount: amount, businessId: businessId, cardId: card.id });

}


async function getBusiness(businessId: number): Promise<Business> {
    const business = await findById(businessId);

    return business;
}