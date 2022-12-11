import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getGroups() {
  try {
    const response = await prisma.groups.findMany();
    // console.log('response groups : ', response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const users = await getGroups();
    res.status(200).json({
      items: users,
      message: `Success to read Users list`,
    });
  } catch (error) {
    res.status(400).json({ message: `Failed to read` });
  }
}
