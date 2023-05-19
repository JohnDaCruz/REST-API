import { db } from "../src/utils/db.server";

type Author = {
    nome: string;
    sobrenome: string;
};

type Book = {
    title: string;
    isFiction: boolean;
    publicado: Date;
};

async function seed() {
    await Promise.all(
        getAuthors().map((author) => {
            return db.author.create({
                data: {
                    nome: author.nome,
                    sobrenome: author.sobrenome
                },
            });
        })
    );
    const author = await db.author.findFirst({
        where: {
            nome: "Mark"
        },
    });

    await Promise.all(
        getBooks().map((book) => {
            const { title, isFiction, publicado } = book;
            return db.book.create({
                data: {
                    title,
                    isFiction,
                    publicado,
                    authoriD: author!.id,
                },
            });
        })
    );
}

seed();

function getAuthors(): Array<Author> {
    return [
        {
            nome: "Mark",
            sobrenome: "Twain"
        },
        {
            nome: "Machado",
            sobrenome: "de Assis"
        }
    ]
}

function getBooks(): Array<Book> {
    return [
        {
            title: "The Adventures of Tom Sawyer",
            isFiction: true,
            publicado: new Date()
        },
        {
            title: "O Alienista",
            isFiction: true,
            publicado: new Date()
        },
    ]
}


