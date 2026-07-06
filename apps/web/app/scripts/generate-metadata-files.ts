import fs from 'node:fs/promises';
import { resolveRobots, resolveSitemap } from '~/lib/metadata';

console.log('🆕 Generating metadata files...');

console.log('📄 Generating robots.txt...');
const robots = {
  rules: [
    {
      userAgent: '*',
    },
  ],
  sitemap: 'https://www.avvio.agency/sitemap.xml',
  host: 'https://www.avvio.agency',
};

const robotsTxt = resolveRobots(robots);
const publicPath = 'public/robots.txt';
await fs.writeFile(publicPath, robotsTxt);
console.log(`📄 Generated robots.txt at ${publicPath}`);

console.log('📄 Generating sitemap.xml...');
const routes = ['', '/editor'].map((route) => ({
  url: `https://www.avvio.agency${route}`,
  lastModified: new Date().toISOString().split('T')[0],
}));

const sitemap = resolveSitemap(routes);
const sitemapPath = 'public/sitemap.xml';
await fs.writeFile(sitemapPath, sitemap);
console.log(`📄 Generated sitemap.xml at ${sitemapPath}`);
