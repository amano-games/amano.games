import PropTypes from 'prop-types';
import Link from 'next/link';

import { getAllPosts } from 'lib/api';
import { url } from 'lib/site';

import { LayoutDevlog } from 'components/layouts';
import Seo from 'components/seo';
import Box from 'components/box';

import style from './style.module.css';

const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

const dateFormat = new Intl.DateTimeFormat('en-UK', {
  year: 'numeric',
});

function Archive({ allPosts = [] }) {
  const list = allPosts.reduce((acc, item) => {
    const key = dateFormat.format(Date.parse(item.date));
    const group = acc[key] || [];
    group.push(item);
    acc[key] = group;
    return acc;
  }, {});

  return (
    <LayoutDevlog>
      <Seo title="AMANO Devlog" image={`${url}/devlog-preview.png`} />
      <div className={`${style['devlog-archive']} wrapper -inverted`}>
        <header className={`${style['devlog-archive-header']}`}>
          <h1 className={`${style['devlog-archive-header-title']}`}>Archive</h1>
        </header>
        <Box inverted>
          {[...Object.entries(list)].reverse().map(([key, value]) => {
            return (
              <section key={key}>
                <header className={`${style['devlog-archive-section-header']}`}>
                  <h3>{key}</h3>
                </header>
                <ol className={`${style['devlog-archive-list']}`}>
                  {value.map((item) => {
                    const datePosted = new Date(item.date);
                    const dateParsed = datePosted.toLocaleDateString(
                      undefined,
                      options
                    );
                    const tagsArr = item.tags.split(',');
                    const slugEncoded = encodeURIComponent(item.slug);
                    return (
                      <li
                        key={item.slug}
                        className={`${style['devlog-archive-list-item']}`}
                      >
                        <Link
                          href={`/devlog/${slugEncoded}`}
                          className={`${style['devlog-archive-list-item-inner']}`}
                        >
                          <span
                            className={`${style['post-date']}`}
                            data-hide="mobile"
                          >
                            <time>{dateParsed}</time>
                          </span>
                          <span>{item.title}</span>
                        </Link>
                        {tagsArr.length > 0 ? (
                          <div
                            className={style['post-tags']}
                            data-hide="mobile"
                          >
                            {tagsArr.map((tag) => {
                              return <span key={tag}>#{tag}</span>;
                            })}
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </section>
            );
          })}
        </Box>
      </div>
    </LayoutDevlog>
  );
}

Archive.propTypes = {
  allPosts: PropTypes.arrayOf(PropTypes.shape({})),
};

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'publish',
    'title',
    'date',
    'slug',
    'authors',
    'excerpt',
    'tags',
    'cover',
    'content',
    'mastodon',
  ]).filter((item) => item.publish);

  return {
    props: { allPosts },
  };
}

export default Archive;
