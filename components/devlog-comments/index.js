import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Comment from 'components/comment';

import { getComments } from './functions';

import style from './style.module.css';

function DevlogComments({ host, postId, username }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const get = async () => {
      const res = await getComments({
        id: postId,
        host,
        username,
      });
      setComments(res);
    };
    get();
  }, []);

  return (
    <div className={`${style['devlog-comments']} devlog-comments -inverted`}>
      <h3 className={`${style['devlog-comments-title']}`}>Comments</h3>
      <div className={`${style['devlog-comments-list']}`}>
        {comments.length > 0
          ? comments.map((item) => {
              return <Comment key={item.id} {...item} />;
            })
          : null}
      </div>
      <a
        className={`${style['devlog-comments-action']}`}
        rel="external nofollow noopener noreferrer"
        target="_blank"
        href={`https://${host}/@${username}/${postId}`}
      >
        Reply on Mastodon to comment
      </a>
    </div>
  );
}

DevlogComments.propTypes = {
  host: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

export default DevlogComments;
