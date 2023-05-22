"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_server_1 = require("../src/utils/db.server");
async function seed() {
    await Promise.all(getAuthors().map((author) => {
        return db_server_1.db.author.create({
            data: {
                nome: author.nome,
                sobrenome: author.sobrenome
            },
        });
    }));
    const author = await db_server_1.db.author.findFirst({
        where: {
            nome: "Mark"
        },
    });
    await Promise.all(getBooks().map((book) => {
        const { title, isFiction, publicado } = book;
        return db_server_1.db.book.create({
            data: {
                title,
                isFiction,
                publicado,
                authoriD: author.id,
            },
        });
    }));
}
seed();
function getAuthors() {
    return [
        {
            nome: "Mark",
            sobrenome: "Twain"
        },
        {
            nome: "Machado",
            sobrenome: "de Assis"
        }
    ];
}
function getBooks() {
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
    ];
}
