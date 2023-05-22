import express from "express"
import { Request, Response } from "express"
import { body, validationResult } from "express-validator"

import * as BookService from "./book.service"

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
        const book = await BookService.getBook(id);
        if (book) {
            return res.status(200).json(book);
        }
        return res.status(400).json("Livro ñ encontrado");
    } catch (error: any) {
        return res.status(400).json(error.message);
    }
});
