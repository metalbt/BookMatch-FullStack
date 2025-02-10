import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function readUserByEmail(email) {
  return await prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function createUser(data) {
  return await prisma.user.create({
    data,
  });
}

async function updateImage({ userId, path }) {
  const newImage = await prisma.user.update({
    where: {
     id: userId,
    },
    data: {
      image_url: path,
    },
  });

  return newImage;
}

async function updateBack({ userId, path }) {
  const newImage = await prisma.user.update({
    where: {
     id: userId,
    },
    data: {
      back_url: path,
    },
  });

  return newImage;
}

export default { readUserByEmail, createUser, updateImage, updateBack };
