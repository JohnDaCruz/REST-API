import { db } from "../utils/db.server";

export type Author = {
    id: number,
    nome: string,
    sobrenome: string,
}

export const listAuthors = async (): Promise<Author[]> => {
    return db.author.findMany({
        select: {
            id: true,
            nome: true,
            sobrenome: true,
        }
    })
}

export const getAuthor = async (id: number): Promise<Author | null> => {
    return db.author.findUnique({
        where: {
            id: id,
        }
    })
}

export const novoAutor = async (author: Omit<Author, "id">): Promise<Author> => {
    const { nome, sobrenome } = author
    return db.author.create({
        data: {
            nome,
            sobrenome
        },
        select: {
            id: true,
            nome: true,
            sobrenome: true
        }
    })
}

export const atualizarAutor = async (author: Omit<Author, "id">, id: number): Promise<Author> => {
    const { nome, sobrenome } = author;
    return db.author.update({
        where: { id },
        data: {
            nome: nome,
            sobrenome: sobrenome
        },
        select: { id: true, nome: true, sobrenome: true },
    })
}

export const deletarAutor = async (id: number): Promise<void> => {
    await db.author.delete({
        where: { id: id }
    })
}