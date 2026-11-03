import { copy } from '@/i18n/copy'
import type { Locale } from '@/i18n/locales'

import { getLatestNews } from '@/utils/getLatestNews'

/**
 * "Latest news": the three newest posts from the locale's blog, read at build time so a new post
 * shows here as soon as it is published. Header, spacing and type follow "Start
 * building today" above it: the intro sits close under the heading, and each card's label, title,
 * summary and date step down in size like the product cards'.
 */
export default async function LatestNews({
  locale = 'en',
}: {
  locale?: Locale
}) {
  const { NEWS } = copy(locale).news
  const { LABELS } = copy(locale).ui
  const articles = await getLatestNews(locale)
  return (
    <section
      id="latest-news"
      aria-labelledby="latest-news-title"
      className="bg-paper py-section text-ink"
    >
      <div className="container-site">
        <h2
          id="latest-news-title"
          className="font-heading text-h2 font-book leading-[1.15] tracking-[-0.02em] text-balance"
        >
          {NEWS.title}
        </h2>
        <p className="text-lead text-ink/64 mt-[clamp(1rem,0.824rem+0.751vw,1.5rem)] max-w-[40rem] leading-[1.15] tracking-[-0.02em] text-pretty">
          {NEWS.intro}
        </p>

        <ul className="mt-[clamp(2.5rem,2.236rem+1.127vw,3.25rem)] grid grid-cols-1 gap-x-[clamp(1rem,0.472rem+2.254vw,2.5rem)] gap-y-[clamp(2.5rem,2.148rem+1.502vw,3.5rem)] md:grid-cols-3">
          {articles.map((article) => (
            <li key={article.href} className="min-w-0">
              <article className="h-full">
                <a
                  href={article.href}
                  aria-label={LABELS.readMore(article.title)}
                  className="group block h-full rounded-2xl"
                >
                  {/* The cover is decorative; the title names the link. Posts without one use the shared fallback art. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={
                      article.image ??
                      '/assets/images/image-fallback.120ac424.webp'
                    }
                    alt=""
                    width={1920}
                    height={1080}
                    loading="lazy"
                    decoding="async"
                    className="aspect-video w-full rounded-2xl bg-black object-cover"
                  />
                  <div className="mt-[clamp(1rem,0.912rem+0.376vw,1.25rem)]">
                    <span className="text-small text-ink/64 block leading-[1.15] tracking-[-0.01em]">
                      {NEWS.tag}
                    </span>
                    <h3 className="font-heading text-lead font-book group-hover:text-brand group-focus-visible:text-brand mt-[clamp(0.5rem,0.412rem+0.376vw,0.75rem)] leading-[1.15] tracking-[-0.02em] text-balance transition-colors duration-200 ease-out">
                      {article.title}
                    </h3>
                    <p className="text-body text-ink/64 mt-2 leading-[1.15] tracking-[-0.02em] text-pretty">
                      {article.description}
                    </p>
                    <p className="text-small text-ink/40 mt-[clamp(0.75rem,0.662rem+0.376vw,1rem)] flex flex-wrap items-center gap-2 leading-[1.15] tracking-[-0.01em]">
                      <time dateTime={article.dateTime}>{article.date}</time>
                      {article.author && (
                        <>
                          <span aria-hidden="true">|</span>
                          <span>{article.author}</span>
                        </>
                      )}
                    </p>
                  </div>
                </a>
              </article>
            </li>
          ))}
        </ul>

        {/* Sized like the site's other pill buttons. */}
        <div className="mt-[clamp(2.5rem,2.236rem+1.127vw,3.25rem)] flex justify-center">
          <a
            href={NEWS.viewAll.href}
            className="border-brand font-heading text-button font-book text-brand hover:bg-brand/10 focus-visible:bg-brand/10 inline-flex items-center justify-center rounded-full border px-[clamp(1.25rem,1.162rem+0.376vw,1.5rem)] py-[clamp(0.8125rem,0.769rem+0.188vw,0.9375rem)] leading-[1.15] tracking-[-0.02em] transition-[background-color,scale] duration-200 ease-out active:scale-[0.97]"
          >
            {NEWS.viewAll.label}
          </a>
        </div>
      </div>
    </section>
  )
}
