// "Latest news" on the homepage: the section's copy. The posts themselves are the blog's newest,
// read at build time by getLatestNews (src/app/_utils/getLatestNews.ts). Chinese is in
// ./zh-cn/news.ts.

export type Article = {
  title: string
  description: string
  date: string
  dateTime: string
  author?: string
  href: string
  /** The post's 16:9 cover from /uploads; cards without one show the shared fallback art. */
  image?: string
}

export const NEWS: {
  title: string
  intro: string
  tag: string
  viewAll: { label: string; href: string }
} = {
  title: 'Latest news',
  intro:
    'Insights, updates, ecosystem spotlights, and community stories, directly from the teams building Filecoin.',
  tag: 'Updates',
  viewAll: { label: 'View all articles', href: '/blog' },
}
