import { db } from "../utils/db.server";

type Author = {
    id: number,
    nome: string,
    sobrenome: string
}

export const listAuthors = async (): Promise<Author[]> => {
    return db.author.findMany({
        select: {
            id: true,
            nome: true,
            sobrenome: true
        }
    })
}