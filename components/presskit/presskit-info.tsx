import classNames from 'classnames';

import Markdown from 'components/markdown';
import { parseMastodonHandle } from 'lib/mastodon';

import {
  bsky as defaultBsky,
  twitter as defaultTwitter,
  youtube as defaultYoutube,
  mastodon as defaultMastodon,
} from 'lib/site';
import type { PresskitPlatform, PresskitRelease } from 'types/presskit';

type Props = {
  title: string;
  aboutDev: string;
  content: string;
  className?: string;
  genre: string;
  platforms: PresskitPlatform[];
  releases: PresskitRelease[];
  rating?: string;
  playersNum?: string;
  tagline: string;
  legalLine?: string;
  website?: string;
  mastodon?: string;
  bsky?: string;
  twitter?: string;
  youtube?: string;
};

function PresskitInfo({
  className,
  title,
  genre,
  content,
  platforms,
  releases,
  rating,
  playersNum,
  tagline,
  legalLine,
  website,
  aboutDev,
  mastodon = defaultMastodon,
  bsky = defaultBsky,
  twitter = defaultTwitter,
  youtube = defaultYoutube,
}: Props) {
  const customClassName = classNames('c-presskit-info', '-inverted', className);
  const mastodonData = parseMastodonHandle(mastodon);

  return (
    <section className={customClassName}>
      <header>
        <h1>Fact sheet</h1>
      </header>

      <dl>
        <dt>Title</dt>
        <dd>{title}</dd>

        <dt>Developer</dt>
        <dd>Amano</dd>

        <dt>Genre</dt>
        <dd>{genre}</dd>

        <dt>Platforms</dt>
        {platforms.map((item) => {
          return (
            <dd key={item.url}>
              <a href={item.url}>{item.name}</a>
            </dd>
          );
        })}

        {rating ? (
          <>
            <dt>Rating</dt>
            <dd>{rating}</dd>
          </>
        ) : null}

        {playersNum ? (
          <>
            <dt>Number of players</dt>
            <dd>{playersNum}</dd>
          </>
        ) : null}

        <dt>Releases</dt>
        {releases.map((item) => {
          return (
            <dd key={`${item.name}-${item.date}`}>
              {item.name} (<span>{item.date}</span>)
            </dd>
          );
        })}

        <dt>Tagline</dt>
        <dd>{tagline}</dd>

        <dt>Description</dt>
        <dd className="c-presskit-info-content">
          <Markdown>{content}</Markdown>
        </dd>

        <dt>About Amano</dt>
        <dd className="c-presskit-info-content">
          <Markdown>{aboutDev}</Markdown>
        </dd>

        {legalLine ? (
          <>
            <dt>Legal Line</dt>
            <dd>{legalLine}</dd>
          </>
        ) : null}

        <dt>Official website</dt>
        <dd>
          <a href={website}>{website}</a>
        </dd>

        <dt>Bluesky</dt>
        <dd>
          <a href={`https://bsky.app/profile/${bsky}`}>@{bsky}</a>
        </dd>

        <dt>Mastodon</dt>
        <dd>
          <a
            href={`https://${mastodonData.instance}/@${mastodonData.username}`}
          >
            {mastodon}
          </a>
        </dd>

        <dt>Twitter</dt>
        <dd>
          <a href={`https://twitter.com/${twitter}`}>@{twitter}</a>
        </dd>

        <dt>YouTube</dt>
        <dd>
          <a href={`https://www.youtube.com/${youtube}`}>@{youtube}</a>
        </dd>
      </dl>
    </section>
  );
}

export default PresskitInfo;
