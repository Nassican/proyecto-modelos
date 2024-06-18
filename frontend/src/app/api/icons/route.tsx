// pages/api/icons.ts


import path from 'path';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

interface IconItem {
  name: string;
  url: string;
}

const getIconList = (): IconItem[] => {
  const iconsFolderPath = path.join(process.cwd(), 'public', 'icons');
  const iconFiles = fs.readdirSync(iconsFolderPath);

  const iconList: IconItem[] = iconFiles
    .filter((file) => file.endsWith('.svg'))
    .map((file): IconItem => {
      const name = file.replace('.svg', '');
      const url = `/icons/${file}`;
      return { name, url };
    });

  return iconList;
};


export function GET(
  req: NextApiRequest,
  res: NextApiResponse<IconItem[]>
) {

  const iconList = getIconList();

  return NextResponse.json(iconList);
}
