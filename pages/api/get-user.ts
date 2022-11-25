import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function userRead() {
  try {
    const response = await prisma.users.findMany();
    console.log('response : ', response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  message: string;
  items?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const users = await userRead();
    res.status(200).json({
      items: users,
      message: `Success to read Users list`,
    });
  } catch (error) {
    res.status(400).json({ message: `Failed to read` });
  }
}
