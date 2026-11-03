This is a [Next.js](https://nextjs.org) project containing the code and content for [filecoin.io](https://filecoin.io/). It uses TypeScript, Tailwind CSS, and React 19.

To start the development server run `npx turbo filecoin-site#dev`.

## The redesigned pages

The homepage, `/store-data`, `/pricing`, `/provide-storage` (with its form at
`/provide-storage/onboarding`) and the product pages `/products/warm-storage`,
`/products/agents`, `/products/ipfs` and `/products/archival-storage` are the
redesigned site, each also in Chinese under `/zh-cn`. They live in the
`src/app/[locale]/(redesign)` route group with their own root layout (the new
header, footer, contact dialog and smooth scrolling) and stylesheet, so they
share no CSS with the pages still on `ui-filecoin`, which sit in
`src/app/[locale]/(legacy)`, except the header: `src/app/_styles/site-header.css`
holds what the new header needs and both stylesheets import it, so the legacy
pages show the same fixed header (each page puts a `HeaderSpacer` where its
old navigation was, carrying the header tone). Moving between the two groups
is a full page load.

### Where things are

- `src/app/[locale]/(redesign)/` – the root layout, `globals.css` and the pages.
  The stylesheet is Tailwind CSS v4: theme tokens (brand colours, fonts, easing
  curves, fluid type and spacing) live in its `@theme` blocks; the content
  column is the `container-site` utility (1200px max, fluid side gutter). Type,
  spacing, buttons, the gutter and the header height scale linearly between a
  375px phone and a 1440px desktop with `clamp()`, so nothing snaps to a new
  size at a breakpoint.
- `src/app/_components/layout/` – header (desktop dropdowns, mobile sheet),
  footer, the EN / 中文 switch, the contact dialog, smooth scrolling (Lenis, off
  for reduced motion) and the Chinese translation notice.
- `src/app/_components/sections/home/` – homepage sections in page order.
  `StorageUseCases` is built on `ScrollSteps`, which pins the section on
  screens at least 1024px wide and 640px tall and moves through one step per
  stretch of scrolling. `globe/Globe.tsx` draws the storage provider globe on a
  canvas with d3-geo; land outlines load from
  `public/assets/data/land-110m.json` as the section approaches.
- `src/app/_components/sections/product/` – product page sections (hero,
  feature cards, storage plans, code examples, calls to action) and the
  animated hero illustrations: native Web Components for the archival stack,
  the warm storage orbit, the pricing plan card and the IPFS box, and the
  thinking-orbs sphere for the agents page. All pause off screen and hold still
  for reduced motion.
- `src/app/_components/ui/` – shared pieces: `ButtonLink`, `ArrowLink`,
  `PillLink`, `SiteLink`, `CopyButton`, `Reveal`, `Odometer`.
- `src/app/_data/` – every piece of copy, by page: `home.ts`, `pricing.ts`,
  `provide-storage.ts`, `provider-form.ts`, `contact.ts`, `products/*.ts`, plus
  `nav.ts` (header menus), `footer.ts`, `news.ts` (Latest news copy; the posts
  are the blog's newest, via `_utils/getLatestNews.ts`), `ui.ts`
  (interface text) and `links.ts` (destinations shared across pages). `seo.ts`
  gives each page's title and description, the source of its metadata,
  structured data and Cypress checks.
- `src/app/_fonts/` – Aspekta (headings, numbers and buttons, at weight 480),
  Funnel Sans (body), Funnel Display (`font-display`, loaded on demand), Geist
  and Geist Mono (interface text inside illustrations and code).
- `public/assets/{brand,icons,illustrations,images,logos}` – SVGs exported from
  Figma for these pages.

Icons are [Phosphor](https://phosphoricons.com), imported from
`@phosphor-icons/react/dist/ssr` so they render on the server. The header is
dark-on-transparent by default; a page that opens on a light colour marks its
`<main data-header-tone="light">` and the header turns dark-on-light (CSS only,
so there is no flash). Motion that plays once (the page-load intro, scroll
reveals, the odometer and the chart) is CSS transitions and keyframes on
transform and opacity; reveals are hidden only when JavaScript is running
(`html.js`), and everything respects `prefers-reduced-motion`.

### Languages

Copy is looked up by language through `copy(locale)` in `src/i18n/copy.ts`: the
English modules under `src/app/_data/` are the source of truth for shape, and
each has a Chinese twin under `src/app/_data/zh-cn/` with the same exports
(links to this site's pages carry the `/zh-cn` prefix there; `localePath` in
`src/i18n/locales.ts` writes them). A `satisfies` check in `copy.ts` fails the
build if a twin falls out of step. Pages read `params.locale` and pass `locale`
to the sections. The Chinese forms post the same way as the English ones: the
API routes accept the Chinese dropdown options and store their English
counterparts (the lists share their order). The fonts have no Chinese glyphs,
so the system CJK faces follow them in each font chain, and Chinese drops the
tight Latin letter-spacing. The Chinese copy is a first translation of the
English copy and needs the same review.

### Forms

Every "Talk to sales" / "Schedule a call" / "Chat with us" link on these pages
is `#contact` (`CONTACT` in `src/app/_data/links.ts`), which opens the contact
form (`ContactDialog`, mounted once in the redesign layout) in place; `/#contact`
opens it on load. Fields and dropdown options live in `src/app/_data/contact.ts`.
Submissions post to `/api/contact`, which validates them and appends a row to a
Google Sheet through a Google Apps Script web app bound to that sheet.
`/provide-storage/onboarding` is the storage provider intake form; copy and
options live in `src/app/_data/provider-form.ts`, and it posts to
`/api/provider`, which writes to its own sheet. "Partner with us" under the
homepage's logo strip (`PARTNER` in `links.ts`, `#partner`) opens the
partnership form (`PartnerDialog`); copy and options live in
`src/app/_data/partner.ts`, and it posts to `/api/partner`, which writes to a
third sheet. The two dialogs are `FormDialog` with their fields. Set each sheet
up once:

1. Create a Google Sheet. Extensions → Apps Script, paste in
   `scripts/contact-sheet/Code.gs`, save.
2. Deploy → New deployment → Web app, "Execute as: Me", "Who has access:
   Anyone". Authorise it, then copy the web app URL (`…/exec`).
3. Put that URL in `CONTACT_SHEET_WEBHOOK_URL` (contact form),
   `PROVIDER_SHEET_WEBHOOK_URL` (provider form) or `PARTNER_SHEET_WEBHOOK_URL`
   (partnership form): `.env.local` locally, and the Vercel project's
   environment variables for deployments.

Without the variable, `next dev` logs each submission to the terminal and the
form still reports success; a production build answers 503 and the form shows
an error. Both routes share `src/app/_utils/sheet.ts`.

### Illustrations

The storage illustrations come from Figma as SVG exports, trimmed to their
foreground in `scripts/illustrations/source/`. `scripts/illustrations/build.py`
splits each one into named parts and writes
`src/app/_components/sections/home/storage-art/parts/*.tsx`; `build_cards.py`
does the same for the product pages' card illustrations, writing
`src/app/_components/sections/product/card-art/*.tsx` plus an index. Both use
the Python standard library only. Trim a new export with `trim.py` before
building:

```sh
python3 scripts/illustrations/trim.py ~/Downloads/05-ipfs-storage.svg scripts/illustrations/source/05-ipfs-storage.svg
python3 scripts/illustrations/build.py
python3 scripts/illustrations/build_cards.py
```

The globe's land outlines (`public/assets/data/land-110m.json`, Natural Earth
1:110m) are rebuilt with `python3 scripts/globe/build-land.py`; provider
locations are in `src/app/_data/globe.ts`.

### Product funnel tracking

The website side of the "Filecoin Product Funnel Tracking" plan: Plausible custom events with
label properties, and campaign parameters on the links that leave for the docs or the Console.
`FocAttribution` (`src/app/_components/layout`) is mounted in both root layouts; the pure
helpers are in `src/app/_utils/focAttribution.ts`.

- **First touch.** On landing, the visit's labels are worked out from `utm_*` (type
  `campaign`), else the referrer (`organic` for a search engine, `referral` otherwise, `direct`
  with none; a referral from our own docs or Console keeps the first touch already recorded).
  They are kept in `sessionStorage` under `foc_ft` for the visit. Labels only: no visitor ID is
  created, stored or sent.
- **Events.** `journey_start` once per visit (`ft_type`, `entry_page`, `first_touch_source`,
  `first_touch_medium`, `ref_domain`); `product_page_view` on each funnel entry page
  (`product`: `agent-skills`, `ipfs-pinning`, `data-storage` for `/products/warm-storage`,
  `backups-archives`, `store-data`, `pricing`); `cta_click` on every link that carries
  `data-foc-cta` (`foc_ref`, `nav_group`, `link_type`, `hop_source`); `sales_form_submitted`
  when the contact or partnership dialog's form is sent (`form` is `contact` or `partner`,
  `intent` as the English option, `hop_source`;
  nothing a visitor typed). Every event also carries the first-touch labels. Register these
  properties in the Plausible site settings (custom properties) and add the four events as
  goals, or they stay invisible in reports.
- **Which links.** A link sends `cta_click` when it has a `ref` in the copy
  (`src/app/_data`, same values in the Chinese twins): the header menus (`nav_group` is the
  menu's id: `products`, `network`, `build`, `discover`), the footer (`footer`), and the page
  calls to action (`in-page`). The provide-storage, explorer, blog, learn and community links
  have no `ref`, so they send nothing. `link_type` is `sales` for the contact dialog,
  `decorate` for the docs, Console, filecoin.cloud and fil.one, `exit` for any other site and
  `redirect` for a page of this site.
- **Decoration.** A `decorate` link gets, at click time, the visit's `utm_*` (or
  `utm_source=filecoin.io&utm_medium=website`), `foc_ref`, `foc_ft` (the first-touch type) and
  `foc_entry` (the entry page). Parameters the link already has are kept.
