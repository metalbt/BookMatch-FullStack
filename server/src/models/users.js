import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function readUserByEmail(email){
    return await prisma.user.findFirst({
        where:{
            email
        }
    })
}

async function createUser(data) {
    return await prisma.user.create({
        data
    })
}

export default { readUserByEmail, createUser};