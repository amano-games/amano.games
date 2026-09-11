export type PresskitPlatform = {
  name: string;
  url: string;
};

export type PresskitRelease = {
  name: string;
  date: string;
  url?: string;
};

export type PresskitVideoDownload = {
  name: string;
  url: string;
  bytes?: number;
  format?: string;
  error?: string;
};

export type PresskitVideo = {
  name: string;
  collapse?: boolean;
  youtube?: string;
  downloads?: PresskitVideoDownload[];
};

export type PresskitAssetItem = {
  name: string;
  url: string;
  collapse?: boolean;
  bytes?: number | null;
  format?: string;
  width?: number | null;
  height?: number | null;
  style_width?: string | number;
  error?: string;
};

export type PresskitAssetGroup = {
  title: string;
  grid?: boolean;
  items: PresskitAssetItem[];
};

export type Presskit = {
  slug?: string;
  content: string;
  genre: string;
  platforms: PresskitPlatform[];
  releases: PresskitRelease[];
  tagline: string;
  playersNum?: string;
  website?: string;
  cover?: { url: string };
  assets_bundle?: string;
  videos?: PresskitVideo[];
  assets?: PresskitAssetGroup[];
  rating?: string;
  legalLine?: string;
  mastodon?: string;
  bsky?: string;
  twitter?: string;
  youtube?: string;
};

export type PresskitField = keyof Presskit;
