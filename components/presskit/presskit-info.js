import PropTypes from 'prop-types';
import classNames from 'classnames';

import Markdown from 'components/markdown';

import {
  bsky as defaultBsky,
  twitter as defaultTwitter,
  youtube as defaultYoutube,
} from 'lib/site';

import styles from './styles.module.css';

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
  bsky = defaultBsky,
  twitter = defaultTwitter,
  youtube = defaultYoutube,
}) {
  const customClassName = classNames(
    styles['presskit-info'],
    'presskit-info',
    '-inverted',
    className
  );

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
        <dd className={styles['presskit-content']}>
          <Markdown>{content}</Markdown>
        </dd>

        <dt>About Amano</dt>
        <dd className={styles['presskit-content']}>
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

PresskitInfo.propTypes = {
  title: PropTypes.string.isRequired,
  aboutDev: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  genre: PropTypes.string.isRequired,
  platforms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  releases: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  rating: PropTypes.string,
  playersNum: PropTypes.string,
  tagline: PropTypes.string.isRequired,
  legalLine: PropTypes.string,
  website: PropTypes.string,
  bsky: PropTypes.string,
  twitter: PropTypes.string,
  youtube: PropTypes.string,
};

export default PresskitInfo;
