import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name } = req.query;
  if (name === null) {
    return res.status(400).json({ message: 'not exist name' });
  }
  try {
    // await userCreate(String(name));
    res.status(200).json({ message: `Success ${name} created` });
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} created` });
  }
}
