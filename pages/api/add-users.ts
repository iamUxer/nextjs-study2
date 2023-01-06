import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createUsers({
  name,
  phone_number,
  group_id,
  birthday,
  description,
  image_url,
}: {
  name: string;
  phone_number: number;
  group_id: number;
  birthday: string;
  description: string;
  image_url: object;
}) {
  console.log('async:', name, phone_number, group_id, birthday);
  try {
    const response = await prisma.users.create({
      create: {
        birthday,
      },
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
  const users = JSON.parse(req.body);
  console.log('users: ', users);
  try {
    await createUsers({
      name: String(users.name),
      phone_number: Number(users.phone_number),
      group_id: Number(users.group_id),
      birthday: String(users.birthday),
      description: String(users.description),
      image_url: Object(users.image_url),
    });
    res.status(200).json({ message: `Success ${users} created` });
  } catch (error) {
    res.status(400).json({ message: `Failed ${users} created` });
  }
}
