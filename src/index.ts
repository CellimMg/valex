import express from "express";
import cors from "cors";
import cardsRouter from "./routes/cards_routes";

const server = express();

server.use(cors());
server.use(express.json());
server.use(cardsRouter);

server.listen(5000, () => {
    console.log("Server running");
});
