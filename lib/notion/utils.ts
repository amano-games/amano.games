import type {
  PageObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client';

export function richTextToMarkdown(richText: RichTextItemResponse[]) {
  return richText.reduce((acc, curr) => {
    const { plain_text: plainText, annotations } = curr;
    const { bold, code, italic, strikethrough } = annotations;

    let parsed = plainText;

    if (italic) {
      parsed = `_${parsed}_`;
    }
    if (bold) {
      parsed = `**${parsed}**`;
    }
    if (code) {
      parsed = `\`${parsed}\``;
    }
    if (strikethrough) {
      parsed = `~~${parsed}~~`;
    }
    if (curr.type === 'text' && curr.text.link) {
      parsed = `[${parsed}](${curr.text.link.url})`;
    }

    return `${acc}${parsed}`;
  }, '');
}

type NotionProperty = PageObjectResponse['properties'][string];
type RichTextProperty = Extract<NotionProperty, { type: 'rich_text' }>;

export function richTextPropertyToMarkdown(prop: NotionProperty) {
  const { type } = prop;
  if (type !== 'rich_text') {
    console.error(
      new Error(
        `Triying to convert non rich text db property to markdown: ${type}`
      )
    );
    return null;
  }

  return richTextToMarkdown((prop as RichTextProperty).rich_text);
}

export function propNameToKey(value: string) {
  const key = value
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join('');
  return `${key[0].toLowerCase()}${key.slice(1)}`;
}
