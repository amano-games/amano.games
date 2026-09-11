import type { PageObjectResponse } from '@notionhq/client';

import { richTextPropertyToMarkdown } from './utils';

type NotionProperty = PageObjectResponse['properties'][string];
type TitleProperty = Extract<NotionProperty, { type: 'title' }>;
type UrlProperty = Extract<NotionProperty, { type: 'url' }>;
type EmailProperty = Extract<NotionProperty, { type: 'email' }>;
type CheckboxProperty = Extract<NotionProperty, { type: 'checkbox' }>;
type SelectProperty = Extract<NotionProperty, { type: 'select' }>;
type MultiSelectProperty = Extract<NotionProperty, { type: 'multi_select' }>;

export function getPageURL(_team: string, id: string) {
  return `https://www.notion.so/indies/${id.replace(/[_-]/g, '')}`;
}

export function getPropPlainText(prop: TitleProperty) {
  return prop.title[0]?.plain_text;
}

export function getPropUrl(prop: UrlProperty) {
  return prop.url;
}

export function getPropEmail(prop: EmailProperty) {
  return prop.email;
}

export function getPropCheckbox(prop: CheckboxProperty) {
  return prop.checkbox;
}

export function getPropRichText(prop: NotionProperty) {
  return richTextPropertyToMarkdown(prop);
}

export function getPropSelect(prop: SelectProperty) {
  return prop.select?.name || null;
}

export function getPropMultiSelect(prop: MultiSelectProperty) {
  return prop.multi_select
    .map((item) => {
      return item.name;
    })
    .join(',');
}
