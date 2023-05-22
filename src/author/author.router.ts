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
        try {
            const author = req.body
            const novoAutor = await AuthorService.novoAutor(author)
            return res.status(201).json(novoAutor)
        } catch (error: any) {
            return res.status(500).json(error.message)
        }
    }
);

authorRouter.put('/:id',
    body("nome").isString(),
    body("sobrenome").isString(),
    async (req: Request, res: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        const id: number = parseInt(req.params.id, 10);
        try {
            const author = req.body
            const atualizarAutor = await AuthorService.atualizarAutor(author, id);
            return res.status(200).json(atualizarAutor)
        } catch (error: any) {
            return res.status(500).json(error.message)
        }
    }
)

authorRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        await AuthorService.deletarAutor(id)
        return res.status(204).json("Autor deletado!")
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
})
