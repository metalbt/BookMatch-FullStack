import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const file = resolve('prisma', 'livros.json');
  const seedData = JSON.parse(readFileSync(file, 'utf-8'));

  // Inserir dados de usuários
  const userMap = {};
  for (const user of seedData.users) {
    const createdUser = await prisma.user.create({
      data: user,
    });
    userMap[user.email] = createdUser.id;
  }

  // Inserir dados de livros
  for (const book of seedData.books) {
    const userId = userMap[seedData.users[0].email]; // Associa todos os livros ao primeiro usuário
    await prisma.books.create({
      data: {
        ...book,
        userId: userId,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });