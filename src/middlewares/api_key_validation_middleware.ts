import { NextFunction, Request, Response } from "express";

export async function validateApi(req: Request, res: Response, next: NextFunction) {
    try {
        const apiKey: string | undefined = req.header("x-api-key");
        if (!apiKey) return res.sendStatus(400);


        next();
    } catch (error) {
        return res.sendStatus(500);
    }
}