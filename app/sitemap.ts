import { MetadataRoute } from 'next'

// TODO: Update with your actual domain
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://savvydigital.ae'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()
  
  return [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    // TODO: Uncomment when you create bilingual pages
    // {
    //   url: `${siteUrl}/en`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly',
    //   priority: 1,
    // },
    // {
    //   url: `${siteUrl}/ar`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly',
    //   priority: 1,
    // },
    // TODO: Add more pages as you create them:
    // {
    //   url: `${siteUrl}/services/web-development`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${siteUrl}/services/mobile-app-development`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
    // {
    //   url: `${siteUrl}/portfolio`,
    //   lastModified: currentDate,
    //   changeFrequency: 'weekly',
    //   priority: 0.9,
    // },
    // {
    //   url: `${siteUrl}/about`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.7,
    // },
    // {
    //   url: `${siteUrl}/contact`,
    //   lastModified: currentDate,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}

