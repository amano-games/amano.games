import { Client } from '@notionhq/client';
import slugify from 'slugify';

import { richTextToMarkdown } from 'lib/notion/utils';
import { parseTableItems } from 'lib/notion';

export const ABOUTUS_PAGE_ID = '16545b37f4e642a7a4687a2b5e0b9d85';
export const GAMES_DB_ID = '89794766645149c2a79bb64a72c75d1b';
export const MANITAS_DB_ID = 'db6aafe3a3c644d3a84a59657f82436a';

export function getClient() {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  return notion;
}

export async function getTableItems(databaseId) {
  const notion = getClient();
  const data = await notion.databases.query({
    database_id: databaseId,
  });

  const items = parseTableItems(data.results);
  return items;
}

export async function getGames() {
  const items = await getTableItems(GAMES_DB_ID);
  return items.map((item) => ({
    slug: slugify(item.name, { lower: true }),
    ...item,
  }));
}

export async function getManitas() {
  return getTableItems(MANITAS_DB_ID);
}

export async function getAboutUs() {
  const notion = getClient();
  const data = await notion.blocks.children.list({
    block_id: ABOUTUS_PAGE_ID,
    page_size: 50,
  });

  const blocks = data.results.map((block) =>
    richTextToMarkdown(block.paragraph.rich_text)
  );

  return blocks;
}
