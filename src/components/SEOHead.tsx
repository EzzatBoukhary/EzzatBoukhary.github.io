// Per-page meta tags — handles OG, Twitter cards, JSON-LD, canonical.
// For crawlers that don't run JS (Discord, Slackbot) the vite.config.js
// plugin generates static per-route HTML stubs with the same meta.

import { Helmet } from 'react-helmet-async';

export const SITE_URL   = 'https://ezzatboukhary.github.io';
export const SITE_NAME  = 'Ezzat Boukhary';
export const PROFILE_IMAGE = 'https://avatars.githubusercontent.com/u/50555851?v=4';
const DEFAULT_OG_IMAGE  = `${SITE_URL}/og/preview-banner.jpg`;
const DEFAULT_COLOR     = '#e8ff38';   // brand yellow → Discord sidebar accent

export type JsonLdNode = Record<string, unknown>;

interface SEOHeadProps {
  // full page title
  title?: string;
  description?: string;
  // absolute URL to a 1200x630 OG image
  ogImage?: string;
  ogImageAlt?: string;
  // canonical URL for this page
  url?: string;
  // og:type, defaults to "website"
  ogType?: 'website' | 'article' | 'profile';
  // Discord sidebar / browser chrome accent color — use project accent on project pages
  themeColor?: string;
  // one or more JSON-LD objects (Schema.org)
  jsonLd?: JsonLdNode | JsonLdNode[];
}

export default function SEOHead({
  title       = 'Ezzat Boukhary | Software Engineer',
  description = 'Software engineer building full-stack platforms, mobile apps, internal tools, and projects that people actually use.',
  ogImage     = DEFAULT_OG_IMAGE,
  ogImageAlt  = 'Ezzat Boukhary — Software Engineer portfolio',
  url         = `${SITE_URL}/`,
  ogType      = 'website',
  themeColor  = DEFAULT_COLOR,
  jsonLd,
}: SEOHeadProps) {
  const ldArray = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
    : [];

  return (
    <Helmet>
      <html lang="en" />
      <title>{title}</title>
      <link rel="canonical" href={url} />

      <meta name="robots"  content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author"  content="Ezzat Boukhary" />
      <meta name="description" content={description} />
      <meta name="theme-color" content={themeColor} />

      {/* open graph */}
      <meta property="og:site_name"    content={SITE_NAME} />
      <meta property="og:type"         content={ogType} />
      <meta property="og:title"        content={title} />
      <meta property="og:description"  content={description} />
      <meta property="og:url"          content={url} />
      <meta property="og:locale"       content="en_US" />
      <meta property="og:image"        content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt"    content={ogImageAlt} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type"   content={ogImage.endsWith('.jpg') || ogImage.endsWith('.jpeg') ? 'image/jpeg' : 'image/png'} />

      {/* twitter / x card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />
      <meta name="twitter:image:alt"   content={ogImageAlt} />

      {/* json-ld structured data */}
      {ldArray.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(ldArray.length === 1 ? ldArray[0] : ldArray, null, 0)}
        </script>
      )}
    </Helmet>
  );
}
