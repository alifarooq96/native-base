import type { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'https://native-base-pink.vercel.app');

// next.config.js has trailingSlash: true — use trailing slashes so crawlers hit the canonical URL and avoid redirects
const withTrailingSlash = (path: string) =>
  path === '' || path === '/' ? BASE_URL : `${BASE_URL}${path.replace(/\/?$/, '/')}`;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: withTrailingSlash('/pricing'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: withTrailingSlash('/credits'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: withTrailingSlash('/signup'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: withTrailingSlash('/login'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: withTrailingSlash('/use-cases/freight-and-logistics'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: withTrailingSlash('/use-cases/carrier-portals'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: withTrailingSlash('/use-cases/fintech-compliance'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: withTrailingSlash('/resources/insurance/progressive-workflow-automation'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: withTrailingSlash('/resources/insurance/multi-carrier-automation'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: withTrailingSlash('/resources/insurance/geico-workflow-automation'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: withTrailingSlash('/resources/insurance/agent-portal-quote-to-bind'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-to-portal'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-125-commercial-application'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-126-general-liability'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-130-workers-comp'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-140-property-information'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-to-progressive'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-to-travelers'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-to-hartford'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-to-liberty-mutual'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-to-chubb'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/acord-to-berkshire-hathaway'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/ams360-to-carrier-portal'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/applied-epic-to-carrier-portal'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/roi-calculator-manual-data-entry'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/nativebase-vs-rating-engines'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/progressive-commercial-trucking-automation'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/great-west-casualty-agent-portal-automation'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: withTrailingSlash('/resources/insurance/northland-travelers-trucking-automation'),
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];
}
