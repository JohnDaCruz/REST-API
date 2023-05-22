import express from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as BookService from "./book.service"
import { isDate } from "util/types";
import { request } from "http";
import { db } from "../utils/db.server";

export const bookRouter = express.Router();

bookRouter.get("/", async (req: Request, res: Response) => {
    try {
        const books = await BookService.listBooks()
        return res.status(200).json(books);
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
})

bookRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const book = await BookService.getBooks(id);
        if (book) {
            return res.status(200).json(book);
        }
        return res.status(400).json("Livro ñ encontrado");
    } catch (error: any) {
        return res.status(400).json(error.message);
    }
});

bookRouter.post("/",
    body("title").isString(),
    body("authoriD").isInt(),
    body("publicado").isDate().toDate(),
    body("isFiction").isBoolean(),
    async (req: Request, res: Response) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }
        try {
            const book = req.body
            const novoLivro = await BookService.novoLivro(book)
            return res.status(201).json(novoLivro)
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
)

bookRouter.put("/:id",
    body("title").isString(),
    body("authoriD").isInt(),
    body("publicado").isDate().toDate(),
    body("isFiction").isBoolean(),
    async (req: Request, res: Response) => {
        const erros = validationResult(req);
        if (!erros.isEmpty()) {
            return res.status(400).json({ erros: erros.array() });
        }
        const id: number = parseInt(req.params.id, 10);
        try {
            const book = req.body
            const atualizaBook = await BookService.atualizarBook(book, id)
            return res.status(201).json(atualizaBook)
        } catch (error: any) {
            return res.status(500).json(error.message);
        }
    }
)

bookRouter.delete("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10)
    try {
        await BookService.deleteBook(id)
        return res.status(200).json("Livro deletado com sucesso!");
    } catch (error: any) {
        res.status(500).json(error.message);
    }
})

