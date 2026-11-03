import { localePath, type Locale } from '@/i18n/locales'

import { sortPostsByDateDesc } from '@filecoin-foundation/utils/sortBlogPosts'

import { PATHS } from '@/constants/paths'

import type { Article } from '@/data/news'

import { getBlogPostsData } from '@/blog/utils/getBlogPostData'

/** How many posts the homepage's "Latest news" shows. */
export const LATEST_NEWS_COUNT = 3

// Posts are dated in UTC by the CMS; formatting in UTC keeps the card's date the same as the
// date in the post's own <time>, whatever time zone the build runs in.
const DATE_FORMAT: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }),
  'zh-cn': new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }),
}

/**
 * The newest published posts in a locale's blog, read from content/blog/posts/<locale> at build
 * time, so the homepage picks up a new post on the same deploy that publishes it.
 */
export async function getLatestNews(
  locale: Locale,
  count = LATEST_NEWS_COUNT,
): Promise<Article[]> {
  const posts = sortPostsByDateDesc(await getBlogPostsData(locale))

  return posts.slice(0, count).map((post) => ({
    title: post.title,
    description: post.excerpt,
    date: DATE_FORMAT[locale].format(post.publishedOn),
    dateTime: post.publishedOn.toISOString().slice(0, 10),
    author: post.author,
    href: localePath(locale, `${PATHS.BLOG.path}/${post.slug}`),
    image: post.image?.url,
  }))
}
