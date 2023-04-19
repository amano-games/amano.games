import { richTextPropertyToMarkdown } from './utils';

export function getPageURL(team, id) {
  return `https://www.notion.so/indies/${id.replace(/[_-]/g, '')}`;
}

export function getPropPlainText(prop) {
  return prop.title[0]?.plain_text;
}

export function getPropUrl(prop) {
  return prop.url;
}

export function getPropEmail(prop) {
  return prop.email;
}

export function getPropCheckbox(prop) {
  return prop.checkbox;
}

export function getPropRichText(prop) {
  return richTextPropertyToMarkdown(prop);
}

export function getPropSelect(prop) {
  return prop.select?.name || null;
}

export function getPropMultiSelect(prop) {
  return prop.multi_select
    .map((item) => {
      return item.name;
    })
    .join(',');
}
