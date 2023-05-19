import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import * as AuthorService from './author.service';

export const authorRouter = express.Router();

authorRouter.get('/', async (req: Request, res: Response) => {
    try {
        const author = await AuthorService.listAuthors()
        return res.status(200).json(author);
        
    } catch (error: any) {
        return res.status(400).json(error.message)
    }
})