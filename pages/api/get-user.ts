import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_AuQ2oyFKznEXlXgiqUNhiJviTjHWekFkSBmKjuc62Xc',
});

const databaseId = '7ca18616191c4f0bb835917db0b0deac';

async function userRead() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'name',
          direction: 'ascending',
        },
      ],
    });
    // console.log(response);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  message: string;
  items?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const response = await userRead();
    res.status(200).json({
      items: response?.results,
      message: `Success to read Users list`,
    });
  } catch (error) {
    res.status(400).json({ message: `Failed to read` });
  }
}
