import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// async function userCreate(name: string) {
//   try {
//     const response = await notion.pages.create({
//       parent: { database_id: databaseId },
//       properties: {
//         title: [
//           {
//             text: {
//               content: name,
//             },
//           },
//         ],
//       },
//     });
//     console.log(response);
//   } catch (error) {
//     console.error(JSON.stringify(error));
//   }
// }

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
