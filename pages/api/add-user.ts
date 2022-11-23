import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_AuQ2oyFKznEXlXgiqUNhiJviTjHWekFkSBmKjuc62Xc',
});

const databaseId = '7ca18616191c4f0bb835917db0b0deac';

async function userCreate(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
    console.log(response);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const name = req.query;
  console.log(name);
  if (name === null) {
    return res.status(400).json({ message: 'not exist name' });
  }
  try {
    await userCreate(String(name));
    res.status(200).json({ message: `Success ${name} created` });
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} created` });
  }
}
