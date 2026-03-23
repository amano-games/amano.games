import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const postsDirectory = join(process.cwd(), '_posts');
const presskitsDirectory = join(process.cwd(), '_presskits');

export function postsAllSlugsGet() {
  return fs.readdirSync(postsDirectory);
}

export function postBySlugGet(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function postsAllGet(fields = []) {
  const slugs = postsAllSlugsGet();
  const items = slugs
    .map((slug) => postBySlugGet(slug, fields))
    // sort posts by date in descending order
    .sort((item, item2) => (item.date > item2.date ? -1 : 1));
  return items;
}

export function presskitsAllSlugsGet() {
  return fs.readdirSync(presskitsDirectory);
}

export function presskitBySlugGet(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(presskitsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function presskitsAllGet(fields = []) {
  const slugs = presskitsAllSlugsGet();
  const items = slugs.map((slug) => presskitBySlugGet(slug, fields));
  return items;
}
