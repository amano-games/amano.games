import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.module.css';

function getTitle({ accountHandle, isOp }) {
  if (isOp) return `Blog post author; View profile at ${accountHandle}`;
  return `View profile at ${accountHandle}`;
}

function Comment({
  className,
  id,
  url,
  displayName,
  isReply,
  isOp,
  content,
  avatarSrc,
  avatarStaticSrc,
  avatarAlt,
  accountHandle,
  accountInstance,
  accountUrl,
  createdAt,
  favouritesCount,
}) {
  const customClassName = classNames(style.comment, 'c-comment', className);
  const title = getTitle({ accountHandle, isOp });

  return (
    <article
      key={id}
      data-op={isOp}
      data-is-reply={isReply}
      className={customClassName}
    >
      <a
        className={style['comment-avatar-wrapper']}
        href={accountUrl}
        title={title}
        rel="external nofollow noopener noreferrer"
        target="_blank"
      >
        <picture className={style['comment-avatar-picture']}>
          <source
            media="(prefers-reduced-motion: no-preference)"
            srcSet={avatarSrc}
          />
          <img alt={avatarAlt} src={avatarStaticSrc} />
        </picture>
      </a>
      <header className={style['comment-header']}>
        <h4 className={style['comment-title']}>
          {isOp ? <b className={style['comment-op-badge']}>[OP] </b> : null}
          {displayName}
        </h4>
        <a
          className={style['comment-badge']}
          rel="external nofollow noopener noreferrer"
          target="_blank"
          title={accountHandle}
          href={accountUrl}
        >
          {accountInstance}
        </a>
      </header>
      <time
        dateTime={createdAt}
        className={`${style['comment-timestamp']}`}
        data-hide="desktop"
      >
        <a
          rel="external nofollow noopener noreferrer"
          target="_blank"
          title={`View comment at ${accountInstance}`}
          href={url}
        >
          {new Date(createdAt).toLocaleString('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </a>
      </time>
      <time
        dateTime={createdAt}
        className={`${style['comment-timestamp']}`}
        data-hide="mobile"
      >
        <a
          rel="external nofollow noopener noreferrer"
          target="_blank"
          title={`View comment at ${accountInstance}`}
          href={url}
        >
          {new Date(createdAt).toLocaleString('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
          })}
        </a>
      </time>
      <main
        className={style['comment-content']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {favouritesCount > 0 ? (
        <footer className={style['comment-interactions']}>
          <a href={`${url}/favourites`}>{favouritesCount}</a>
        </footer>
      ) : null}
    </article>
  );
}

Comment.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  displayName: PropTypes.node.isRequired,
  isReply: PropTypes.bool.isRequired,
  isOp: PropTypes.bool.isRequired,
  content: PropTypes.string.isRequired,
  avatarSrc: PropTypes.string.isRequired,
  avatarStaticSrc: PropTypes.string.isRequired,
  avatarAlt: PropTypes.string.isRequired,
  accountHandle: PropTypes.string.isRequired,
  accountInstance: PropTypes.string.isRequired,
  accountUrl: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  favouritesCount: PropTypes.number.isRequired,
};

Comment.defaultProps = {
  className: null,
};

export default Comment;
