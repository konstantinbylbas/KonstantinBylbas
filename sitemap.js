/** @format */

const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

const baseUrl = 'https://konstantinbylbas.github.io';
const pages = [
    { url: '/KonstantinBylbas/#/', changefreq: 'daily', priority: 1.0 },
    { url: '/KonstantinBylbas/#/platform/generator/string', changefreq: 'weekly', priority: 0.8 },
];

function generateSitemap() {
    const sitemapPath = resolve(__dirname, 'public', 'sitemap.xml');
    const sitemapStream = new SitemapStream({ hostname: baseUrl });
    const writeStream = createWriteStream(sitemapPath);

    writeStream.on('finish', () => {
        console.log('Sitemap generated successfully');
    });

    writeStream.on('error', error => {
        console.error('Error generating sitemap:', error);
    });

    sitemapStream.pipe(writeStream);

    pages.forEach(page => {
        sitemapStream.write(page);
    });

    sitemapStream.end();
}

generateSitemap();
