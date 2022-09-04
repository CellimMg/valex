import { NextFunction, Request, Response } from "express";

export async function validateApiKey(req: Request, res: Response, next: NextFunction) {
    try {
        const apiKey: string | undefined = req.header("x-api-key");
        if (!apiKey) return res.sendStatus(400);
        res.locals.apiKey = apiKey;
        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}
