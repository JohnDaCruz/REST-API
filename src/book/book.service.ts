import { db } from "../utils/db.server";
import { Author } from "../author/author.service";

type BookRead = {
    id: number;
    title: string;
    publicado: Date;
    isFiction: boolean;
    author: Author
    //authoriD: number;
};

export const listBooks = async (): Promise<BookRead[]> => {
    return db.book.findMany({
        select: {
            id: true,
            title: true,
            publicado: true,
            isFiction: true,
            author: {
                select: {
                    id: true,
                    nome: true,
                    sobrenome: true,
                }
            }
            // authoriD: true,

        }
    })
}

export const getBook = async (id: number): Promise<BookRead | null> => {
    return db.book.findUnique({
        where: {
            id: id,
        }
    })
}