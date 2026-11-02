// 页头导航（简体中文），与 ../nav.ts 一一对应。本站页面的链接带 /zh-cn 前缀。

import { localePath } from '@/i18n/locales'

import { DOCS } from '@/data/links'
import type { NavLink, NavSection, NavVariant } from '@/data/nav'

const zh = (path: string) => localePath('zh-cn', path)

const PRODUCTS: NavSection = {
  label: '产品',
  id: 'products',
  columns: [
    [
      {
        heading: '存储类型',
        links: [
          {
            label: '温存储',
            href: zh('/products/warm-storage'),
            ref: 'nav-products-warm-storage',
            note: '让常用数据保持在线，随时可取。',
          },
          {
            label: 'IPFS 存储',
            href: zh('/products/ipfs'),
            ref: 'nav-products-ipfs',
            note: '用你熟悉的 IPFS 工具把文件存到 Filecoin。',
          },
          {
            label: '归档存储',
            href: zh('/products/archival-storage'),
            ref: 'nav-products-archival-storage',
            note: '保存很少访问的备份和记录。',
          },
          {
            label: '企业级存储（Fil.one）',
            href: 'https://fil.one',
            ref: 'nav-products-filone',
            note: 'S3 兼容的存储，读取快速，价格可预期。',
          },
        ],
      },
    ],
    [
      {
        heading: '使用 Filecoin',
        links: [
          {
            label: 'Agent 技能',
            href: zh('/products/agents'),
            ref: 'nav-products-agents',
            note: '帮助 Agent 发布成果并跨会话共享上下文。',
            badge: '新',
          },
          {
            label: '支付控制台',
            href: 'https://pay.filecoin.cloud/console',
            ref: 'nav-products-console',
            note: '管理你的 Filecoin 服务和账单。',
          },
          {
            label: '价格',
            href: zh('/pricing'),
            ref: 'nav-products-pricing',
            note: '比较温存储、归档存储和企业级存储的价格。',
          },
        ],
      },
    ],
  ],
}

const NETWORK: NavSection = {
  label: '网络',
  id: 'network',
  columns: [
    [
      {
        links: [
          { label: '提供存储', href: zh('/provide-storage') },
          {
            label: '网络状态',
            href: 'https://status.filecoin.io/',
            ref: 'nav-network-status',
          },
          {
            label: '指标',
            href: 'https://dashboard.starboard.ventures/',
            ref: 'nav-network-metrics',
          },
          {
            label: '安全',
            href: 'https://immunefi.com/bug-bounty/filecoin/',
            ref: 'nav-network-security',
          },
        ],
      },
    ],
    [
      {
        heading: '区块浏览器',
        links: [
          { label: 'FilFox', href: 'https://filfox.info/' },
          { label: 'Beryx', href: 'https://beryx.io/' },
          { label: 'Filscout', href: 'https://filscout.com/' },
          {
            label: 'Blockscout',
            href: 'https://filecoin.blockscout.com/',
          },
        ],
      },
    ],
  ],
}

const BUILD: NavSection = {
  label: '开发',
  id: 'build',
  columns: [
    [
      {
        links: [
          { label: '快速入门', href: DOCS, ref: 'nav-build-quickstart' },
          {
            label: 'Github',
            href: 'https://github.com/filecoin-project',
            ref: 'nav-build-github',
          },
          { label: '文档', href: DOCS, ref: 'nav-build-docs' },
        ],
      },
    ],
  ],
}

const DISCOVER: NavSection = {
  label: '探索',
  id: 'discover',
  columns: [
    [
      {
        links: [
          { label: '了解 Filecoin', href: zh('/learn') },
          { label: '博客', href: zh('/blog') },
          { label: '社区', href: zh('/community-hub') },
          { label: '案例研究', href: zh('/case-studies') },
        ],
      },
    ],
  ],
}

const SECTIONS = [PRODUCTS, NETWORK, BUILD, DISCOVER]

export const NAV: Record<NavVariant, NavSection[]> = {
  home: SECTIONS,
  inner: SECTIONS,
}

export const PRICING: NavLink = {
  label: '价格',
  href: zh('/pricing'),
  ref: 'nav-pricing',
}
export const JOIN_NETWORK: NavLink = {
  label: '提供存储',
  href: zh('/provide-storage'),
  title: '在 Filecoin 网络上提供存储',
}

export { opensInNewTab } from '@/data/nav'
