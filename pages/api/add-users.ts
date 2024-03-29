import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from '@prisma/client';
import { type } from 'os';

const prisma = new PrismaClient();

async function createUsers(
  name: string,
  phone_number: number | null,
  group_id?: number | null,
  // birthday?: string | Date,
  description?: string,
  image_url?: string
) {
  try {
    if (name) {
      const response = await prisma.users.create({
        data: {
          name: name,
          phone_number: phone_number!,
          group_id: group_id!,
          // birthday: birthday || null,
          description: description as string,
          image_url: image_url || '',
        },
      });
      console.log('response : ', response);
      return response;
    }
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
  const { name, phone_number, group_id, birthday, description, image_url } =
    JSON.parse(req.body);
  console.log('JSON.parse:::', JSON.parse(req.body));
  try {
    const users = await createUsers(
      String(name),
      Number(phone_number),
      Number(group_id),
      // String(birthday),
      String(description),
      Object(image_url)
    );
    res.status(200).json({ items: users, message: `Success users created` });
  } catch (error) {
    res.status(400).json({ message: `Failed users created` });
  }
}
