import express from "express";
import cors from "cors";
import cardsRouter from "./routes/cards_routes";
import paymentsRouter from "./routes/payments_routes";
import rechargesRouter from "./routes/recharge_routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(cardsRouter);
server.use(paymentsRouter);
server.use(rechargesRouter);

server.listen(5000, () => {
    console.log("Server running");
});
