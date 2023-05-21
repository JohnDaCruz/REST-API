import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as AuthorService from "./author.service";
import { request } from "http";

export const authorRouter = express.Router();

authorRouter.get("/", async (req: Request, res: Response) => {
    try {
        const author = await AuthorService.listAuthors();
        return res.status(200).json(author);
    } catch (error: any) {
        return res.status(400).json(error.message);
    }
});

authorRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const author = await AuthorService.getAuthor(id);
        if (author) {
            return res.status(200).json(author);
        }
        return res.status(400).json("Autor ñ encontrado");
    } catch (error: any) {
        return res.status(400).json(error.message);
    }
});

authorRouter.post(
    "/",
    body("nome").isString(),
    body("sobrenome").isString(),
    async (req: Request, res: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
    }
);
