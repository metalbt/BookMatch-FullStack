import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function allBooks() {
  const books = await prisma.books.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  console.log(books);
  return books;
}

async function createBook(data) {
  const book = await prisma.books.create({
    data,
  });
  return book;
}

export default { allBooks, createBook };