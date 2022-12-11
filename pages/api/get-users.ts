import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getOrderBy } from 'constancts/users';

const prisma = new PrismaClient();

async function usersRead(group: number, orderBy: string) {
  console.log('async group: ', group);
  const where = group
    ? {
        where: {
          group_id: group,
        },
      }
    : undefined;
  const getOrderByState = getOrderBy(orderBy);
  console.log(getOrderByState);
  try {
    const response = await prisma.users.findMany({
      ...where,
      ...getOrderByState,
    });
    console.log('response: ', response);
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
  const { group, orderBy } = req.query;

  try {
    const users = await usersRead(Number(group), String(orderBy));
    res.status(200).json({
      items: users,
      message: `Success to read Users list`,
    });
  } catch (error) {
    res.status(400).json({ message: `Failed to read` });
  }
}
