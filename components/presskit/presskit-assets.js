import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Fragment } from 'react';

import styles from './styles.module.css';

function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / k ** i;

  return `${value.toFixed(decimals)} ${sizes[i]}`;
}

function PresskitAssets({ className, videos = [], images = [], bundle }) {
  const customClassName = classNames(
    styles['presskit-assets'],
    'presskit-assets',
    '-inverted',
    className
  );

  return (
    <section className={customClassName}>
      <header>
        <h1>Assets</h1>
      </header>
      {bundle ? (
        <dl>
          <dt>Download all</dt>
          <dd>
            <a href={bundle}>{bundle}</a>
          </dd>
        </dl>
      ) : null}

      {videos.length > 0 ? (
        <>
          <h2>Videos</h2>
          {videos.map((item) => {
            return (
              <Fragment key={item.name}>
                <dt>{item.name}</dt>
                {item.youtube ? (
                  <dd className={styles['yt-iframe-wrapper']}>
                    <iframe
                      className={styles['yt-iframe']}
                      title={item.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      src={`https://www.youtube.com/embed/${item.youtube}`}
                      referrerpolicy="strict-origin-when-cross-origin"
                      frameborder="0"
                      allowfullscreen
                    />
                  </dd>
                ) : null}
              </Fragment>
            );
          })}
        </>
      ) : null}
      {images.length > 0 ? (
        <>
          {images.map((section) => {
            return (
              <section key={section.title}>
                <h2>{section.title}</h2>
                <dl>
                  {section.items.map((item) => {
                    return (
                      <Fragment key={item.url}>
                        {!item.collapse ? (
                          <>
                            <dt>
                              <a href={item.url}>{item.name}</a>
                            </dt>
                            <dd>
                              <img
                                loading="lazy"
                                src={item.url}
                                alt={item.name}
                              />
                            </dd>
                            <dd>
                              {formatBytes(item.bytes)}{' '}
                              <span className={styles['img-format']}>
                                {item.format}
                              </span>
                            </dd>
                            <dd>
                              {item.width} x {item.height}
                            </dd>
                          </>
                        ) : (
                          <dd>
                            <details>
                              <summary>
                                {item.name} (
                                <a href={item.url}>
                                  <span>
                                    {item.width} x {item.height}{' '}
                                  </span>
                                  <span>{formatBytes(item.bytes)} </span>
                                  <span className={styles['img-format']}>
                                    {item.format}
                                  </span>
                                </a>
                                )
                              </summary>
                              <figure>
                                <a href={item.url}>
                                  <img
                                    loading="lazy"
                                    src={item.url}
                                    alt={item.name}
                                  />
                                </a>
                              </figure>
                            </details>
                          </dd>
                        )}
                      </Fragment>
                    );
                  })}
                </dl>
              </section>
            );
          })}
        </>
      ) : null}
    </section>
  );
}

PresskitAssets.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.arrayOf(PropTypes.shape({})),
  images: PropTypes.arrayOf(PropTypes.shape({})),
  bundle: PropTypes.string,
};

export default PresskitAssets;
