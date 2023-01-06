import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUsers(users: any) {
  try {
    const response = await prisma.user.create({
      data: { ...users },
    });
    console.log('response : ', response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const users = req.body;
  console.log('users: ', users);
  try {
    await createUsers(users);
    res.status(200).json({ message: `Success ${users} created` });
  } catch (error) {
    res.status(400).json({ message: `Failed ${users} created` });
  }
}
