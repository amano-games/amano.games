import Markdown from 'components/markdown';
import { createMetadata } from 'lib/metadata';
import { gameBySlug } from 'lib/game';
import { url } from 'lib/site';
import { getChangelog } from 'utils/notion';

import './styles.css';

export const dynamic = 'force-static';

function toMetaDescription(section: string) {
  return section
    .replace(/[#_*`>-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const [game, changelog] = await Promise.all([
    gameBySlug(slug),
    getChangelog(slug),
  ]);
  const changelogText = changelog ? changelog.join('\n\n') : null;
  const firstSection = changelogText
    ? toMetaDescription(changelogText.split('\n---\n')[0].trim())
    : undefined;

  return createMetadata({
    title: `${game.name} | Changelog`,
    description: firstSection,
    image: `${url}/games/${game.slug}.png`,
    path: `/game/${slug}/changelog`,
  });
}

export default async function GameChangelog({ params }: Props) {
  const { slug } = await params;
  const [game, changelog] = await Promise.all([
    gameBySlug(slug),
    getChangelog(slug),
  ]);
  const changelogText = changelog ? changelog.join('\n\n') : null;

  return (
    <section className="p-game-changelog">
      <header className="p-game-changelog-header">
        <div className="p-game-changelog-header-wrapper wrapper">
          <h1>{game.name}</h1>
          <h3>Changelog</h3>
        </div>
      </header>
      <div className="p-game-changelog-content wrapper">
        <img
          className="p-game-changelog-cover"
          src={`/games/${game.slug}.png`}
          alt={game.name}
        />
        {changelogText ? (
          <Markdown className="p-game-changelog-text -inverted">
            {changelogText}
          </Markdown>
        ) : null}
      </div>
    </section>
  );
}
