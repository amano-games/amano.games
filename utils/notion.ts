import {
  Client,
  isFullBlock,
  isFullDatabase,
  isFullPage,
} from '@notionhq/client';
import slugify from 'slugify';

import { richTextToMarkdown } from 'lib/notion/utils';
import { parseTableItems } from 'lib/notion';
import type { Game } from 'types/game';
import type { Manita } from 'types/manita';

export const ABOUTUS_PAGE_ID = '16545b37f4e642a7a4687a2b5e0b9d85';
export const GAMES_DB_ID = '89794766645149c2a79bb64a72c75d1b';
export const MANITAS_DB_ID = 'db6aafe3a3c644d3a84a59657f82436a';
export const CHANGELOGS_IDS: Record<string, string> = {
  'pullfrog-deluxe': '8366bcc2-e5ee-4a49-98ea-25d43279b405',
  catchadiablos: '208b113f991f802f9c67ca8cd4b4ec9a',
  'devils-on-the-moon-pinball': '32fb113f991f8074bb24cd1c4ea1f60b',
};

export function getClient() {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  return notion;
}

type TableClient = {
  databases: {
    retrieve: Client['databases']['retrieve'];
  };
  dataSources: {
    query: Client['dataSources']['query'];
  };
};

export async function getTableItems(
  databaseId: string,
  notion: TableClient = getClient()
) {
  const database = await notion.databases.retrieve({
    database_id: databaseId,
  });
  const dataSourceId = isFullDatabase(database)
    ? database.data_sources[0]?.id
    : undefined;

  if (dataSourceId == null) {
    throw new Error(`No data source for database ${databaseId}`);
  }

  const data = await notion.dataSources.query({
    data_source_id: dataSourceId,
  });

  const pages = data.results.filter(isFullPage);
  return parseTableItems(pages);
}

export async function getGames(): Promise<Game[]> {
  const items = await getTableItems(GAMES_DB_ID);
  return items.map((item) => {
    const name = String(item.name ?? '');
    return {
      ...item,
      name,
      slug: slugify(name, { lower: true }),
    } as Game;
  });
}

export async function getManitas(): Promise<Manita[]> {
  const items = await getTableItems(MANITAS_DB_ID);
  return items as unknown as Manita[];
}

export async function getAboutUs() {
  const notion = getClient();
  const data = await notion.blocks.children.list({
    block_id: ABOUTUS_PAGE_ID,
    page_size: 50,
  });

  const blocks = data.results.map((block) => {
    if (!isFullBlock(block) || block.type !== 'paragraph') {
      return '';
    }

    return richTextToMarkdown(block.paragraph.rich_text);
  });

  return blocks;
}

export async function getChangelog(slug: string) {
  const id = CHANGELOGS_IDS[slug];
  if (id == null) return null;

  const notion = getClient();
  const data = await notion.blocks.children.list({
    block_id: id,
    page_size: 50,
  });

  const blocks = data.results.map((block) => {
    if (!isFullBlock(block)) {
      return '';
    }

    switch (block.type) {
      case 'paragraph':
        return richTextToMarkdown(block.paragraph.rich_text);
      case 'heading_1':
        return `# ${richTextToMarkdown(block.heading_1.rich_text)}`;
      case 'heading_2':
        return `## ${richTextToMarkdown(block.heading_2.rich_text)}`;
      case 'heading_3':
        return `### ${richTextToMarkdown(block.heading_3.rich_text)}`;
      case 'bulleted_list_item':
        return `- ${richTextToMarkdown(block.bulleted_list_item.rich_text)}`;
      case 'divider':
        return `---`;
      default:
        console.warn(`Block type not recognized ${block.type}`);
        return '';
    }
  });

  return blocks;
}
