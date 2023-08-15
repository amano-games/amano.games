import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Box from 'components/box';
import Markdown from 'components/markdown';
import Comment from 'components/comment';

import { getComments } from './functions';

import style from './style.module.css';

const noCommentsYet = `No comments yet :<`;

function DevlogComments({ host, postId, username }) {
  const [comments, setComments] = useState([]);
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
    <div className={`${style['devlog-comments']} devlog-comments -inverted`}>
      <h3 className={`${style['devlog-comments-title']}`}>Comments</h3>
      {loadComments && !isLoading ? (
        <>
          <div className={`${style['devlog-comments-list']}`}>
            {comments.length > 0 ? (
              comments.map((item) => {
                return <Comment key={item.id} {...item} />;
              })
            ) : (
              <Box inverted>
                <Markdown className={style['post-excerpt']}>
                  {noCommentsYet}
                </Markdown>
              </Box>
            )}
          </div>
          <a
            className={`${style['devlog-comments-action']}`}
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
          className={`${style['devlog-comments-action']}`}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load comments from Mastodon'}
        </button>
      )}
    </div>
  );
}

DevlogComments.propTypes = {
  host: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default DevlogComments;
