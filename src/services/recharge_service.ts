import { Card } from "../repositories/card_repository";
import { insert } from "../repositories/recharge_repository";

export async function makeRecharge(amount: number, card: Card) {
    if (card.password == "" || card.password == null) throw "NOT_ACTIVATED";

    await insert({ amount: amount, cardId: card.id });
}