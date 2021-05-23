export function getBlockText(block) {
  const { type } = block;
  if (type === 'unsupported') return null;

  const { text } = block[type];

  return text[0]?.plain_text;
}

export function getPageURL(team, id) {
  return `https://www.notion.so/indies/${id.replace(/[_-]/g, '')}`;
}

export function richTextToMarkdown(block) {
  const { type } = block;
  if (type !== 'rich_text') {
    console.error(
      new Error('Triying to convert non rich text block to markdown')
    );
    return null;
  }

  return block.rich_text.reduce((acc, curr) => {
    const { plain_text: text, annotations, href } = curr;
    const { bold, code, italic, strikethrough } = annotations;
    const url = href && new URL(href);
    let path = href;

    if (url?.hostname === 'amano.games') {
      path = url.pathname;
    }

    let parsed = text;

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
    if (path) {
      parsed = `[${parsed}](${path})`;
    }

    return `${acc}${parsed}`;
  }, '');
}

export function parseManitas(manitas) {
  return manitas
    .map((event) => {
      const { properties } = event;
      const {
        title: titleProp,
        subtitle: subtitleProp,
        description: descriptionProp,
        itchio: itchioProp,
        twitter: twitterProp,
        email: emailProp,
        avatar: avatarProp,
        instagram: instagramProp,
        web: webProp,
      } = properties;

      if (!titleProp.title[0]) return null;

      return {
        title: titleProp.title[0].plain_text,
        subtitle: richTextToMarkdown(subtitleProp),
        description: richTextToMarkdown(descriptionProp),
        itchio: itchioProp.url,
        twitter: richTextToMarkdown(twitterProp),
        email: emailProp.email,
        avatar: avatarProp.url,
        instagram: richTextToMarkdown(instagramProp),
        web: webProp.url,
      };
    })
    .filter(Boolean);
}

export function parseGames(games) {
  return games
    .map((game) => {
      const { properties } = game;
      const {
        name: nameProp,
        subtitle: subtitleProp,
        description: descriptionProp,
        trailer: trailerProp,
        itch: itchProp,
        newgrounds: newgroundsProp,
        lexaloffle: lexaloffleProp,
        publish: publishProp,
        featured: featuredProp,
      } = properties;

      if (!nameProp.title[0]) return null;

      return {
        name: nameProp.title[0].plain_text,
        subtitle: richTextToMarkdown(subtitleProp),
        description: richTextToMarkdown(descriptionProp),
        trailer: trailerProp?.url,
        itch: itchProp?.url,
        newgrounds: newgroundsProp?.url,
        lexaloffle: lexaloffleProp?.url,
        publish: publishProp.checkbox,
        featured: featuredProp.checkbox,
      };
    })
    .filter(Boolean);
}
