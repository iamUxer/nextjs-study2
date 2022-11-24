import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';
import { PropertySafetyFilled } from '@ant-design/icons';

const notion = new Client({
  auth: 'secret_AuQ2oyFKznEXlXgiqUNhiJviTjHWekFkSBmKjuc62Xc',
});

const databaseId = '7ca18616191c4f0bb835917db0b0deac';

async function userDetailRead(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  message: string;
  detail?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { pageId, propertyId } = req.query;
    const response = await userDetailRead(String(pageId), String(propertyId));
    res.status(200).json({
      detail: response,
      message: `Success to read User Info`,
    });
  } catch (error) {
    res.status(400).json({ message: `Failed to read` });
  }
}
