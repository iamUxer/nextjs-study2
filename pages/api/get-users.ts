import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { getOrderBy } from 'constants/users';

const prisma = new PrismaClient();

async function usersRead(group: number, orderBy: string, contains: string) {
  console.log('async contains: ', contains);
  const getContainsState =
    contains && contains !== ''
      ? {
          name: { contains: contains },
        }
      : undefined;
  const where = group
    ? {
        group_id: group,
        ...getContainsState,
      }
    : getContainsState
    ? getContainsState
    : undefined;
  const getOrderByState = getOrderBy(orderBy);
  try {
    const response = await prisma.users.findMany({
      where: where,
      ...getOrderByState,
    });
    // console.log('response: ', response);
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
  const { group, orderBy, contains } = req.query;

  try {
    const users = await usersRead(
      Number(group),
      String(orderBy),
      String(contains)
    );
    res.status(200).json({
      items: users,
      message: `Success to read Users list`,
    });
  } catch (error) {
    res.status(400).json({ message: `Failed to read` });
  }
}
