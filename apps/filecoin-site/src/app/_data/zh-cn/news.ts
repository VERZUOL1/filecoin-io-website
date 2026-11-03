// 首页“最新动态”的文案。文章本身由 getLatestNews 在构建时从 zh-cn 博客读取最新三篇。

import { localePath } from '@/i18n/locales'

const zh = (path: string) => localePath('zh-cn', path)

export const NEWS: {
  title: string
  intro: string
  tag: string
  viewAll: { label: string; href: string }
} = {
  title: '最新动态',
  intro: '来自 Filecoin 建设团队的洞察、更新、生态亮点和社区故事。',
  tag: '更新',
  viewAll: { label: '查看全部文章', href: zh('/blog') },
}
