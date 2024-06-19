import fs from 'fs';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

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

export const GET = async (request: NextRequest) => {
  const iconList = getIconList();
  return NextResponse.json(iconList);
};
