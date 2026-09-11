'use client';

import { useEffect, useState } from 'react';

import Box from 'components/box';
import Markdown from 'components/markdown';
import Comment from 'components/comment';
import type { CommentData } from 'components/comment';

import { getComments } from './functions';
import './styles.css';

const noCommentsYet = `No comments yet :<`;

type Props = {
  host: string;
  postId: string;
  username: string;
};

function DevlogComments({ host, postId, username }: Props) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [loadComments, setLoadComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoadComments(false);
    setIsLoading(false);
    setComments([]);
  }, [postId]);

  useEffect(() => {
    if (!loadComments) return;
    const get = async () => {
      const res = await getComments({
        id: postId,
        host,
        username,
      });
      setComments(res);
      setIsLoading(false);
    };
    get();
  }, [loadComments]);

  return (
    <div className="c-devlog-comments -inverted">
      <h3 className="c-devlog-comments-title">Comments</h3>
      {loadComments && !isLoading ? (
        <>
          <div className="c-devlog-comments-list">
            {comments.length > 0 ? (
              comments.map((item) => {
                return <Comment key={item.id} {...item} />;
              })
            ) : (
              <Box inverted>
                <Markdown className="c-devlog-comments-excerpt">
                  {noCommentsYet}
                </Markdown>
              </Box>
            )}
          </div>
          <a
            className="c-devlog-comments-action"
            rel="external nofollow noopener noreferrer"
            target="_blank"
            href={`https://${host}/@${username}/${postId}`}
          >
            Reply on Mastodon to comment
          </a>
        </>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsLoading(true);
            setLoadComments(true);
          }}
          className="c-devlog-comments-action"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load comments from Mastodon'}
        </button>
      )}
    </div>
  );
}

export default DevlogComments;
