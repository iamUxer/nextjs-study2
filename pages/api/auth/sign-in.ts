import { PrismaClient } from '@prisma/client';
import jwtDecode from 'jwt-decode';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

async function signIn(credential: string) {
  const decoded: { name: string; email: string; picture: string } =
    jwtDecode(credential);

  try {
    const response = await prisma.user.upsert({
      where: {
        email: decoded.email,
      },
      update: {
        name: decoded.name,
        image: decoded.picture,
      },
      create: {
        email: decoded.email,
        name: decoded.name,
        image: decoded.picture,
      },
    });

    console.log('response', response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

type Data = {
  items?: any;
  message: string;
};

async function tokenHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { credential } = req.query;
  try {
    const result = await signIn(String(credential));
    console.log('result: ', result);
    res.status(200).json({ items: result, message: 'Succeed Login' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
}
export default tokenHandler;
