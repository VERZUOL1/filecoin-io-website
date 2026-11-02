// Header navigation. `href: null` marks a destination that does not exist yet. Pages of filecoin.io
// that this build does not rebuild (Learn, Blog, Community, Case Studies) are linked by path, since
// the build is published at filecoin.io.
import { DOCS } from './links'

export type NavLink = {
  label: string
  href: string | null
  /** The link's foc_ref for click tracking (`data-foc-cta`); a link without one sends no event. */
  ref?: string
  title?: string
  /** Small pill after the label, e.g. "Coming soon". */
  badge?: string
  /** Secondary line under the label. */
  note?: string
}

export type NavGroup = {
  /** Column heading; omit for an unlabelled group. */
  heading?: string
  /** A heading that is itself a link (a top-level item with no children). */
  headingLink?: NavLink
  links: NavLink[]
}

export type NavGroupId = 'products' | 'network' | 'build' | 'discover'

export type NavSection = {
  label: string
  /** The `nav_group` sent with clicks on the section's links. */
  id: NavGroupId
  /** Columns of groups, laid out left to right. */
  columns: NavGroup[][]
  aside?: { heading: string; link: NavLink }
}

export type NavVariant = 'home' | 'inner'

/** Products and solutions in one menu. */
const PRODUCTS: NavSection = {
  label: 'Products',
  id: 'products',
  columns: [
    [
      {
        heading: 'Types of Storage',
        links: [
          {
            label: 'Warm Storage',
            href: '/products/warm-storage',
            ref: 'nav-products-warm-storage',
            note: 'Keep frequently used data online and ready to retrieve.',
          },
          {
            label: 'IPFS Storage',
            href: '/products/ipfs',
            ref: 'nav-products-ipfs',
            note: 'Store files on Filecoin with the IPFS tools you know.',
          },
          {
            label: 'Archival Storage',
            href: '/products/archival-storage',
            ref: 'nav-products-archival-storage',
            note: 'Preserve backups and records you rarely need to access.',
          },
          {
            label: 'Enterprise Storage w/ Fil.one',
            href: 'https://fil.one',
            ref: 'nav-products-filone',
            note: 'S3-compatible storage with fast reads and predictable pricing.',
          },
        ],
      },
    ],
    [
      {
        heading: 'Use Filecoin',
        links: [
          {
            label: 'Agents Skills',
            href: '/products/agents',
            ref: 'nav-products-agents',
            note: 'Help agents publish work and share context across sessions.',
            badge: 'NEW',
          },
          {
            label: 'Pay Console',
            href: 'https://pay.filecoin.cloud/console',
            ref: 'nav-products-console',
            note: 'Manage your Filecoin services and billing.',
          },
          {
            label: 'Pricing',
            href: '/pricing',
            ref: 'nav-products-pricing',
            note: 'Compare warm, archival, and enterprise storage pricing.',
          },
        ],
      },
    ],
  ],
}

const NETWORK: NavSection = {
  label: 'Network',
  id: 'network',
  columns: [
    [
      {
        links: [
          { label: 'Provide Storage', href: '/provide-storage' },
          {
            label: 'Network Status',
            href: 'https://status.filecoin.io/',
            ref: 'nav-network-status',
          },
          {
            label: 'Metrics',
            href: 'https://dashboard.starboard.ventures/',
            ref: 'nav-network-metrics',
          },
          {
            label: 'Security',
            href: 'https://immunefi.com/bug-bounty/filecoin/',
            ref: 'nav-network-security',
          },
        ],
      },
    ],
    [
      {
        heading: 'Explorers',
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
  label: 'Build',
  id: 'build',
  columns: [
    [
      {
        links: [
          { label: 'Quickstart', href: DOCS, ref: 'nav-build-quickstart' },
          {
            label: 'Github',
            href: 'https://github.com/filecoin-project',
            ref: 'nav-build-github',
          },
          { label: 'Docs', href: DOCS, ref: 'nav-build-docs' },
        ],
      },
    ],
  ],
}

const DISCOVER: NavSection = {
  label: 'Discover',
  id: 'discover',
  columns: [
    [
      {
        links: [
          { label: 'About Filecoin', href: '/learn' },
          { label: 'Blog', href: '/blog' },
          { label: 'Community', href: '/community-hub' },
          { label: 'Case Studies', href: '/case-studies' },
        ],
      },
    ],
  ],
}

const SECTIONS = [PRODUCTS, NETWORK, BUILD, DISCOVER]

/** The same navigation on the homepage and the inner pages. */
export const NAV: Record<NavVariant, NavSection[]> = {
  home: SECTIONS,
  inner: SECTIONS,
}

export const PRICING: NavLink = {
  label: 'Pricing',
  href: '/pricing',
  ref: 'nav-pricing',
}
export const JOIN_NETWORK: NavLink = {
  label: 'Provide Storage',
  href: '/provide-storage',
  title: 'Provide storage on the Filecoin network',
}

/** Links by path (pages of this site) open in the same tab; other sites open a new tab. */
export function opensInNewTab(href: string): boolean {
  return href.startsWith('http')
}
