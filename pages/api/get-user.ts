import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function userRead(id: number) {
  console.log('async ID : ', id);
  try {
    const response = await prisma.users.findUnique({
      where: {
        id: id,
      },
    });
    console.log('response : ', response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  info?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  console.log('req.query :', req.query);
  console.log('type ::: ', typeof id);
  if (!id) {
    res.status(400).json({ message: `not found ID` });
  }
  try {
    const user = await userRead(Number(id));
    res.status(200).json({
      info: user,
      message: `Success to read User Info`,
    });
  } catch (error) {
    res.status(400).json({ message: `Failed to read for ID: ${id}` });
  }
}
