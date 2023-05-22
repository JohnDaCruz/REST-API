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
type BookWrite = {
    id: number;
    title: string;
    publicado: Date;
    isFiction: boolean;
    authoriD: number
}

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

export const getBooks = async (id: number): Promise<BookRead | null> => {
    return db.book.findUnique({
        where: {
            id,
        },
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
        }
    })
}

export const novoLivro = async (book: BookWrite): Promise<BookRead> => {
    const { title, authoriD, publicado, isFiction } = book
    const parsedDate: Date = new Date(publicado);
    return db.book.create({
        data: {
            title,
            authoriD,
            isFiction,
            publicado: parsedDate,
        },
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
        }
    })
}

export const atualizarBook = async (book: BookWrite, id: number): Promise<BookRead> => {
    const { title, isFiction, publicado, authoriD } = book
    return db.book.update({
        where: {
            id
        },
        data: {
            title,
            isFiction,
            publicado,
            authoriD
        },
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
        }
    })
}

export const deleteBook = async (id: number): Promise<void> => {
    await db.book.delete({
        where: {
            id,
        }
    })
}