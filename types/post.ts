export type Author = {
  name: string;
  url?: string;
  mastodon?: string;
  twitter?: string;
};

export type MastodonRef = {
  host: string;
  postId: string;
  username: string;
};

export type PostCover = {
  url: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  authors: Author[];
  content?: string;
  excerpt?: string;
  tags?: string[];
  cover?: PostCover;
  featured?: boolean;
  publish?: boolean;
  mastodon?: MastodonRef;
};

export type PostField = keyof Post;
