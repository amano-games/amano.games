import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

import type { Post, PostField } from 'types/post';
import type { Presskit, PresskitField } from 'types/presskit';

const postsDirectory = join(process.cwd(), '_posts');
const presskitsDirectory = join(process.cwd(), '_presskits');

export function isEnoent(error: unknown) {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'ENOENT'
  );
}

export function postsAllSlugsGet() {
  return fs.readdirSync(postsDirectory);
}

export function postBySlugGet<T extends PostField>(
  slug: string,
  fields: T[] = [] as T[]
): Pick<Post, T> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Partial<Post> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items.slug = realSlug;
    }
    if (field === 'content') {
      items.content = content;
    }

    if (data[field]) {
      items[field] = data[field] as Post[typeof field];
    }
  });

  return items as Pick<Post, T>;
}

export function postsAllGet<T extends PostField>(fields: T[] = [] as T[]) {
  const slugs = postsAllSlugsGet();
  const items = slugs
    .map((slug) => postBySlugGet(slug, fields))
    // sort posts by date in descending order
    .sort((item, item2) => {
      const a = 'date' in item ? String(item.date) : '';
      const b = 'date' in item2 ? String(item2.date) : '';
      return a > b ? -1 : 1;
    });
  return items;
}

export function presskitsAllSlugsGet() {
  return fs.readdirSync(presskitsDirectory);
}

export function presskitBySlugGet<T extends PresskitField>(
  slug: string,
  fields: T[] = [] as T[]
): Pick<Presskit, T> {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(presskitsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items: Partial<Presskit> = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items.slug = realSlug;
    }
    if (field === 'content') {
      items.content = content;
    }

    if (data[field]) {
      items[field] = data[field] as Presskit[typeof field];
    }
  });

  return items as Pick<Presskit, T>;
}

export function presskitsAllGet<T extends PresskitField>(
  fields: T[] = [] as T[]
) {
  const slugs = presskitsAllSlugsGet();
  const items = slugs.map((slug) => presskitBySlugGet(slug, fields));
  return items;
}

export function routeSlug(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}
