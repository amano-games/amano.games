export function richTextToMarkdown(richText) {
  return richText.reduce((acc, curr) => {
    const { plain_text: plainText, text, annotations } = curr;
    const { link } = text;
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
    if (link) {
      parsed = `[${parsed}](${link.url})`;
    }

    return `${acc}${parsed}`;
  }, '');
}

export function richTextPropertyToMarkdown(prop) {
  const { type } = prop;
  if (type !== 'rich_text') {
    console.error(
      new Error(
        `Triying to convert non rich text db property to markdown: ${type}`
      )
    );
    return null;
  }

  return richTextToMarkdown(prop.rich_text);
}

export function propNameToKey(value) {
  const key = value
    .split(' ')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`)
    .join('');
  return `${key[0].toLowerCase()}${key.slice(1)}`;
}
