/* eslint-disable react/no-danger */
import type { ReactNode } from 'react';
import classNames from 'classnames';
import './styles.css';

function getTitle({
  accountHandle,
  isOp,
}: {
  accountHandle: string;
  isOp: boolean;
}) {
  if (isOp) return `Blog post author; View profile at ${accountHandle}`;
  return `View profile at ${accountHandle}`;
}

export type CommentData = {
  className?: string;
  id: string;
  url: string;
  displayName: ReactNode;
  isReply: boolean;
  isOp: boolean;
  content: string;
  avatarSrc: string;
  avatarStaticSrc: string;
  avatarAlt: string;
  accountHandle: string;
  accountInstance: string;
  accountUrl: string;
  createdAt: string;
};

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
}: CommentData) {
  const customClassName = classNames('c-comment', className);
  const title = getTitle({ accountHandle, isOp });

  return (
    <article
      key={id}
      data-op={isOp}
      data-is-reply={isReply}
      className={customClassName}
    >
      <a
        className="c-comment-avatar-wrapper"
        href={accountUrl}
        title={title}
        rel="external nofollow noopener noreferrer"
        target="_blank"
      >
        <picture className="c-comment-avatar-picture">
          <source
            media="(prefers-reduced-motion: no-preference)"
            srcSet={avatarSrc}
          />
          <img alt={avatarAlt} src={avatarStaticSrc} />
        </picture>
      </a>
      <header className="c-comment-header">
        <h4 className="c-comment-title">
          {isOp ? <b className="c-comment-op-badge">[OP] </b> : null}
          {displayName}
        </h4>
        <a
          className="c-comment-badge"
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
        className="c-comment-timestamp"
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
        className="c-comment-timestamp"
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
        className="c-comment-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
}

export default Comment;
